# Bài 9 – Quản lý sinh viên (Function component & Hooks)

## Chạy
```
npm install
npm run dev
```
Dữ liệu lấy từ MockAPI qua `useFetch` (cấu hình ở `src/config.js`). Trước khi chạy:
1. Trên mockapi.io, trong dự án sẵn có, tạo resource `students` với các trường `code`, `name`, `className`, `email` (String) và `gpa` (Number).
2. Xóa dữ liệu giả mockapi tự sinh, rồi chạy `node seed.mjs` một lần để nạp 10 sinh viên mẫu.
3. Muốn chạy offline: đặt `API_URL = ""` trong `src/config.js` (đọc `public/students.json`, thêm/sửa/xóa chỉ có tác dụng trong phiên).

## Phân tích yêu cầu → cách làm
| Yêu cầu | Cách làm |
|---|---|
| Viết lại bằng Hooks | Toàn bộ là function component; dùng `useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`, `useContext`. |
| Lấy dữ liệu qua `useFetch` | `hooks/useFetch.js`: quản lý `data/loading/error`, hủy request bằng `AbortController`, có `refetch`. |
| `ThemeContext` sáng/tối | `context/ThemeContext.jsx`: `ThemeProvider` + hook `useTheme`; đặt `data-theme` lên `<html>`, lưu localStorage. |

## Class component (Buổi 8) → Hooks
| Class | Hooks |
|---|---|
| `this.state` / `setState` | `useState` |
| `componentDidMount` + `componentWillUnmount` | `useEffect` có hàm cleanup |
| Truyền dữ liệu qua nhiều tầng bằng props | `useContext` (theme) |
| Logic lặp lại ở nhiều component (HOC, render props) | Custom hook (`useFetch`, `useTheme`) |
| Tính toán dẫn xuất trong `render` | `useMemo` |
