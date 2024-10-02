import { createId } from "@paralleldrive/cuid2";
import sharp from "sharp";

const resizer = (input) => {
  input.forEach(async (oldImage) => {
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

export default resizer;
