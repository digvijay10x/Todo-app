import TodoItem from "./TodoItem";

export default function TodoList({ todos, onDelete, onToggle, onUpdate }) {
  return (
    <ul className="space-y-2 mt-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onToggle={onToggle}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
