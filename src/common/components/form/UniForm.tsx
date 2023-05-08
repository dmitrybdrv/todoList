import {Button, FormControl, FormGroup, FormLabel, Grid, Typography} from "@mui/material";
import {Link} from 'react-router-dom'
import {Formik} from "formik";
import React, {FC} from 'react';
import style from './styles.module.css'


type PropsType = {
    formik: any
    children: any;
    title: string
    btName: string
    paragraph?: string
    description?: string
    link?: { linkText: string, navigateTo: string }
}


export const UniForm: FC<PropsType> = (
    {
        formik,
        children,
        btName,
        title,
        ...restProps
    }
) => {

    return (

        <Grid container justifyContent="center">
            <Grid item xs={4}>
                <Formik
                    {...formik}
                >
                    <form onSubmit={formik.handleSubmit} style={{textAlign: 'center'}}>
                        <FormControl>

                            <Typography
                                component={'h2'}
                                style={{fontWeight: '600', fontSize: '26px', textAlign: 'center'}}
                            >
                                {title}
                            </Typography>
                            <FormLabel style={{width: '250px'}}>{restProps.paragraph && restProps.paragraph}</FormLabel>

                            <FormGroup sx={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
                                {children}
                            </FormGroup>

                            <Button type={'submit'}
                                    variant={'contained'}
                                    disabled={!(formik.isValid && formik.dirty)}
                                    color={'primary'}>
                                {btName}
                            </Button>

                            {restProps.description && (
                                <Typography
                                    sx={{
                                        m: '20px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        opacity: '0.6',
                                    }}
                                    alignSelf={'center'}
                                >
                                    {restProps.description}
                                </Typography>)
                            }
                            {restProps.link && <Link className={style.link}
                                                     to={restProps.link.navigateTo}>
                                {restProps.link.linkText}
                            </Link>}

                        </FormControl>
                    </form>
                </Formik>
            </Grid>
        </Grid>

    );
};