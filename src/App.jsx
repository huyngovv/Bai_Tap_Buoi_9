import { useCallback, useEffect, useMemo, useState } from "react";
import { API_URL } from "./config.js";
import {
  createStudent,
  deleteStudent,
  normalize,
  updateStudent,
} from "./api.js";
import useFetch from "./hooks/useFetch.js";
import Header from "./components/Header.jsx";
import Toolbar from "./components/Toolbar.jsx";
import StudentTable from "./components/StudentTable.jsx";
import StudentForm from "./components/StudentForm.jsx";

export default function App() {
  const { data, loading, error, refetch } = useFetch(
    API_URL || "./students.json",
  );
  const [students, setStudents] = useState([]);
  const [query, setQuery] = useState("");
  const [className, setClassName] = useState("");
  const [editing, setEditing] = useState(null); // null = đang thêm mới
  const [formKey, setFormKey] = useState(0);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (Array.isArray(data)) setStudents(data.map(normalize));
  }, [data]);

  const classes = useMemo(
    () => [...new Set(students.map((s) => s.className))],
    [students],
  );
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return students.filter(
      (s) =>
        (!q ||
          s.name.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q)) &&
        (!className || s.className === className),
    );
  }, [students, query, className]);

  const handleSubmit = useCallback(
    async (values) => {
      setSaving(true);
      setNotice("");
      try {
        if (editing) {
          const saved = normalize(await updateStudent(editing.id, values));
          setStudents((prev) =>
            prev.map((s) => (s.id === saved.id ? saved : s)),
          );
        } else {
          const saved = normalize(await createStudent(values));
          setStudents((prev) => [saved, ...prev]);
        }
        setEditing(null);
        setFormKey((k) => k + 1); // đặt lại form
      } catch (err) {
        setNotice(err.message);
      } finally {
        setSaving(false);
      }
    },
    [editing],
  );

  const handleDelete = useCallback(async (student) => {
    if (!confirm(`Xóa sinh viên "${student.name}"?`)) return;
    try {
      await deleteStudent(student.id);
      setStudents((prev) => prev.filter((s) => s.id !== student.id));
      setEditing((cur) => (cur?.id === student.id ? null : cur));
    } catch (err) {
      setNotice(err.message);
    }
  }, []);

  let status = `Đang hiển thị ${shown.length} / ${students.length} sinh viên`;
  if (loading) status = "Đang tải…";
  if (error) status = `Lỗi tải dữ liệu: ${error}`;

  return (
    <>
      <Header count={students.length} />
      <main className="wrap">
        <Toolbar
          query={query}
          onQuery={setQuery}
          classes={classes}
          selected={className}
          onSelect={setClassName}
        />
        <p
          className={error || notice ? "status error" : "status"}
          role="status"
        >
          {notice || status}{" "}
          {error && (
            <button type="button" onClick={refetch}>
              Thử lại
            </button>
          )}
        </p>
        {!loading && !error && (
          <StudentTable
            students={shown}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        )}
        <StudentForm
          key={`${editing?.id ?? "new"}-${formKey}`}
          student={editing}
          classes={classes}
          saving={saving}
          onSubmit={handleSubmit}
          onCancel={() => setEditing(null)}
        />
      </main>
      <footer>
        <div className="wrap">© Quản lý sinh viên – Bài 9 </div>
      </footer>
    </>
  );
}
