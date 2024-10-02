import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import resizer from "./lib/sharp.js";
import fileParse from "./lib/fileParse.js";

const init = async () => {
  const group = await p.group({
    fileDir: () =>
      p.text({
        message:
          "Where are the files you want to convert?\nPoint to a single file or directory of images.",
        initialValue: "./tests/*",
        validate(value) {
          if (value.length === 0) return "Directory is required!";
        },
      }),
    width: () =>
      p.text({
        message:
          "How wide do you want the final image to be?\nValues are in pixels, and image ratios are constrained.",
        initialValue: "1400",
      }),
    format: () =>
      p.select({
        message: "What will the output format be?",
        initialValue: "avif",
        options: [
          { value: "avif", label: "AVIF: good for web compression!" },
          { value: "png", label: "PNG: lossless and portable!" },
          {
            value: "jpg",
            label: "JPEG: compressed and widely supported by legacy systems.",
          },
          { value: "tiff", label: "TIFF: lossless and supports layers." },
        ],
      }),
    output: ({ results }) =>
      p.text({
        message: "Where do you want the new files to save?",
        initialValue: results.fileDir!.replace("*", ""),
      }),
    confirm: ({ results }) =>
      p.confirm({
        message: `Do these details look right?\n\nSource: ${results.fileDir}\nFormat: ${results.format}\nOutput Directory: ${results.output}\n`,
        initialValue: false,
      }),
  });

  if (group.confirm) {
    const s = p.spinner();
    s.start("⚡ Beginning File Conversions ⚡");
    await setTimeout(1000);

    const { fileDir, width, format, output } = group;
    fileParse({
      format: format,
      width: Number(width),
      fileDir: fileDir,
      output: output,
    });
    s.stop("✨ Images are now resized! ✨");
  }
};

init().catch((e) => console.log(e));