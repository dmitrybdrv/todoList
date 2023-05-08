import {configureStore} from '@reduxjs/toolkit';
import {appSlice} from 'app/app.slice'
import {authSlice} from 'features/auth/auth.slice'
import {tasksSlice} from 'features/TodolistsList/Todolist/Tasks/tasks.slice';
import {todolistsReducer} from 'features/TodolistsList/todolists.reducer';
import {combineReducers} from 'redux'


const rootReducer = combineReducers({
	tasks: tasksSlice,
	todolists: todolistsReducer,
	app: appSlice,
	auth: authSlice
})

export const store = configureStore({
	reducer: rootReducer,
})


export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// @ts-ignore
window.store = store;
