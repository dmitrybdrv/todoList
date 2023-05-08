import {AddItemForm} from 'common/components'
import {FilterButton} from "common/components/FilterButton/FilterButton";
import {Title} from "common/components/Title/Title";
import {useActions} from 'common/hooks';
import {tasksThunks} from 'features/TodolistsList/Todolist/Tasks/tasks.slice';
import {Tasks} from "features/TodolistsList/Todolist/Tasks/Tasks";
import {TaskType} from 'features/TodolistsList/todolists.api';
import {TodolistDomainType, todolistsThunks} from 'features/TodolistsList/todolists.reducer'
import React, {FC, useEffect} from 'react'

type PropsType = {
    todolist: TodolistDomainType
    tasks: TaskType[]
}

export const Todolist: FC<PropsType> = React.memo(({tasks, todolist}) => {

    const {fetchTasks, addTask} = useActions(tasksThunks)
    const {removeTodolist, changeTodolistTitle} = useActions(todolistsThunks)


    useEffect(() => {
        fetchTasks(todolist.id)
    }, [])

    const addTaskHandler = (title: string) => addTask({title, todolistId: todolist.id})
    const removeTodolistHandler = () => removeTodolist(todolist.id)
    const changeTodolistTitleHandler = (title: string) => changeTodolistTitle({id: todolist.id, title})


    return <div>
        <h3><Title title={todolist.title} onChangeTitle={changeTodolistTitleHandler} onButtonClickAction={removeTodolistHandler}/></h3>
        <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === 'loading'}/>
        <Tasks tasks={tasks} todolist={todolist}/>
        <div style={{paddingTop: '10px'}}>
            <FilterButton filter={todolist.filter} todoId={todolist.id}/>
        </div>
    </div>
})