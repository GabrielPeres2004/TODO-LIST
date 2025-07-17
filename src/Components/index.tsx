import { useState, useEffect } from "react"
import { TrashIcon } from "@phosphor-icons/react"

interface TaskProps {
    id: number
    title: string
    checked: boolean
    onDelete: () => void
    onCompleted: (id: number, isCompleted: boolean) => void
}

export function Task({ id, title, checked, onDelete, onCompleted }: TaskProps) {
    const [isChecked, setIsChecked] = useState(checked)

    useEffect(() => {
        setIsChecked(checked)
    }, [checked])

    function handleCheck() {
        const newChecked = !isChecked
        setIsChecked(newChecked)
        onCompleted(id, newChecked)
    }

    return (
        <section
            className={`flex justify-between items-center w-full p-4 bg-Gray-400 gap-3 rounded-lg ${isChecked ? "bg-Gray-500" : ""
                }`}
        >
            <input
                type="checkbox"
                id={`checkbox-${id}`}
                className="appearance-none border-2 border-Blue p-1.5 rounded-full cursor-pointer ease-in-out duration-200        
          hover:bg-Blue-Dark 
          checked:bg-Purple-Dark 
          checked:border-transparent 
          checked:bg-[url(../assets/check.svg)] 
          checked:bg-no-repeat 
          checked:bg-center 
          checked:bg-size-[12px] 
          checked:hover:bg-Purple"
                checked={isChecked}
                onChange={handleCheck}
            />

            <p
                className={`text-Gray-100 text-sm ${isChecked ? "line-through text-Gray-300" : ""
                    }`}
            >
                {title}
            </p>

            <button
                className="hover:bg-Gray-700 hover:rounded w-6 h-6 flex items-center justify-center ease-in-out duration-400"
                onClick={onDelete}
            >
                <span className="sr-only">Apagar tarefa</span>
                <TrashIcon
                    className="text-Gray-300 cursor-pointer hover:text-Danger"
                    size={20}
                />
            </button>
        </section>
    )
}
