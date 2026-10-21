export default function Toolbar({ query, onQuery, classes, selected, onSelect }) {
  return (
    <section className="tools" aria-label="Công cụ">
      <input type="search" value={query} onChange={(e) => onQuery(e.target.value)} placeholder="Tìm theo tên hoặc mã SV…" aria-label="Tìm kiếm" />
      <select value={selected} onChange={(e) => onSelect(e.target.value)} aria-label="Lọc theo lớp">
        <option value="">Tất cả lớp</option>
        {classes.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>
    </section>
  );
}
