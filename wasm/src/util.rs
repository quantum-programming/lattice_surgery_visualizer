#![allow(non_snake_case, unused_macros)]

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

fn get_viridis(val: f64) -> String {
    let data = vec![
        "#440154", "#440255", "#450357", "#450558", "#45065a", "#46085b", "#46095d", "#460b5e",
        "#460c60", "#470e61", "#470f62", "#471164", "#471265", "#471466", "#481568", "#481669",
        "#48186a", "#48196c", "#481a6d", "#481c6e", "#481d6f", "#481e70", "#482071", "#482173",
        "#482274", "#482475", "#482576", "#482677", "#482778", "#472979", "#472a79", "#472b7a",
        "#472c7b", "#472e7c", "#462f7d", "#46307e", "#46317e", "#46337f", "#453480", "#453581",
        "#453681", "#443882", "#443983", "#443a83", "#433b84", "#433c84", "#433e85", "#423f85",
        "#424086", "#414186", "#414287", "#414387", "#404588", "#404688", "#3f4788", "#3f4889",
        "#3e4989", "#3e4a89", "#3d4b8a", "#3d4d8a", "#3c4e8a", "#3c4f8a", "#3b508b", "#3b518b",
        "#3a528b", "#3a538b", "#39548c", "#39558c", "#38568c", "#38578c", "#37588c", "#37598c",
        "#365b8d", "#365c8d", "#355d8d", "#355e8d", "#345f8d", "#34608d", "#33618d", "#33628d",
        "#33638d", "#32648e", "#32658e", "#31668e", "#31678e", "#30688e", "#30698e", "#2f6a8e",
        "#2f6b8e", "#2f6c8e", "#2e6d8e", "#2e6e8e", "#2d6f8e", "#2d708e", "#2d708e", "#2c718e",
        "#2c728e", "#2b738e", "#2b748e", "#2b758e", "#2a768e", "#2a778e", "#29788e", "#29798e",
        "#297a8e", "#287b8e", "#287c8e", "#287d8e", "#277e8e", "#277f8e", "#26808e", "#26818e",
        "#26828e", "#25838e", "#25838e", "#25848e", "#24858e", "#24868e", "#23878e", "#23888e",
        "#23898e", "#228a8d", "#228b8d", "#228c8d", "#218d8d", "#218e8d", "#218f8d", "#20908d",
        "#20918c", "#20928c", "#20938c", "#1f938c", "#1f948c", "#1f958b", "#1f968b", "#1f978b",
        "#1e988b", "#1e998a", "#1e9a8a", "#1e9b8a", "#1e9c89", "#1e9d89", "#1e9e89", "#1e9f88",
        "#1ea088", "#1fa188", "#1fa287", "#1fa387", "#1fa386", "#20a486", "#20a586", "#21a685",
        "#21a785", "#22a884", "#23a983", "#23aa83", "#24ab82", "#25ac82", "#26ad81", "#27ae81",
        "#28af80", "#29af7f", "#2ab07f", "#2bb17e", "#2cb27d", "#2eb37c", "#2fb47c", "#30b57b",
        "#32b67a", "#33b779", "#35b779", "#36b878", "#38b977", "#39ba76", "#3bbb75", "#3dbc74",
        "#3ebd73", "#40be72", "#42be71", "#44bf70", "#46c06f", "#48c16e", "#49c26d", "#4bc26c",
        "#4dc36b", "#4fc46a", "#51c569", "#53c668", "#55c666", "#58c765", "#5ac864", "#5cc963",
        "#5ec962", "#60ca60", "#62cb5f", "#65cc5e", "#67cc5c", "#69cd5b", "#6cce5a", "#6ece58",
        "#70cf57", "#73d055", "#75d054", "#77d152", "#7ad251", "#7cd24f", "#7fd34e", "#81d44c",
        "#84d44b", "#86d549", "#89d548", "#8bd646", "#8ed744", "#90d743", "#93d841", "#95d83f",
        "#98d93e", "#9bd93c", "#9dda3a", "#a0da39", "#a3db37", "#a5db35", "#a8dc33", "#abdc32",
        "#addd30", "#b0dd2e", "#b3dd2d", "#b5de2b", "#b8de29", "#bbdf27", "#bddf26", "#c0df24",
        "#c3e023", "#c5e021", "#c8e120", "#cbe11e", "#cde11d", "#d0e21c", "#d3e21b", "#d5e21a",
        "#d8e319", "#dbe318", "#dde318", "#e0e418", "#e2e418", "#e5e418", "#e8e519", "#eae519",
        "#ede51a", "#efe61b", "#f2e61c", "#f4e61e", "#f7e61f", "#f9e721", "#fbe723", "#fee724",
    ];
    let idx = (val * (data.len() - 1) as f64).round() as usize;
    return data[idx].to_string();
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
            // get_jet((i as f64) / (n1 as f64))
            get_viridis((i as f64) / (n1 as f64))
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
    pub l: usize,                           // number of layers
    pub w: usize,                           // chip size
    pub h: usize,                           // chip size
    pub n1: usize,                          // number of logical qubits
    pub n2: usize,                          // number of magic state factory
    pub xyzs: Vec<XYZ>,                     // coordinates of logical qubits
    pub targets: Vec<Vec<usize>>,           // target qubits of each path
    pub paths: Vec<Vec<(usize, XYZ, XYZ)>>, // edges of each path
    pub max_turn: usize,                    // max turn
    pub doc_base: svg::Document,            // base svg
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
    let total = n1 + n2;
    let mut xyzs: Vec<XYZ> = Vec::with_capacity(total);
    for _ in 0..total {
        xyzs.push(XYZ::from(&mut iter, w, h, l));
    }

    let m = readInt(&mut iter) as usize;
    let max_turn = (readInt(&mut iter) as usize) + 1;

    let mut targets = Vec::with_capacity(m);
    let mut paths = vec![vec![]; max_turn + 1];

    for id in 0..m {
        let cnt = readInt(&mut iter) as usize;
        let mut t_inst = Vec::with_capacity(cnt);
        for _ in 0..cnt {
            let t_id = readInt(&mut iter) as usize;
            assert!(t_id < total);
            t_inst.push(t_id);
        }
        targets.push(t_inst);

        let mut _path = vec![(0, 0, 0, 0); readInt(&mut iter) as usize];
        let mut pathTiming = isize::MAX;
        for j in 0.._path.len() {
            _path[j] = (
                readInt(&mut iter),
                readInt(&mut iter),
                readInt(&mut iter),
                readInt(&mut iter),
            );
            pathTiming = std::cmp::min(pathTiming, _path[j].0 + 1);
        }

        for j in 0.._path.len() - 1 {
            let t_0 = _path[j].0 as usize;
            let t_1 = _path[j + 1].0 as usize;
            let u = XYZ::new(
                _path[j].1 as usize,
                _path[j].2 as usize,
                _path[j].3 as usize,
            );
            let v = XYZ::new(
                _path[j + 1].1 as usize,
                _path[j + 1].2 as usize,
                _path[j + 1].3 as usize,
            );
            if t_0 != t_1 {
                assert!(u.x == v.x && u.y == v.y && u.z == v.z);
                paths[t_0 + 1].push((id, u, v));
                paths[t_1 + 1].push((id, u, v));
            } else {
                assert!(
                    (u.x == v.x && u.y == v.y && (u.z as isize - v.z as isize).abs() == 1)
                        || (u.x == v.x && u.z == v.z && (u.y as isize - v.y as isize).abs() == 1)
                        || (u.y == v.y && u.z == v.z && (u.x as isize - v.x as isize).abs() == 1)
                );
                paths[t_0 + 1].push((id, u, v));
            }
        }
    }

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
        targets,
        paths,
        max_turn,
        doc_base,
    }
}

fn calculate_score(output: &Output) -> i64 {
    output.max_turn as i64
}

fn add_path(
    doc: &mut svg::Document,
    i: usize,
    u: XYZ,
    v: XYZ,
    block_size: usize,
    output: &Output,
    colorMap: &[&str],
) {
    if u.z != v.z {
        let mut x = (u.x + u.z * output.w) * block_size + block_size / 3 + DW * u.z;
        let mut x2 = (v.x + v.z * output.w) * block_size + block_size / 3 + DW * v.z;
        let mut y = u.y * block_size + block_size / 3;
        doc.append(
            Rectangle::new()
                .set("x", x)
                .set("y", y)
                .set("width", block_size / 3)
                .set("height", block_size / 3)
                .set("fill", colorMap[i % colorMap.len()])
                .set("rx", block_size / 6)
                .set("ry", block_size / 6)
                .add(
                    svg::node::element::Title::new().add(svg::node::Text::new(format!(
                        "Inst {} ({} - {})",
                        i,
                        output.targets[i][0] + 1,
                        output.targets[i][1] + 1
                    ))),
                ),
        );
        doc.append(
            Rectangle::new()
                .set("x", x2)
                .set("y", y)
                .set("width", block_size / 3)
                .set("height", block_size / 3)
                .set("fill", colorMap[i % colorMap.len()])
                .set("rx", block_size / 6)
                .set("ry", block_size / 6)
                .add(
                    svg::node::element::Title::new().add(svg::node::Text::new(format!(
                        "Inst {} ({} - {})",
                        i,
                        output.targets[i][0] + 1,
                        output.targets[i][1] + 1
                    ))),
                ),
        );
        x = (u.x + u.z * output.w) * block_size + DW * u.z;
        x2 = (v.x + v.z * output.w) * block_size + DW * v.z;
        y = u.y * block_size;
        doc.append(
            Text::new()
                .set("x", x + block_size / 2)
                .set("y", y + block_size / 2)
                .set("font-size", block_size / 3)
                .set("zorder", 100)
                .add(svg::node::Text::new("◉")),
        );
        doc.append(
            Text::new()
                .set("x", x2 + block_size / 2)
                .set("y", y + block_size / 2)
                .set("font-size", block_size / 3)
                .add(svg::node::Text::new("⊗")),
        );
    } else if u.x != v.x || u.y != v.y {
        let x = (std::cmp::min(u.x, v.x) + u.z * output.w) * block_size + block_size / 3 + DW * u.z;
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
                    svg::node::element::Title::new().add(svg::node::Text::new(format!(
                        "Inst {} ({} - {})",
                        i,
                        output.targets[i][0] + 1,
                        output.targets[i][1] + 1
                    ))),
                ),
        );
    } else {
        // different time slice
        let mut x = (u.x + u.z * output.w) * block_size + block_size / 3 + DW * u.z;
        let mut y = (u.y) * block_size + block_size / 3;
        doc.append(
            Rectangle::new()
                .set("x", x)
                .set("y", y)
                .set("width", block_size / 3)
                .set("height", block_size / 3)
                .set("fill", colorMap[i % colorMap.len()])
                .set("rx", block_size / 6)
                .set("ry", block_size / 6)
                .add(
                    svg::node::element::Title::new().add(svg::node::Text::new(format!(
                        "Inst {} ({} - {})",
                        i,
                        output.targets[i][0] + 1,
                        output.targets[i][1] + 1
                    ))),
                ),
        );
        x = (u.x + u.z * output.w) * block_size + DW * u.z;
        y = u.y * block_size;
        doc.append(
            Text::new()
                .set("x", x + block_size / 2)
                .set("y", y + block_size / 2)
                .set("font-size", block_size / 3)
                .add(svg::node::Text::new("@")),
        );
    }
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
    for (id, u, v) in output.paths[turn].clone() {
        add_path(&mut doc, id, u, v, block_size, output, &colorMap);
    }

    // add logical qubits (text)
    add_qubit_id_texts(&mut doc, output.w, output.n1, &output.xyzs, block_size);

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

    (
        score as i64,
        "".to_string(),
        "".to_string(),
        doc.to_string(),
    )
}
