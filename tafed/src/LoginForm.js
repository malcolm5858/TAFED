import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import "./styles.css";
import { Redirect } from "react-router-dom";

class LoginForm extends React.Component {
  state = {
    Helper: false,
    Helpee: false
  };
  render() {
    const { Helper } = this.state;
    const { Helpee } = this.state;
    if (Helper) {
      return <Redirect to="/2" />;
    }
    if (Helpee) {
      return <Redirect to="/1" />;
    }

    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          //on Submit data
          var email = values.email;
          var password = values.password;
          //TODO: Send data to the server

          if (email == "george@example.com") {
            this.setState({ Helpee: true });
          } else if (password != "1234qwer") {
            this.setState({ Helper: true });
          } else {
            window.alert("Username or Password incorrect");
            window.location.reload();
          }
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
