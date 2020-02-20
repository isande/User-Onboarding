import React from "react";
import { withFormik, Form, Field } from "formik";

const UserForm = ({ values }) => {
    return (
        <Form>
            <Field type="text" name="name" placeholder="Enter name" />
            <br/>
            <Field type="email" name="email" placeholder="Email address" />
            <br/>
            <Field type="password" name="password" placeholder="Password" />
            <br/>
            <label>
                I Accept the Terms of Service
                <Field
                    type="checkbox"
                    name="tos"
                    checked={values.tos}
                />
            </label>
            <br/>
            <button type="submit">Submit</button>
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
    }
})(UserForm);

export default FormikUserForm;