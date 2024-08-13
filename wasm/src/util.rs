#![allow(non_snake_case, unused_macros)]
use svg::node::element::{Rectangle, Style, Text};

pub struct Output {
    pub w: usize,                                      // chip size
    pub h: usize,                                      // chip size
    pub n: usize,                                      // number of logical qubits
    pub xys: Vec<(usize, usize)>,                      // coordinates of logical qubits
    pub m: usize,                                      // max time
    pub ts: Vec<usize>,                                // time of each path
    pub targets: Vec<Vec<usize>>,                      // target logical qubits of each path
    pub directions: Vec<Vec<char>>,                    // direction of each path
    pub paths: Vec<Vec<(usize, usize, usize, usize)>>, // coordinates of each path
    pub max_turn: usize,                               // max turn
}

fn readInt(iter: &mut std::str::SplitWhitespace) -> usize {
    iter.next().unwrap().parse().unwrap()
}

pub fn parse_output(f: &str) -> Output {
    let mut iter = f.split_whitespace();
    let w = readInt(&mut iter);
    let h = readInt(&mut iter);
    let n = readInt(&mut iter);
    let mut xys = vec![(0, 0); n];
    for i in 0..n {
        xys[i] = (readInt(&mut iter), readInt(&mut iter));
    }
    let m = readInt(&mut iter);
    let mut targets = vec![vec![]; m];
    let mut directions = vec![vec![]; m];
    let mut ts = vec![0; m];
    let mut paths = vec![vec![]; m];
    for i in 0..m {
        targets[i] = vec![0; readInt(&mut iter)];
        directions[i] = vec![' '; targets[i].len()];
        ts[i] = readInt(&mut iter);
        let mut _path = vec![(0, 0); readInt(&mut iter)];
        for j in 0..targets[i].len() {
            targets[i][j] = readInt(&mut iter);
        }
        for j in 0..directions[i].len() {
            directions[i][j] = iter.next().unwrap().chars().next().unwrap();
        }
        for j in 0.._path.len() {
            _path[j] = (readInt(&mut iter), readInt(&mut iter));
        }
        if _path.len() == 0 {
            // target - target
            for j1 in 0..targets[i].len() {
                for j2 in j1 + 1..targets[i].len() {
                    if xys[targets[i][j1]].0 == xys[targets[i][j2]].0
                        && xys[targets[i][j1]].1.abs_diff(xys[targets[i][j2]].1) == 1
                        && directions[i][j1] == 'V'
                        && directions[i][j2] == 'V'
                    {
                        paths[i].push((
                            xys[targets[i][j1]].0,
                            xys[targets[i][j1]].1,
                            xys[targets[i][j2]].0,
                            xys[targets[i][j2]].1,
                        ));
                    }
                    if xys[targets[i][j1]].1 == xys[targets[i][j2]].1
                        && xys[targets[i][j1]].0.abs_diff(xys[targets[i][j2]].0) == 1
                        && directions[i][j1] == 'H'
                        && directions[i][j2] == 'H'
                    {
                        paths[i].push((
                            xys[targets[i][j1]].0,
                            xys[targets[i][j1]].1,
                            xys[targets[i][j2]].0,
                            xys[targets[i][j2]].1,
                        ));
                    }
                }
            }
            continue;
        }
        // path - path
        let mut grid = vec![vec![-1; w]; h];
        for j in 0.._path.len() {
            grid[_path[j].1][_path[j].0] = j as i32;
        }
        for x in 0..w {
            for y in 0..h {
                if grid[y][x] == -1 {
                    continue;
                }
                if x + 1 < w && grid[y][x + 1] != -1 {
                    paths[i].push((x, y, x + 1, y));
                }
                if y + 1 < h && grid[y + 1][x] != -1 {
                    paths[i].push((x, y, x, y + 1));
                }
            }
        }
        // path - target
        for j1 in 0..targets[i].len() {
            for j2 in 0.._path.len() {
                if xys[targets[i][j1]].0 == _path[j2].0
                    && xys[targets[i][j1]].1.abs_diff(_path[j2].1) == 1
                    && directions[i][j1] == 'V'
                {
                    paths[i].push((
                        xys[targets[i][j1]].0,
                        xys[targets[i][j1]].1,
                        _path[j2].0,
                        _path[j2].1,
                    ));
                }
                if xys[targets[i][j1]].1 == _path[j2].1
                    && xys[targets[i][j1]].0.abs_diff(_path[j2].0) == 1
                    && directions[i][j1] == 'H'
                {
                    paths[i].push((
                        xys[targets[i][j1]].0,
                        xys[targets[i][j1]].1,
                        _path[j2].0,
                        _path[j2].1,
                    ));
                }
            }
        }
    }
    let max_turn = ts.iter().max().unwrap().clone();
    Output {
        w,
        h,
        n,
        xys,
        m,
        ts,
        targets,
        directions,
        paths,
        max_turn,
    }
}

fn calculate_score(output: &Output) -> i64 {
    output.max_turn as i64
}

fn add_connection(doc: svg::Document, x: usize, y: usize, w: usize, h: usize) -> svg::Document {
    return doc.add(
        Rectangle::new()
            .set("x", x)
            .set("y", y)
            .set("width", w)
            .set("height", h)
            .set("fill", "#dae3f3"),
    );
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
    let W = block_size * output.w;
    let H = block_size * output.h;
    let mut doc = svg::Document::new()
        .set("id", "vis")
        .set("viewBox", (-5, -5, W + 10, H + 10))
        .set("width", W + 10)
        .set("height", H + 10)
        .set("style", "background-color:white");

    doc = doc.add(Style::new(
        "text {text-anchor: middle; dominant-baseline: central; user-select: none;}",
    ));

    // base grid
    for w in 0..output.w {
        for h in 0..output.h {
            doc = doc.add(
                Rectangle::new()
                    .set("x", w * block_size)
                    .set("y", h * block_size)
                    .set("width", block_size)
                    .set("height", block_size)
                    .set("fill", "#dae3f3")
                    .set("stroke", "#1f77b4")
                    .set("stroke-width", 2)
                    .add(
                        svg::node::element::Title::new()
                            .add(svg::node::Text::new(format!("(w, h) = ({}, {})", w, h))),
                    ),
            );
        }
    }

    // add logical qubits
    for i in 0..output.n {
        doc = doc.add(
            // add rectangle for logical qubit
            Rectangle::new()
                .set("x", output.xys[i].0 * block_size + 1)
                .set("y", output.xys[i].1 * block_size + 1)
                .set("width", block_size - 2)
                .set("height", block_size - 2)
                .set("fill", "#1f77b4")
                .add(
                    svg::node::element::Title::new().add(svg::node::Text::new(format!(
                        "Qubit {}, (w, h) = ({}, {})",
                        i + 1,
                        output.xys[i].0,
                        output.xys[i].1
                    ))),
                ),
        );
    }

    // add paths
    for i in 0..output.m {
        if output.ts[i] != turn {
            continue;
        }
        let path = &output.paths[i];
        for j in 0..path.len() {
            doc = doc.add(
                Rectangle::new()
                    .set(
                        "x",
                        std::cmp::min(path[j].0, path[j].2) * block_size + block_size / 3,
                    )
                    .set(
                        "y",
                        std::cmp::min(path[j].1, path[j].3) * block_size + block_size / 3,
                    )
                    .set(
                        "width",
                        if path[j].0 == path[j].2 {
                            block_size / 3
                        } else {
                            block_size * 4 / 3
                        },
                    )
                    .set(
                        "height",
                        if path[j].1 == path[j].3 {
                            block_size / 3
                        } else {
                            block_size * 4 / 3
                        },
                    )
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
        doc = doc.add(
            // add text for logical qubit
            Text::new()
                .set("x", output.xys[i].0 * block_size + block_size / 2)
                .set("y", output.xys[i].1 * block_size + block_size / 2)
                .set("fill", "black")
                .set("font-size", block_size / 2)
                .add(svg::node::Text::new(format!("{}", i + 1))),
        );
    }

    // add connection
    for i in 0..output.m {
        if output.ts[i] != turn {
            continue;
        }

        let target = &output.targets[i];
        let direction = &output.directions[i];
        for j in 0..target.len() {
            if direction[j] == 'H' {
                // Horizontal (right side and left side)
                doc = add_connection(
                    doc,
                    output.xys[target[j]].0 * block_size + 1,
                    output.xys[target[j]].1 * block_size + 1,
                    block_size / 8,
                    block_size - 2,
                );
                doc = add_connection(
                    doc,
                    output.xys[target[j]].0 * block_size + block_size * 7 / 8,
                    output.xys[target[j]].1 * block_size + 1,
                    block_size / 8,
                    block_size - 2,
                );
            } else {
                // Vertical (top side and bottom side)
                doc = add_connection(
                    doc,
                    output.xys[target[j]].0 * block_size + 1,
                    output.xys[target[j]].1 * block_size + 1,
                    block_size - 2,
                    block_size / 8,
                );
                doc = add_connection(
                    doc,
                    output.xys[target[j]].0 * block_size + 1,
                    output.xys[target[j]].1 * block_size + block_size * 7 / 8,
                    block_size - 2,
                    block_size / 8,
                );
            }
        }
    }

    let doc2_str = if output.max_turn < 30 {
        let mut doc2 = svg::Document::new()
            .set("id", "vis2")
            .set("viewBox", (-5, -5, W + 10, 120 + 10))
            .set("width", W + 10)
            .set("height", 120 + 10)
            .set("style", "background-color:white");

        doc2 = doc2.add(Style::new(
            "text {text-anchor: middle; dominant-baseline: central; user-select: none;}",
        ));

        for i in 0..output.m {
            doc2 = doc2.add(
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
