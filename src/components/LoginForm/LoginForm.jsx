import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../../redux/auth/operations';
import css from '../LoginForm/LoginForm.module.css';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = (values, { resetForm }) => {
        dispatch(login(values));
        resetForm();
    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form className={css.form} autoComplete="off">
                <label className={css.label}>
                    Email
                    <Field type="email" name="email" className={css.input} />
                    <ErrorMessage name="email" component="p" className={css.error} />
                </label>
                <label className={css.label}>
                    Password
                    <Field type="password" name="password" className={css.input} />
                    <ErrorMessage name="password" component="p" className={css.error} />
                </label>
                <button type="submit" className={css.button}>Log In</button>
            </Form>
        </Formik>
    );
};

export default LoginForm;