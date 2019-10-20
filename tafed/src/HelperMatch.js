import React from "react";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

export default class HelperMatch extends React.Component {
  render() {
    return (
      <div>
        <Link href="/HelperWaiting">
          <Button variant="contained">Volunteer</Button>
        </Link>
        <p>Click the button above to actively volunteer.</p>
      </div>
    );
  }
}
