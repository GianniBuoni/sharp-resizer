import { exec } from "node:child_process";
import resizer from "./sharp";

type Group = {
  fileDir: string;
  width: number;
  format: string;
  output: string;
};

const fileParse = ({ fileDir, width, format, output }: Group) => {
  exec(`echo ${fileDir}`, (e, out) => {
    if (e) {
      console.log(e);
    }
    const fileArray = out.replace("\n", "").split(" ");
    resizer({
      fileArray: fileArray,
      outputWidth: width,
      outputFormat: format,
      outputDir: output,
    });
  });
};

export default fileParse;
