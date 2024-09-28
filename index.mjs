import { createId } from "@paralleldrive/cuid2";
import sharp from "sharp";

const fileArray = process.argv.slice(2);

const init = () => {
  console.log("⚡ Starting image conversion! ⚡\n");

  fileArray.forEach(async (oldImage) => {
    try {
      const newName = createId();
      await sharp(oldImage)
        .resize({
          width: 1400,
        })
        .toFormat("avif")
        .rotate()
        .toFile(`./resized/${newName}.avif`);

      console.log(`${oldImage} is now ${newName}`);
    } catch (e) {
      console.log(e);
    }
  });
};

init();
