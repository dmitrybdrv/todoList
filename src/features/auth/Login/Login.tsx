import {Checkbox, FormControlLabel, TextField} from "@mui/material";
import {UniForm} from "common/components/form/UniForm";
import {useActions} from 'common/hooks';
import {ResponseType} from 'common/types';
import {LoginParamsType} from 'features/auth/auth.api';
import {selectIsLoggedIn} from 'features/auth/auth.selectors';
import {authThunks} from 'features/auth/auth.slice';
import {FormikHelpers, useFormik} from 'formik'
import React from 'react'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'

export type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {

    const isLoggedIn = useSelector(selectIsLoggedIn)
    const {login} = useActions(authThunks)

    const formik = useFormik({
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Must be 3 characters or more';
            }

            return errors
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
            login({...values})
                .unwrap()
                .catch((reason: ResponseType) => {
                    const {fieldsErrors} = reason
                    if (fieldsErrors) {
                        fieldsErrors.forEach((fieldError) => {
                            formikHelpers.setFieldError(fieldError.field, fieldError.error)
                        })
                    }
                })
        },
    })

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }


    return (
        <>
         <UniForm
                formik={formik}
                title={'Login'}
                btName={'LOGIN'}
                description={'Already have an account?'}
                link={{linkText: 'Register', navigateTo: '/'}}
            >

                <TextField
                    label="Email"
                    margin="normal"
                    {...formik.getFieldProps('email')}
                />

                <TextField
                    type="password"
                    label="Password"
                    margin="normal"
                    {...formik.getFieldProps('password')}
                />

                <FormControlLabel
                    label={'Remember me'}
                    control={<Checkbox
                        {...formik.getFieldProps('rememberMe')}
                        checked={formik.values.rememberMe}
                    />}
                />

            </UniForm>
        </>
    )
}