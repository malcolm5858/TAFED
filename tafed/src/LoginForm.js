import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./styles.css";
import { Redirect } from "react-router-dom";

class LoginForm extends React.Component {
  state = {
    redirect: false
  };
  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          //on Submit data
          var email = values.email;
          var password = values.password;
          //TODO: Send data to the server
          this.setState({ redirect: true });
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required("Required"),
          password: Yup.string()
            .required("No password  provided.")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(/(?=.*[0-9])/, "Password must contain a number.")
        })}>
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
              <input
                name="email"
                type="text"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email && touched.email && "error"}
              />
              {errors.email && touched.email && (
                <div className="input-feedback">{errors.email}</div>
              )}
              <label htmlFor="email">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.password && touched.password && "error"}
              />
              {errors.password && touched.password && (
                <div className="input-Feedback">{errors.password}</div>
              )}
              <button type="submit" disabled={isSubmitting}>
                Login
              </button>
            </form>
          );
        }}
      </Formik>
    );
  }
}

export default LoginForm;
