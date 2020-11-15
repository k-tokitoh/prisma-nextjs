import { FC } from "react";
import { mutate } from "swr";

type Props = {
  task: {
    id: number;
    title: string;
  };
};

const Task: FC<Props> = ({ task: task }) => {
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      });
      const task = await res.json();
      mutate("/api/tasks");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <li>
      {task.title}
      <a onClick={() => handleDelete(task.id)}>delete</a>
    </li>
  );
};

export default Task;
