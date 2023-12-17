import { useReducer } from "react";
import { AddTask } from "./add_task.js";
import { TaskList } from "./task_list.js";

export interface Task {
  id: number;
  text: string;
  done: boolean;
}

interface Action {
  type: string;
  text?: string;
  task?: Task;
  taskId?: number;
}

const initialTasks: Task[] = [
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: false },
];

function tasksReducer(tasks: Task[], action: Action): Task[] {
  switch (action.type) {
    case "add_task":
      return [
        ...tasks,
        {
          id: tasks.length,
          text: action.text,
          done: false,
        } as Task,
      ];
    case "update_task":
      return tasks.map((task) => {
        if (task.id === action.task?.id) {
          return action.task;
        } else {
          return task;
        }
      });
    case "delete_task":
      return tasks.filter((task) => task.id !== action.taskId);
    default:
      throw Error("Unknown action: " + action.type);
  }
}

export function TaskApp() {
  const [tasks, dispatch] = useReducer<React.Reducer<Task[], Action>>(
    tasksReducer,
    initialTasks
  );

  function handleAddTask(text: string) {
    dispatch({ type: "add_task", text: text });
  }

  function handleChangeTask(updatedTask: Task) {
    dispatch({ type: "update_task", task: updatedTask });
  }

  function handleDeleteTask(taskId: number) {
    dispatch({ type: "delete_task", taskId: taskId });
  }

  return (
    <>
      <h2>useReducer</h2>
      <h3>Prague Itinerary</h3>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}
