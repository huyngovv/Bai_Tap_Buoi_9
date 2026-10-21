export default function StudentTable({ students, onEdit, onDelete }) {
  if (students.length === 0) return <p className="muted">Không có sinh viên phù hợp.</p>;
  return (
    <div className="scroll">
      <table>
        <thead>
          <tr><th>Mã SV</th><th>Họ tên</th><th>Lớp</th><th>Email</th><th>Điểm TB</th><th></th></tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.code}</td><td>{s.name}</td><td>{s.className}</td><td>{s.email}</td><td>{s.gpa.toFixed(1)}</td>
              <td className="actions">
                <button type="button" onClick={() => onEdit(s)}>Sửa</button>
                <button type="button" className="del" onClick={() => onDelete(s)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
