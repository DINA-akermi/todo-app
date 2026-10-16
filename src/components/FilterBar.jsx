
const filters = [
  { value: "all", label: "Toutes" },
  { value: "active", label: "Actives" },
  { value: "completed", label: "Terminées" },
];

export default function FilterBar({ filter, onFilterChange }) {
  return (
    <div className="filter-bar">
      {filters.map((item) => (
        <button
          key={item.value}
          type="button"
          className={filter === item.value ? "selected" : ""}
          onClick={() => onFilterChange(item.value)}
          aria-pressed={filter === item.value}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
