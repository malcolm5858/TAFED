import React from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";
function LoginForm(props) {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, { setSubmitting }) => {
        console.log("Submitting");
      }}>
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input name="email" type="text" placeholder="Enter your email" />

            <label htmlFor="email">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
            />
            <button type="submit">Login</button>
          </form>
        );
      }}
    </Formik>
  );
}

export default LoginForm;
