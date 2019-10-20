import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

export default class Home extends React.Component {
  state = {
    login: false,
    register: false
  };

  render() {
    const classes = makeStyles(theme => ({
      root: {
        flexGrow: 1
      },
      menuButton: {
        marginRight: theme.spacing(3)
      },
      title: {
        flexGrow: 1
      }
    }));
    const { login } = this.state;
    const { register } = this.state;
    if (login) {
      return <Redirect to="/login" />;
    }
    if (register) {
      return <Redirect to="/Register" />;
    }
    return (
      <div className={classes.root}>
        <AppBar position="fixed" color="secondary">
          <Toolbar>
            <Typography variant="h3" className={classes.title}>
              <Box fontFamily="sans-serif" fontSize="h3.fontSize" m={2}>
                TAFED
              </Box>
            </Typography>
            <Link to="/Login" style={{ textDecoration: "none" }}>
              <Button color="Black">Login</Button>
            </Link>
            <Link to="/Register" style={{ textDecoration: "none" }}>
              <Button color="Black">Register</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
