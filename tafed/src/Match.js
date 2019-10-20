import React from "react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

export default class Match extends React.Component {
  render() {
    return (
      <div>
        <Link to="/Waiting">
          <Button variant="contained" onClick={onClick}>
            REQUEST HELP
          </Button>
        </Link>
        <p>
          Here you can request help from one of our helpful volunteers, who are
          here to show you how to board the train and arrive at you desired
          locaton.
        </p>
      </div>
    );
  }
}

function onClick(e) {}
