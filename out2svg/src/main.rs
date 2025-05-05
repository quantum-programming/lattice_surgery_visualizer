mod util;

use std::fs;
use std::path::Path;

fn main() {
    // Read the input file
    let input_dir = Path::new("input");
    let output_dir = Path::new("output");

    for entry in fs::read_dir(input_dir).expect("Unable to read input directory") {
        let entry = entry.expect("Unable to read directory entry");
        let input_path = entry.path();

        println!("Processing file: {:?}", input_path);

        if input_path.is_file() {
            let file_name = input_path.file_stem().expect("Unable to get file name");
            let output_path =
                output_dir.join(format!("{}_output.svg", file_name.to_string_lossy()));

            let content = fs::read_to_string(&input_path).expect("Unable to read the input file");

            // Parse the output
            let output = util::parse_output(&content);

            // Generate the SVG for turn = 0
            let (_, _, _, svg_string) = util::vis(&output, 0);

            // Save the SVG to the output file
            fs::write(output_path, svg_string).expect("Unable to write the SVG file");
        }
    }

    println!("SVG files generated successfully.");
}
