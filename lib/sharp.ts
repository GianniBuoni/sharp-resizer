import { exec } from "node:child_process";
import sharp from "sharp";

import nameSearch from "./regex";

interface Props {
  fileString: string;
  outputWidth: number;
  outputFormat: "avif" | "png" | "jpg" | "tif";
  outputDir: string;
}

const resizer = ({
  fileString,
  outputDir,
  outputWidth,
  outputFormat,
}: Props) => {
  exec(`echo ${fileString}`, (e, out) => {
    if (e) {
      console.log(e);
    }
    const fileArray = out.replace("\n", "").split(" ");
    fileArray.forEach(async (oldImage) => {
      try {
        const newName = nameSearch(oldImage);

        await sharp(oldImage)
          .resize({
            width: outputWidth,
          })
          .toFormat(outputFormat)
          .rotate()
          .toFile(`${outputDir}/${newName}.${outputFormat}`);

        console.log(`${oldImage} is now ${newName}`);
      } catch (e) {
        console.log(e);
      }
    });
  });
};

export default resizer;
