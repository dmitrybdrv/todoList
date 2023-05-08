import {useTasksFilter} from "features/TodolistsList/Todolist/Tasks/hooks/useTasksFilter";
import {Task} from "features/TodolistsList/Todolist/Tasks/Task/Task";
import {TaskType} from "features/TodolistsList/todolists.api";
import {TodolistDomainType} from "features/TodolistsList/todolists.reducer";
import React, {FC} from 'react';

type PropsType = {
    tasks: TaskType[]
    todolist: TodolistDomainType
}

export const Tasks: FC<PropsType> = ({tasks, todolist}) => {

    const {tasksForTodolist} = useTasksFilter(tasks, todolist)

    return (
        <div>
            {tasksForTodolist.map(t =>
                <Task
                    key={t.id}
                    task={t}
                    todolistId={todolist.id}/>)}
        </div>
    );
};