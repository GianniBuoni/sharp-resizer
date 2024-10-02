import { createId } from "@paralleldrive/cuid2";
import sharp from "sharp";

interface Props {
  fileArray: string[];
  outputWidth: number;
  outputFormat: "avif" | "png" | "jpg" | "tiff";
  outputDir: string;
}

const resizer = ({
  fileArray,
  outputDir,
  outputWidth,
  outputFormat,
}: Props) => {
  fileArray.forEach(async (oldImage) => {
    try {
      const newName = createId();
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
};

export default resizer;
