import {Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {RequestStatusType} from "app/app.slice";
import {EditableSpan} from "common/components/EditableSpan/EditableSpan";
import {useAppSelector} from "common/hooks";
import {selectTodolists} from "features/TodolistsList/todolists.selectors";
import React, {FC} from 'react';

type PropsType = {
    title: string
    onChangeTitle: (newValue: string) => void
    onButtonClickAction: () => void
}

export const Title: FC<PropsType> = ({title, onChangeTitle, onButtonClickAction}) => {
    const todolist = useAppSelector(selectTodolists)

    const status = todolist.find(el => el.entityStatus === 'loading')

    const buttonClickHandler = () => {
        onButtonClickAction()
    }

    return (
        <>
            <EditableSpan value={title} onChange={onChangeTitle}/>
            <IconButton onClick={buttonClickHandler} disabled={!!status}>
                <Delete/>
            </IconButton>
        </>


    );
};