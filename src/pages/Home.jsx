import { useState, useEffect } from "react";
import FilterButtons from "../components/FilterButtons";
import TodoList from "../components/TodoList";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("todos"));
    if (saved) setTodos(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: input,
        completed: false,
      },
    ]);
    setInput("");
  };

  const updateTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="max-w-xl mx-auto p-4 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Todo App
        </h1>

        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            className="border border-gray-300 px-4 py-2 flex-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add new task..."
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all shadow-md"
          >
            Add
          </button>
        </form>

        <FilterButtons filter={filter} setFilter={setFilter} />

        <div className="mt-6 space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {filter === "all"
                ? "No tasks yet. Add one above!"
                : filter === "completed"
                ? "No completed tasks yet."
                : "All tasks completed! 🎉"}
            </div>
          ) : (
            <TodoList
              todos={filteredTodos}
              onDelete={deleteTodo}
              onToggle={toggleComplete}
              onUpdate={updateTodo}
            />
          )}
        </div>
      </div>

      {todos.length > 0 && (
        <div className="mt-4 text-center text-sm text-gray-500">
          {todos.filter((t) => t.completed).length} of {todos.length} tasks
          completed
        </div>
      )}
    </div>
  );
}
