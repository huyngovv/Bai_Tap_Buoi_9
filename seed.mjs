// Nạp sinh viên mẫu lên MockAPI: node seed.mjs   (--force để nạp dù đã có dữ liệu)
import { readFileSync } from "node:fs";
const API = process.env.API_URL ?? "https://6ad042cf03feaa52b21f32ad.mockapi.io/books/students";
const rows = JSON.parse(readFileSync(new URL("./public/students.json", import.meta.url), "utf8"));
async function main() {
  try {
    const res = await fetch(API);
    if (!res.ok) { console.error(`MockAPI trả lỗi ${res.status}: ${API}\nHãy tạo resource "students" trên mockapi.io trước.`); process.exitCode = 1; return; }
    const old = await res.json();
    if (old.length > 0 && !process.argv.includes("--force")) { console.log(`Đã có ${old.length} bản ghi. Xóa bớt hoặc dùng --force.`); process.exitCode = 1; return; }
  } catch (e) { console.error("Không kết nối được:", e.message); process.exitCode = 1; return; }
  let ok = 0;
  for (const { id, ...s } of rows) {
    const r = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(s) });
    console.log(r.status, s.name); if (r.ok) ok++;
  }
  console.log(`Xong: ${ok}/${rows.length}`); if (ok !== rows.length) process.exitCode = 1;
}
await main();
