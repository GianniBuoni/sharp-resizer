import { createId } from "@paralleldrive/cuid2";
import sharp from "sharp";

const args = process.argv.slice(2);

const init = () => {
  args.forEach(async (oldImage) => {
    try {
      const newName = createId();
      await sharp(oldImage)
        .resize({
          width: 1400,
        })
        .toFormat("avif")
        .rotate()
        .toFile(`./resized/${newName}`);
    } catch (e) {
      console.log(e);
    }
  });
};

init();
