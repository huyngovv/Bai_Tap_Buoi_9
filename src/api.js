import { API_URL } from "./config.js";

async function send(method, id, body) {
  if (!API_URL) return { ...body, id: id ?? String(Date.now()) }; // chế độ offline
  const url = id ? `${API_URL}/${encodeURIComponent(id)}` : API_URL;
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`Máy chủ trả về lỗi ${res.status}`);
  return method === "DELETE" ? null : res.json();
}
export const createStudent = (s) => send("POST", null, s);
export const updateStudent = (id, s) => send("PUT", id, s);
export const deleteStudent = (id) => send("DELETE", id);

export const normalize = (s) => ({ ...s, id: String(s.id), gpa: Number(s.gpa) });
