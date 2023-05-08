import {Checkbox} from '@mui/material'
import {Title} from "common/components/Title/Title";
import {TaskStatuses} from 'common/enums';
import {useActions} from "common/hooks";
import {tasksThunks} from "features/TodolistsList/Todolist/Tasks/tasks.slice";
import {TaskType} from 'features/TodolistsList/todolists.api'
import React, {ChangeEvent, FC} from 'react'

type PropsType = {
    task: TaskType
    todolistId: string
}

export const Task: FC<PropsType> = React.memo(({task, todolistId}) => {
    const {updateTask, removeTask} = useActions(tasksThunks)

    const onClickRemoveTaskHandler = () => removeTask({taskId: task.id, todolistId: todolistId})
    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        updateTask({
            taskId: task.id,
            domainModel: {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New},
            todolistId: todolistId
        })
    }
    const onChangeTaskTitleHandler = (newValue: string) => {
        updateTask({taskId: task.id, todolistId: todolistId, domainModel: {title: newValue}})
    }


    return <div key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeTaskStatusHandler}/>

        <Title
            title={task.title}
            onChangeTitle={onChangeTaskTitleHandler}
            onButtonClickAction={onClickRemoveTaskHandler}/>

    </div>
})