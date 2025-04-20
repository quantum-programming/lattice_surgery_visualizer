mod util;

use std::fs;
use std::path::Path;

fn main() {
    // Read the input file
    let input_path = Path::new("input/sample.txt");
    let output_path = Path::new("output/svg_output.svg");

    let content = fs::read_to_string(input_path).expect("Unable to read the input file");

    // Parse the output
    let output = util::parse_output(&content);

    // Generate the SVG for turn = 0
    let (_, _, _, svg_string) = util::vis(&output, 0);

    // Save the SVG to the output file
    fs::write(output_path, svg_string).expect("Unable to write the SVG file");
}
