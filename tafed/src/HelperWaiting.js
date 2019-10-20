import React from "react";
import logo from "/Users/malcolmmachesky/Documents/code/hackathon/TAFED/tafed/src/Dog.gif";
export default class HelperWaiting extends React.Component {
  render() {
    return (
      <div>
        <h1>Waiting to help</h1>
        <img src={logo} alt="loading..." />
      </div>
    );
  }
}
