const sharp = require("sharp");
const args = process.argv.slice(2);

const init = () => {
  args.forEach(async (oldImage) => {
    try {
      const oldName = oldImage.split(".jpg")[0];

      await sharp(oldImage)
        .resize({
          width: 1400,
        })
        .toFormat("png")
        .toFile(`./resized/${oldName}.png`);
    } catch (e) {
      console.log(e);
    }
  });
};

init();
