import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ values, errors, touched, status }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        console.log('status change', status);
        status && setUsers(users => [...users, status]);
    }, [status]);
    return (
        <Form>
            <Field type="text" name="name" placeholder="Enter name" />
            {touched.name && errors.name && <div>{errors.name}</div>}
            <br/>
            <Field type="email" name="email" placeholder="Email address" />
            {touched.email && errors.email && <div>{errors.email}</div>}
            <br/>
            <Field type="password" name="password" placeholder="Password" />
            {touched.password && errors.password && <div>{errors.password}</div>}
            <br/>
            <label>
                I Accept the Terms of Service
                <Field
                    type="checkbox"
                    name="tos"
                    checked={values.tos}
                />
            </label>
            {touched.tos && errors.tos && <div>{errors.tos}</div>}
            <br/>
            <button type="submit">Submit</button>
            <br/>
            {users.map(user => (
                <ul key={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Email: {user.email}</li>
                </ul>
            ))}
        </Form>
    );
}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required("You must enter a name")
            .min(3, "Name too short"),
        email: Yup.string()
            .required("You must enter an email address")
            .email("Not a valid email address"),
        password: Yup.string()
            .required("You must enter a password")
            .min(6, "Password must be at least 6 characters"),
        tos: Yup.boolean()
            .required('You must accept the TOS')
            .oneOf([true], 'You must accept the TOS')
    }),
    handleSubmit(values, { setStatus, resetForm }) {
        axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
                console.log('Success!', res);
                setStatus(res.data);
                resetForm();
            })
            .catch(err => console.log(err.response));
    }
})(UserForm);

export default FormikUserForm;