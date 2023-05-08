import {Grid, Paper} from '@mui/material'
import {AddItemForm} from 'common/components'
import {useActions} from 'common/hooks';
import {selectIsLoggedIn} from 'features/auth/auth.selectors';
import {selectTasks} from 'features/TodolistsList/Todolist/Tasks/tasks.selectors';
import {todolistsThunks} from 'features/TodolistsList/todolists.reducer'
import {selectTodolists} from 'features/TodolistsList/todolists.selectors';
import React, {useCallback, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {Todolist} from './Todolist/Todolist'


export const TodolistsList = () => {
    const todolists = useSelector(selectTodolists)
    const tasks = useSelector(selectTasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    const {addTodolist, fetchTodolists} = useActions(todolistsThunks)

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        fetchTodolists({})
    }, [])

    const addTodolistHandler = useCallback((title: string) => {
        addTodolist(title)
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolistHandler}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id]

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}
