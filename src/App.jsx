
import { useEffect, useMemo, useReducer, useState } from "react";

import TodoForm from "./components/TodoForm";
import FilterBar from "./components/FilterBar";
import TodoList from "./components/TodoList";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.task.id,
          title: action.task.title,
          completed: false,
        },
      ];

    case "TOGGLE":
      return state.map((task) =>
        task.id === action.id
          ? { ...task, completed: !task.completed }
          : task
      );

    case "DELETE":
      return state.filter((task) => task.id !== action.id);

    default:
      return state;
  }
}

export default function App() {
  const [getStoredValue, setStoredValue] =
    useLocalStorage("todo-tasks");

  const [tasks, dispatch] = useReducer(
    todoReducer,
    null,
    () => {
      const stored = getStoredValue([]);
      return Array.isArray(stored) ? stored : [];
    }
  );

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setStoredValue(tasks);
  }, [tasks, setStoredValue]);

  function addTask(title) {
    dispatch({
      type: "ADD",
      task: {
        id: crypto.randomUUID(),
        title,
      },
    });
  }

  function toggleTask(id) {
    dispatch({ type: "TOGGLE", id });
  }

  function deleteTask(id) {
    dispatch({ type: "DELETE", id });
  }

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "active":
        return tasks.filter((task) => !task.completed);

      case "completed":
        return tasks.filter((task) => task.completed);

      default:
        return tasks;
    }
  }, [tasks, filter]);

  const remainingTasks = useMemo(
    () => tasks.filter((task) => !task.completed).length,
    [tasks]
  );

  return (
    <main className="app-container">
      <header className="page-header">
        <h1>Ma Todo List</h1>
      </header>

      <div className="dashboard">
        <section className="task-card">
          <h2>Mes tâches</h2>

          <TodoForm onAdd={addTask} />

          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
          />

          <TodoList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />

          <p className="remaining-count">
            {remainingTasks} tâche
            {remainingTasks !== 1 ? "s" : ""} restante
            {remainingTasks !== 1 ? "s" : ""}
          </p>
        </section>
      </div>
    </main>
  );
}
