import { useEffect, useState } from "react";

interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const APICall = () => {
  const [json, setJson] = useState<ToDo | null>(null);
  useEffect(() => {
    const fetchToDo = async () => {
      try {
        setJson(
          await (
            await fetch("https://jsonplaceholder.typicode.com/todos/1")
          ).json()
        );
      } catch (error) {
        /* empty */
      }
    };
    fetchToDo();
  }, []);

  return (
    <div>
      <h2>useEffect</h2>
      <p>{json?.id}</p>
      <p>{json?.title}</p>
      <p>{json?.completed}</p>
      <p>{json?.userId}</p>
    </div>
  );
};
