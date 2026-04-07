import fs from "fs";
import path from "path";

export function loadLegalText(filename: string): string {
  const p = path.join(process.cwd(), "src", "content", "legal", filename);
  return fs.readFileSync(p, "utf-8");
}
