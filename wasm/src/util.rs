#![allow(non_snake_case, unused_macros)]
use std::mem::swap;

use svg::{
    node::element::{Rectangle, Style, Text},
    Node,
};

const DW: usize = 50; // distance between layers in svg

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

pub struct Output {
    pub w: usize,                       // chip size
    pub h: usize,                       // chip size
    pub n: usize,                       // number of logical qubits
    pub xyzs: Vec<XYZ>,                 // coordinates of logical qubits
    pub m: usize,                       // max time
    pub ts: Vec<usize>,                 // time of each path
    pub indices_per_t: Vec<Vec<usize>>, // indices_per_t[t] = {i | ts[i]=t }
    pub targets: Vec<Vec<usize>>,       // target logical qubits of each path
    pub dirs: Vec<Vec<char>>,           // direction of each path
    pub paths: Vec<Vec<(XYZ, XYZ)>>,    // path of each path
    pub max_turn: usize,                // max turn
    pub doc_base: svg::Document,        // base svg
}

pub fn parse_output(f: &str) -> Output {
    let mut iter = f.split_whitespace();

    // chip info
    let n = readInt(&mut iter) as usize;
    let w = readInt(&mut iter) as usize;
    let h = readInt(&mut iter) as usize;
    let l = readInt(&mut iter) as usize;

    // data qubit positions
    let mut xyzs = vec![XYZ::new(0, 0, 0); n];
    for i in 0..n {
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

        let edgeCnt = readInt(&mut iter);
        if edgeCnt == -1 {
            for j in 0.._path.len() - 1 {
                paths[i].push((_path[j], _path[j + 1]));
            }
        } else {
            for _ in 0..edgeCnt {
                let u = readInt(&mut iter) as usize;
                let v = readInt(&mut iter) as usize;
                paths[i].push((_path[u], _path[v]));
            }
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
    let mut doc_base = svg::Document::new()
        .set("id", "vis")
        .set("viewBox", (-5, -5, l * W + (l - 1) * DW + 10, H + 10))
        .set("width", l * W + (l - 1) * DW + 10)
        .set("height", H + 10)
        .set("style", "background-color:white");

    doc_base = doc_base.add(Style::new(
        "text {text-anchor: middle; dominant-baseline: central; user-select: none;}",
    ));

    // base grid
    for d2 in 0..l {
        for w2 in 0..w {
            for h2 in 0..h {
                doc_base =
                    doc_base.add(
                        Rectangle::new()
                            .set("x", (w2 + d2 * w) * block_size + DW * d2)
                            .set("y", h2 * block_size)
                            .set("width", block_size)
                            .set("height", block_size)
                            .set("fill", "#dae3f3")
                            .set("stroke", "#1f77b4")
                            .set("stroke-width", 2)
                            .add(svg::node::element::Title::new().add(svg::node::Text::new(
                                format!("(l, w, h) = ({}, {}, {})", d2, w2, h2),
                            ))),
                    );
            }
        }
    }

    // add logical data qubits
    for i in 0..n {
        doc_base = doc_base.add(
            // add rectangle for logical qubit
            Rectangle::new()
                .set(
                    "x",
                    (xyzs[i].x + xyzs[i].z * w) * block_size + DW * xyzs[i].z + 1,
                )
                .set("y", xyzs[i].y * block_size + 1)
                .set("width", block_size - 2)
                .set("height", block_size - 2)
                .set("fill", "#1f77b4")
                .add(
                    svg::node::element::Title::new().add(svg::node::Text::new(format!(
                        "Qubit {}, (l, w, h) = ({}, {}, {})",
                        i + 1,
                        xyzs[i].z,
                        xyzs[i].x,
                        xyzs[i].y
                    ))),
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

    Output {
        w,
        h,
        n,
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
    return Rectangle::new()
        .set("x", x)
        .set("y", y)
        .set("width", w)
        .set("height", h)
        .set("fill", "#dae3f3");
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
    for i in 0..output.n {
        doc.append(
            // add text for logical qubit
            Text::new()
                .set(
                    "x",
                    (output.xyzs[i].x + output.xyzs[i].z * output.w) * block_size
                        + block_size / 2
                        + DW * output.xyzs[i].z,
                )
                .set("y", output.xyzs[i].y * block_size + block_size / 2)
                .set("fill", "black")
                .set("font-size", block_size / 2)
                .add(svg::node::Text::new(format!("{}", i + 1))),
        );
    }

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
