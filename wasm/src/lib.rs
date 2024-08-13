use wasm_bindgen::prelude::*;
mod util;

#[wasm_bindgen(getter_with_clone)]
pub struct Ret {
    pub score: i64,
    pub err: String,
    pub svg1: String,
    pub svg2: String,
}

#[wasm_bindgen]
pub fn vis(_output: String, turn: usize) -> Ret {
    let output = util::parse_output(&_output);
    let (score, err, svg1, svg2) = util::vis(&output, turn as usize);
    Ret {
        score: score,
        err: err.to_string(),
        svg1: svg1.to_string(),
        svg2: svg2.to_string(),
    }
}

#[wasm_bindgen]
pub fn get_max_turn(_output: String) -> usize {
    let output = util::parse_output(&_output);
    output.max_turn as usize
}
