import Head from "next/head";
import useSWR, { mutate } from "swr";
import { useForm } from "react-hook-form";
import Task from "../components/Task";

const Index = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const body = { title: data.title };
      const res = await fetch(`http://localhost:3000/api/tasks/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const task = await res.json();
      mutate("/api/tasks", [...tasks, task], false);
    } catch (error) {
      console.error(error);
    }
  });

  const { data: tasks } = useSWR("/api/tasks");

  return (
    <div>
      <Head>
        <title>Prisma - Next.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form onSubmit={onSubmit}>
          <input name="title" ref={register} />
          <input type="submit" />
        </form>
        <ul>
          {tasks?.map((task) => (
            <Task task={task} />
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Index;
