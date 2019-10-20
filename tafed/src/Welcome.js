import React from "react";
import logo from "/Users/malcolmmachesky/Documents/code/hackathon/TAFED/tafed/src/senior-couple-boarding-bus.jpg";
export default class Welcome extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Welcome to TAFED: Transportaion Assistance For the Elderly and
          Disabled
        </h1>
        <img src={logo} alt="loading..." />
      </div>
    );
  }
}
