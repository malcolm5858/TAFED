import React from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import "./styles.css";
import { Redirect } from "react-router-dom";

function Checkbox(props) {
  return (
    <Field name={props.name}>
      {({ field, form }) => (
        <label>
          <input
            type="checkbox"
            {...props}
            checked={field.value.includes(props.value)}
            onChange={() => {
              if (field.value.includes(props.value)) {
                const nextValue = field.value.filter(
                  value => value !== props.value
                );
                form.setFieldValue(props.name, nextValue);
              } else {
                const nextValue = field.value.concat(props.value);
                form.setFieldValue(props.name, nextValue);
              }
            }}
          />
        </label>
      )}
    </Field>
  );
}

function CheckboxDisablityFunc(props) {
  if (!props.ishelper.includes("0")) {
    return (
      <React.Fragment>
        <label>Do you need assistance</label>
        <Checkbox name="isHelper" value="2" />
      </React.Fragment>
    );
  } else {
    return <div></div>;
  }
}

class Register extends React.Component {
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
        initialValues={{ email: "", password: "", name: "", isHelper: [] }}
        onSubmit={(values, { setSubmitting }) => {
          //on Submit data
          var email = values.email;
          var password = values.password;
          var name = values.name;
          var isHelper;
          var needsaccessibility;
          if (values.isHelper.includes("0")) {
            isHelper = 1;
          } else {
            isHelper = 0;
          }
          if (values.isHelper.includes("2")) {
            needsaccessibility = 1;
          } else {
            needsaccessibility = 0;
          }
          //TODO: Send data to the server
          // const https = require("http");

          // const data = JSON.stringify({
          //   email: email,
          //   password: password,
          //   name: name,
          //   isHelper: isHelper,
          //   needsaccessibility: needsaccessibility
          // });

          // const options = {
          //   hostname: "127.0.0.1",
          //   port: 5000,
          //   path: "/user?",
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //     "Content-Length": data.length
          //   }
          // };

          // const req = https.request(options, res => {
          //   console.log(`statusCode: ${res.statusCode}`);

          //   res.on("data", d => {
          //     console.log(d);
          //   });
          // });

          // req.on("error", error => {
          //   console.error(error);
          // });

          // req.write(data);
          // req.end();
          const https = require("http");
          const options = {
            hostname: "127.0.0.1",
            port: 5000,
            path: "/user?email=malcolm9292@gmail.com&password=password",
            method: "GET"
          };

          const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`);

            res.on("data", d => {
              console.log(d);
            });
          });

          req.on("error", error => {
            console.error(error);
          });

          req.end();
          var good = true;
          if (good) this.setState({ redirect: true });
          else {
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
            .matches(/(?=.*[0-9])/, "Password must contain a number."),
          name: Yup.string().min(1, "Enter your name")
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
          var isHelper = values.isHelper;
          let checkboxDisablity = <CheckboxDisablityFunc ishelper={isHelper} />;
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
              <label htmlFor="email">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.name && touched.name && "error"}
              />
              {errors.name && touched.name && (
                <div className="input-feedback">{errors.name}</div>
              )}
              <label>Are you a helper</label>
              <Checkbox name="isHelper" value="0" />
              {checkboxDisablity}

              <button type="submit" disabled={isSubmitting}>
                Register
              </button>
            </form>
          );
        }}
      </Formik>
    );
  }
}

export default Register;
