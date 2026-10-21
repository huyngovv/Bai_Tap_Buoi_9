import { useTheme } from "../context/ThemeContext.jsx";

export default function Header({ count }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <header>
      <div className="wrap bar">
        <h1>Quản lý sinh viên</h1>
        <div className="right">
          <span>{count} sinh viên</span>
          <button type="button" onClick={toggleTheme}>{theme === "dark" ? "☀ Sáng" : "☾ Tối"}</button>
        </div>
      </div>
    </header>
  );
}
