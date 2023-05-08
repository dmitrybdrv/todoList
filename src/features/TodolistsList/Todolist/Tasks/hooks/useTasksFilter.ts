import {TaskStatuses} from "common/enums";
import {TaskType} from "features/TodolistsList/todolists.api";
import {TodolistDomainType} from "features/TodolistsList/todolists.reducer";

export const useTasksFilter = (tasks: TaskType[], todolist: TodolistDomainType) => {
    let tasksForTodolist = tasks

    if (todolist.filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return {tasksForTodolist}
}