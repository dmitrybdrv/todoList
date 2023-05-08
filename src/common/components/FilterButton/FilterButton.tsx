import {Button} from "@mui/material";
import {useActions} from "common/hooks";
import {FilterValuesType, todolistsActions} from "features/TodolistsList/todolists.reducer";
import React, {FC} from 'react';

type PropsType = {
    filter: FilterValuesType
    todoId: string
}

export const FilterButton: FC<PropsType> = ({filter, todoId}) => {

    const {changeTodolistFilter} = useActions(todolistsActions)
    const changeClickFilter = (filter: FilterValuesType) => () => changeTodolistFilter({id: todoId, filter})

    return (
        <>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={changeClickFilter('all')}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={changeClickFilter('active')}
                    color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={changeClickFilter('completed')}
                    color={'secondary'}>Completed
            </Button>
        </>
    );
};