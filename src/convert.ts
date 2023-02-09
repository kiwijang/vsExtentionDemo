// copy from: https://github.com/frank890417/image-optimizer/blob/main/convert.js

import * as sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs';

export const convetTool = (inputDirectory: string, outputDirectory: string) => {
  // Define input and output directories
//   const inputDirectory = "./input";
//   const outputDirectory = "./output";

  // Configuration object with image size, scale, and format options
  const config = {
    sizes: [1024, 2048, 4096], // array of image widths to resize to
    scales: [1, 0.5, 0.25], // array of scales to resize the image by
    formats: ["png", "jpg", "webp", "avif"], // array of image formats to save the resized images as
  };

  // Read the directory to get a list of files
  fs.readdir(inputDirectory, (err: any, files: any) => {
    if (err) {
      // Log the error and return
      console.error(err);
      return;
    }

    // Iterate through each file
    files.forEach((file: any) => {
      // Build the input file path
      const inputFile = path.join(inputDirectory, file);
      // Get the base file name
      const baseFileName = path.parse(file).name;
      // Build the output folder path
      const outputFolder = path.join(outputDirectory, baseFileName);

      // Check if the output folder exists, if not create it
      if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder);
      } else {
        // If the output folder exists, remove it and recreate it
        fs.rmdirSync(outputFolder, { recursive: true });
        fs.mkdirSync(outputFolder);
      }

      // Use the sharp module to get metadata from the input file
      sharp(inputFile)
        .metadata()
        .then((metadata: any) => {
          // Store the original width of the image
          const originalWidth = metadata.width;

          // Iterate through each format in the config
          config.formats.forEach((format: any) => {
            // Iterate through each size in the config
            config.sizes.forEach((size) => {
              // Build the output file path
              const outputFile = path.join(
                outputFolder,
                `${baseFileName}-${size}.${format}`
              );

              // Use the sharp module to resize the image and save it to the output file path
              sharp(inputFile)
                .resize({ width: size })
                .toFormat(format)
                .toFile(outputFile, (error: any, info: any) => {
                  if (error) {
                    // Log the error
                    console.error(error);
                  } else {
                    // Log success message
                    console.log(
                      `Successfully converted ${inputFile} to ${outputFile} in ${format} format`
                    );
                  }
                });
            });

            // Iterate through each scale in the config
            config.scales.forEach((scale) => {
              // Build the output file path
              const outputFile = path.join(
                outputFolder,
                `${baseFileName}-${scale}x.${format}`
              );

              // Use the sharp module to resize the image and save it to the output file path
              sharp(inputFile)
                .resize({ width: Math.round(originalWidth * scale) })
                .toFormat(format)
                .toFile(outputFile, (error: any, info: any) => {
                  if (error) {
                    console.error(error);
                  } else {
                    console.log(
                      `Successfully converted ${inputFile} to ${outputFile} in ${format} format`
                    );
                  }
                });
            });
          });
        })
        .catch((error: any) => {
          console.error(error);
        });
    });
  });
};
