#![allow(non_snake_case, unused_macros)]
use std::mem::swap;

use svg::{
    node::element::{Rectangle, Style, Text},
    Node,
};

fn readInt(iter: &mut std::str::SplitWhitespace) -> isize {
    iter.next().unwrap().parse().unwrap()
}

#[derive(Clone, Copy, Debug)]
pub struct XYZ {
    pub x: usize,
    pub y: usize,
    pub z: usize,
}

impl XYZ {
    pub fn new(x: usize, y: usize, z: usize) -> XYZ {
        XYZ { x, y, z }
    }

    pub fn from(iter: &mut std::str::SplitWhitespace, w: usize, h: usize, l: usize) -> XYZ {
        let x = readInt(iter) as usize;
        let y = readInt(iter) as usize;
        let z = readInt(iter) as usize;
        assert!(x < w && y < h && z < l);
        XYZ { x, y, z }
    }
}

// Extracted function to convert RGB floats to hex color code
fn rgb_to_hex(r: f64, g: f64, b: f64) -> String {
    format!(
        "#{:02x}{:02x}{:02x}",
        (r * 255.0).round() as u8,
        (g * 255.0).round() as u8,
        (b * 255.0).round() as u8
    )
}

// Extracted function to interpolate color values
fn interpolate_color(val: f64, data: &[(f64, f64, f64)]) -> f64 {
    for i in 0..data.len() - 1 {
        if data[i].0 <= val && val <= data[i + 1].0 {
            let ratio = (val - data[i].0) / (data[i + 1].0 - data[i].0);
            return data[i].2 + (data[i + 1].1 - data[i].2) * ratio;
        }
    }
    panic!("Value out of range or unexpected error");
}

fn get_jet(val: f64) -> String {
    let jet_data = vec![
        (
            "red",
            vec![
                (0.00, 0.0, 0.0),
                (0.35, 0.0, 0.0),
                (0.66, 1.0, 1.0),
                (0.89, 1.0, 1.0),
                (1.00, 0.5, 0.5),
            ],
        ),
        (
            "green",
            vec![
                (0.000, 0.0, 0.0),
                (0.125, 0.0, 0.0),
                (0.375, 1.0, 1.0),
                (0.640, 1.0, 1.0),
                (0.910, 0.0, 0.0),
                (1.000, 0.0, 0.0),
            ],
        ),
        (
            "blue",
            vec![
                (0.00, 0.5, 0.5),
                (0.11, 1.0, 1.0),
                (0.34, 1.0, 1.0),
                (0.65, 0.0, 0.0),
                (1.00, 0.0, 0.0),
            ],
        ),
    ];

    let floats: Vec<f64> = jet_data
        .iter()
        .map(|(_, data)| interpolate_color(val, data))
        .collect();
    rgb_to_hex(floats[0], floats[1], floats[2])
}

const DW: usize = 50; // distance between layers in svg
pub fn add_qubit_id_texts(
    doc_base: &mut svg::Document,
    w: usize,
    n1: usize,
    xyzs: &Vec<XYZ>,
    block_size: usize,
) {
    for i in 0..n1 {
        doc_base.append(
            Text::new()
                .set(
                    "x",
                    (xyzs[i].x + xyzs[i].z * w) * block_size + block_size / 2 + DW * xyzs[i].z,
                )
                .set("y", xyzs[i].y * block_size + block_size / 2)
                .set("fill", "black")
                .set("font-size", block_size / 2)
                .add(svg::node::Text::new(format!("{}", i + 1))),
        );
    }
}

// Extracted function to add a rectangle to the document
fn add_rectangle(
    doc: &mut svg::Document,
    x: usize,
    y: usize,
    width: usize,
    height: usize,
    fill: &str,
    stroke: &str,
    stroke_width: usize,
    title: &str,
) {
    doc.append(
        Rectangle::new()
            .set("x", x)
            .set("y", y)
            .set("width", width)
            .set("height", height)
            .set("fill", fill)
            .set("stroke", stroke)
            .set("stroke-width", stroke_width)
            .add(svg::node::element::Title::new().add(svg::node::Text::new(title))),
    );
}

pub fn make_doc_base(
    l: usize,
    w: usize,
    h: usize,
    n1: usize,
    n2: usize,
    xyzs: &Vec<XYZ>,
    block_size: usize,
    W: usize,
    H: usize,
    is_first: bool,
) -> svg::Document {
    let mut doc_base = svg::Document::new()
        .set("id", "vis")
        .set("viewBox", (-5, -5, l * W + (l - 1) * DW + 10, H + 10))
        .set("width", l * W + (l - 1) * DW + 10)
        .set("height", H + 10)
        .set("style", "background-color:white")
        .add(Style::new(
            "text {text-anchor: middle; dominant-baseline: central; user-select: none;}",
        ));

    // base grid
    for d2 in 0..l {
        for w2 in 0..w {
            for h2 in 0..h {
                add_rectangle(
                    &mut doc_base,
                    (w2 + d2 * w) * block_size + DW * d2,
                    h2 * block_size,
                    block_size,
                    block_size,
                    "#dae3f3",
                    "#1f77b4",
                    2,
                    &format!("(l, w, h) = ({}, {}, {})", d2, w2, h2),
                );
            }
        }
    }

    // add logical data qubits
    for i in 0..n1 {
        let color = if is_first {
            get_jet((i as f64) / (n1 as f64))
        } else {
            "#1f77b4".to_string()
        };
        add_rectangle(
            &mut doc_base,
            (xyzs[i].x + xyzs[i].z * w) * block_size + DW * xyzs[i].z + 1,
            xyzs[i].y * block_size + 1,
            block_size - 2,
            block_size - 2,
            &color,
            "",
            0,
            &format!(
                "Qubit {}, (l, w, h) = ({}, {}, {})",
                i + 1,
                xyzs[i].z,
                xyzs[i].x,
                xyzs[i].y
            ),
        );
    }

    // add magic state factory qubits
    for i in n1..n1 + n2 {
        add_rectangle(
            &mut doc_base,
            (xyzs[i].x + xyzs[i].z * w) * block_size + DW * xyzs[i].z + 1,
            xyzs[i].y * block_size + 1,
            block_size - 2,
            block_size - 2,
            "#ff7f0e",
            "",
            0,
            &format!(
                "Qubit {}, (l, w, h) = ({}, {}, {})",
                i + 1,
                xyzs[i].z,
                xyzs[i].x,
                xyzs[i].y
            ),
        );
    }

    // add vertical lines to separate layers
    for d2 in 1..l {
        doc_base = doc_base.add(
            Rectangle::new()
                .set(
                    "x",
                    (d2 as f64) * (W as f64) + (d2 as f64 - 1.0 + 0.45) * (DW as f64),
                )
                .set("y", -0.02 * H as f64)
                .set("width", 0.1 * (DW as f64))
                .set("height", 1.04 * H as f64)
                .set("fill", "#111111"),
        );
    }

    if is_first {
        add_qubit_id_texts(&mut doc_base, w, n1, xyzs, block_size);
    }

    doc_base
}

pub struct Output {
    pub l: usize,                       // number of layers
    pub w: usize,                       // chip size
    pub h: usize,                       // chip size
    pub n1: usize,                      // number of logical qubits
    pub n2: usize,                      // number of magic state factory
    pub xyzs: Vec<XYZ>,                 // coordinates of logical qubits
    pub m: usize,                       // max time
    pub ts: Vec<usize>,                 // time of each path
    pub indices_per_t: Vec<Vec<usize>>, // indices_per_t[t] = {i | ts[i]=t }
    pub targets: Vec<Vec<usize>>,       // qubit indices of each path
    pub dirs: Vec<Vec<char>>,           // starting directions of each path
    pub paths: Vec<Vec<(XYZ, XYZ)>>,    // edges of each path
    pub max_turn: usize,                // max turn
    pub doc_base: svg::Document,        // base svg
}

pub fn parse_output(f: &str) -> Output {
    let mut iter = f.split_whitespace();

    // chip info
    let w = readInt(&mut iter) as usize;
    let h = readInt(&mut iter) as usize;
    let l = readInt(&mut iter) as usize;

    // data qubit positions
    let n1 = readInt(&mut iter) as usize;
    let n2 = readInt(&mut iter) as usize;
    let mut xyzs = vec![XYZ::new(0, 0, 0); n1 + n2];
    for i in 0..(n1 + n2) {
        xyzs[i] = XYZ::from(&mut iter, w, h, l);
    }

    let m = readInt(&mut iter) as usize;
    let mut ts = vec![0; m];
    let mut targets = vec![vec![]; m];
    let mut dirs = vec![vec![]; m];
    let mut paths = vec![vec![]; m];
    for i in 0..m {
        ts[i] = readInt(&mut iter) as usize;

        targets[i] = vec![0; readInt(&mut iter) as usize];
        for j in 0..targets[i].len() {
            targets[i][j] = readInt(&mut iter) as usize;
        }

        dirs[i] = vec![' '; targets[i].len()];
        for j in 0..dirs[i].len() {
            dirs[i][j] = iter.next().unwrap().chars().next().unwrap();
        }

        let mut _path = vec![XYZ::new(0, 0, 0); readInt(&mut iter) as usize];
        for j in 0.._path.len() {
            _path[j] = XYZ::from(&mut iter, w, h, l);
        }

        for j in 0.._path.len() - 1 {
            paths[i].push((_path[j], _path[j + 1]));
        }

        paths[i].sort_by_key(|&x| x.0.z != x.1.z);
    }

    let max_turn = ts.iter().max().unwrap().clone();

    // indices_per_t[t]={i | ts[i]=t}
    let indices_per_t = (0..m).fold(vec![vec![]; max_turn + 1], |mut acc, i| {
        acc[ts[i]].push(i);
        acc
    });

    let block_size = 600 / std::cmp::max(w, h);
    let W = block_size * w;
    let H = block_size * h;
    let doc_base = make_doc_base(l, w, h, n1, n2, &xyzs, block_size, W, H, false);

    Output {
        l,
        w,
        h,
        n1,
        n2,
        xyzs,
        m,
        ts,
        indices_per_t,
        targets,
        dirs,
        paths,
        max_turn,
        doc_base,
    }
}

fn calculate_score(output: &Output) -> i64 {
    output.max_turn as i64
}

fn make_connection(x: usize, y: usize, w: usize, h: usize) -> Rectangle {
    Rectangle::new()
        .set("x", x)
        .set("y", y)
        .set("width", w)
        .set("height", h)
        .set("fill", "#dae3f3")
}

pub fn vis(output: &Output, turn: usize) -> (i64, String, String, String) {
    // plt tab10
    let colorMap = [
        // "#1f77b4",
        "#ff7f0e", "#2ca02c", "#d62728", //
        "#9467bd", "#8c564b", "#e377c2", //
        "#7f7f7f", "#bcbd22", "#17becf", //
    ];

    let score = calculate_score(output);
    let block_size = 600 / std::cmp::max(output.w, output.h);
    let mut doc = output.doc_base.clone();

    // add paths
    for &i in &output.indices_per_t[turn] {
        let path = &output.paths[i];
        for j in 0..path.len() {
            let mut u = path[j].0;
            let mut v = path[j].1;

            if u.z != v.z {
                if u.z > v.z {
                    swap(&mut u, &mut v);
                }
                let x = (u.x + u.z * output.w) * block_size + DW * u.z;
                let x2 = (v.x + v.z * output.w) * block_size + DW * v.z;
                let y = u.y * block_size;
                doc.append(
                    Text::new()
                        .set("x", x + block_size / 2)
                        .set("y", y + block_size / 2)
                        .set("font-size", block_size / 3)
                        .add(svg::node::Text::new("◉")),
                );
                doc.append(
                    Text::new()
                        .set("x", x2 + block_size / 2)
                        .set("y", y + block_size / 2)
                        .set("font-size", block_size / 3)
                        .add(svg::node::Text::new("⊗")),
                );

                continue;
            }

            assert_eq!(u.z, v.z);
            let x =
                (std::cmp::min(u.x, v.x) + u.z * output.w) * block_size + block_size / 3 + DW * u.z;
            let y = std::cmp::min(u.y, v.y) * block_size + block_size / 3;
            let width = if u.x == v.x {
                block_size / 3
            } else {
                block_size * 4 / 3
            };
            let height = if u.y == v.y {
                block_size / 3
            } else {
                block_size * 4 / 3
            };
            doc.append(
                Rectangle::new()
                    .set("x", x)
                    .set("y", y)
                    .set("width", width)
                    .set("height", height)
                    .set("fill", colorMap[i % colorMap.len()])
                    .set("rx", block_size / 6)
                    .set("ry", block_size / 6)
                    .add(
                        svg::node::element::Title::new()
                            .add(svg::node::Text::new(format!("Inst {}", i))),
                    ),
            );
        }
    }

    // add logical qubits (text)
    add_qubit_id_texts(&mut doc, output.w, output.n1, &output.xyzs, block_size);

    // add connection
    for &i in &output.indices_per_t[turn] {
        let target = &output.targets[i];
        let direction = &output.dirs[i];
        for j in 0..target.len() {
            if direction[j] == 'H' {
                // Horizontal (right side and left side)
                doc.append(make_connection(
                    (output.xyzs[target[j]].x + output.xyzs[target[j]].z * output.w) * block_size
                        + DW * output.xyzs[target[j]].z
                        + 1,
                    output.xyzs[target[j]].y * block_size + 1,
                    block_size / 8,
                    block_size - 2,
                ));
                doc.append(make_connection(
                    (output.xyzs[target[j]].x + output.xyzs[target[j]].z * output.w) * block_size
                        + block_size * 7 / 8
                        + DW * output.xyzs[target[j]].z,
                    output.xyzs[target[j]].y * block_size + 1,
                    block_size / 8,
                    block_size - 2,
                ));
            } else {
                // Vertical (top side and bottom side)
                doc.append(make_connection(
                    (output.xyzs[target[j]].x + output.xyzs[target[j]].z * output.w) * block_size
                        + DW * output.xyzs[target[j]].z
                        + 1,
                    output.xyzs[target[j]].y * block_size + 1,
                    block_size - 2,
                    block_size / 8,
                ));
                doc.append(make_connection(
                    (output.xyzs[target[j]].x + output.xyzs[target[j]].z * output.w) * block_size
                        + DW * output.xyzs[target[j]].z
                        + 1,
                    output.xyzs[target[j]].y * block_size + block_size * 7 / 8,
                    block_size - 2,
                    block_size / 8,
                ));
            }
        }
    }

    if turn == 0 {
        doc = make_doc_base(
            output.l,
            output.w,
            output.h,
            output.n1,
            output.n2,
            &output.xyzs,
            block_size,
            block_size * output.w,
            block_size * output.h,
            true,
        );
    }

    let doc2_str = if output.max_turn < 30 {
        let W = block_size * output.w;

        let mut doc2 = svg::Document::new()
            .set("id", "vis2")
            .set("viewBox", (-5, -5, W + 10, 120 + 10))
            .set("width", W + 10)
            .set("height", 120 + 10)
            .set("style", "background-color:white");

        doc2.append(Style::new(
            "text {text-anchor: middle; dominant-baseline: central; user-select: none;}",
        ));

        for i in 0..output.m {
            doc2.append(
                Rectangle::new()
                    .set("x", W * i / output.m)
                    .set(
                        "y",
                        if output.max_turn <= 1 {
                            0
                        } else {
                            120 * output.ts[i] as usize / output.max_turn
                        },
                    )
                    .set("width", W / output.m)
                    .set("height", 120 / output.max_turn)
                    .set("fill", colorMap[i % colorMap.len()])
                    .set(
                        "fill-opacity",
                        if turn != 0 && output.ts[i] != turn {
                            0.5
                        } else {
                            1.0
                        },
                    )
                    .add(
                        svg::node::element::Title::new()
                            .add(svg::node::Text::new(format!("{}", i))),
                    ),
            );
        }
        doc2.to_string()
    } else {
        "".to_string()
    };

    (score as i64, "".to_string(), doc2_str, doc.to_string())
}
