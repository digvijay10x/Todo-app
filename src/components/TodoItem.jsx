import { useState, useRef, useEffect } from "react";

export default function TodoItem({ todo, onDelete, onToggle, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef();

  useEffect(() => {
    if (isEditing) inputRef.current.focus();
  }, [isEditing]);

  const handleSave = () => {
    if (!editText.trim()) return;
    onUpdate(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded">
      {isEditing ? (
        <input
          ref={inputRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          className="flex-1 mr-2 border px-2 py-1 rounded"
        />
      ) : (
        <span
          onClick={() => onToggle(todo.id)}
          className={`flex-1 cursor-pointer ${
            todo.completed ? "line-through text-gray-500" : ""
          }`}
        >
          {todo.text}
        </span>
      )}
      <div className="flex gap-2">
        <button onClick={() => setIsEditing(true)} className="text-blue-500">
          ✏️
        </button>
        <button onClick={() => onDelete(todo.id)} className="text-red-500">
          🗑️
        </button>
      </div>
    </li>
  );
}
