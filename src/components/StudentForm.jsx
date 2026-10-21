import { useEffect, useRef, useState } from "react";

const EMPTY = { code: "", name: "", className: "", email: "", gpa: "" };
const FIELDS = [
  ["code", "Mã SV", "text"], ["name", "Họ tên", "text"], ["className", "Lớp", "text"],
  ["email", "Email", "email"], ["gpa", "Điểm TB (0–10)", "number"],
];

function validate(v) {
  const e = {};
  if (!/^[A-Za-z0-9]{5,12}$/.test(v.code.trim())) e.code = "Mã SV gồm 5–12 chữ hoặc số.";
  if (v.name.trim().length < 3) e.name = "Họ tên phải từ 3 ký tự.";
  if (!v.className.trim()) e.className = "Vui lòng nhập lớp.";
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim())) e.email = "Email không hợp lệ.";
  const g = Number(v.gpa);
  if (v.gpa === "" || !(g >= 0 && g <= 10)) e.gpa = "Điểm phải từ 0 đến 10.";
  return e;
}

export default function StudentForm({ student, classes, saving, onSubmit, onCancel }) {
  const [values, setValues] = useState(student ? { ...student, gpa: String(student.gpa) } : EMPTY);
  const [errors, setErrors] = useState({});
  const firstRef = useRef(null);
  useEffect(() => { firstRef.current?.focus(); }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    setErrors((prev) => ({ ...prev, [name]: validate(next)[name] }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onSubmit({
      code: values.code.trim().toUpperCase(), name: values.name.trim(), className: values.className.trim(),
      email: values.email.trim(), gpa: Number(values.gpa),
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>{student ? "Sửa sinh viên" : "Thêm sinh viên"}</h2>
      {FIELDS.map(([name, label, type], i) => (
        <label key={name}>
          {label}
          <input
            ref={i === 0 ? firstRef : null} name={name} type={type} value={values[name]} onChange={handleChange}
            list={name === "className" ? "class-list" : undefined} step={name === "gpa" ? "0.1" : undefined}
          />
          <span className="error-msg">{errors[name]}</span>
        </label>
      ))}
      <datalist id="class-list">{classes.map((c) => <option key={c} value={c} />)}</datalist>
      <div className="actions">
        <button type="submit" className="on" disabled={saving}>{saving ? "Đang lưu…" : student ? "Cập nhật" : "Thêm"}</button>
        {student && <button type="button" onClick={onCancel}>Hủy</button>}
      </div>
    </form>
  );
}
