export default function FilterButtons({ filter, setFilter }) {
  return (
    <div className="mb-4 flex gap-2">
      <button
        className={`px-3 py-1 border rounded ${
          filter === "all" ? "bg-blue-100" : ""
        }`}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        className={`px-3 py-1 border rounded ${
          filter === "completed" ? "bg-green-100" : ""
        }`}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
      <button
        className={`px-3 py-1 border rounded ${
          filter === "pending" ? "bg-yellow-100" : ""
        }`}
        onClick={() => setFilter("pending")}
      >
        Pending
      </button>
    </div>
  );
}
