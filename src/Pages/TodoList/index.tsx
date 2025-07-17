import "../../style/global.css"
import { useEffect, useState } from "react"

import rocketImg from "../../assets/rocket.svg"
import Logo from "../../assets/todo.svg"
import Clipboard from "../../assets/Clipboard.svg"

import { PlusCircleIcon } from "@phosphor-icons/react"
import { Task } from "../../Components"

interface TypeTask {
  id: number
  title: string
  checked: boolean
}

export function TodoList() {
  const [tasks, setTasks] = useState<TypeTask[]>(() => {
    const stored = localStorage.getItem("tasks")
    return stored ? JSON.parse(stored) : []
  })

  const [titleTask, setTitleTask] = useState("")

  const [count, setCount] = useState(() => {
    const storedCount = localStorage.getItem("completedCount")
    return storedCount ? Number(storedCount) : 0
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem("completedCount", count.toString())
  }, [count])

  function handleAddTask() {
    if (titleTask.trim() === "") return

    const id = Math.floor(Math.random() * 100000)

    const payload: TypeTask = {
      id,
      title: titleTask,
      checked: false,
    }

    setTasks((prev) => [...prev, payload])
    setTitleTask("")
  }

  function handleDeleteTask(id: number) {
    const taskToDelete = tasks.find((task) => task.id === id)

    if (taskToDelete?.checked) {
      setCount((prev) => prev - 1)
    }

    const newTasks = tasks.filter((task) => task.id !== id)
    setTasks(newTasks)
  }

  function handleCompleted(id: number, isCompleted: boolean) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, checked: isCompleted } : task
      )
    )

    setCount((prev) => (isCompleted ? prev + 1 : prev - 1))
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <header className="bg-Gray-700 w-full h-40 flex justify-center items-center">
        <div className="flex gap-3">
          <img src={rocketImg} alt="Rocket" />
          <img src={Logo} alt="Logo" />
        </div>
      </header>

      <main className="flex flex-col justify-center items-center w-full gap-16 relative -mt-5 xs:w-[425px] sm:w-[620px] md:w-[738px] 2xl:w-[1500px] 3xl:w-[2000px]">
        <form
          className="flex gap-2 justify-center w-full px-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            className="flex h-auto p-2 w-full bg-Gray-500 rounded-lg placeholder:text-Gray-300 text-base text-Gray-100 focus:border focus:border-Purple-Dark sm:p-3"
            id="inputTask"
            onChange={(e) => setTitleTask(e.target.value)}
            value={titleTask}
          />

          <button
            className="flex justify-center items-center p-2 w-18 rounded-lg gap-2 bg-Blue-Dark text-Gray-100 text-[14px] font-bold cursor-pointer hover:bg-Blue hover:opacity-90 ease-in duration-500 xs:w-28 sm:w-32 sm:text-[16px] 2xl:w-36"
            onClick={handleAddTask}
          >
            <span>Criar</span>
            <PlusCircleIcon size={16} />
          </button>
        </form>

        <section className="flex flex-col w-full gap-6">
          <header className="flex justify-between items-center w-full px-2">
            <div className="flex gap-1.5 items-center">
              <span className="text-Blue text-[14px] font-bold">
                Tarefas Criadas
              </span>
              <span className="text-Gray-200 text-[12px] font-bold bg-Gray-400 py-0.5 px-2 rounded-full">
                {tasks.length}
              </span>
            </div>

            <div className="flex gap-1.5 items-center">
              <span className="text-Purple text-[14px] font-bold">
                Concluídas
              </span>
              <span className="text-Gray-200 text-[12px] font-bold bg-Gray-400 py-0.5 px-2 rounded-full">
                {count}
              </span>
            </div>
          </header>

          <section className="flex flex-col justify-center items-center px-2">
            {tasks.length === 0 ? (
              <section className="flex flex-col justify-center items-center border-t border-Gray-300 rounded-t-2xl px-2 py-9 gap-4 w-full h-fit">
                <img src={Clipboard} alt="Icone" className="w-14 h-14" />
                <p className="text-center text-Gray-300">
                  <strong>Você ainda não tem tarefas cadastradas</strong>
                  <br />
                  Crie tarefas e organize seus itens a fazer
                </p>
              </section>
            ) : (
              <section className="flex flex-col gap-3 w-full">
                {tasks.map((task) => (
                  <Task
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    checked={task.checked}
                    onDelete={() => handleDeleteTask(task.id)}
                    onCompleted={handleCompleted}
                  />
                ))}
              </section>
            )}
          </section>
        </section>
      </main>
    </div>
  )
}
