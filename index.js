import * as p from "@clack/prompts";
import { setTimeout } from "node:timers/promises";
import { exec } from "node:child_process";
import resizer from "./lib/sharp.js";

const init = async () => {
  const group = await p.group({
    fileDir: () =>
      p.text({
        message: "Where are the files you want to convert?",
        initialValue: "./*.png",
      }),
  });

  if (group.fileDir) {
    const s = p.spinner();
    s.start("⚡ Beginning File Conversions ⚡");
    await setTimeout(1000);
    exec(`echo ${group.fileDir}`, async (e, out) => {
      if (e) {
        console.log(e);
      }
      const fileArray = out.replace("\n", "").split(" ");
      resizer(fileArray);
    });
    s.stop("✨ Images are now resized! ✨");
  }
};

init().catch((e) => console.log(e));
