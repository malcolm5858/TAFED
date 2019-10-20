import React from "react";

var name = "";
var station = "";
export default class Matched extends React.Component {
  render() {
    return (
      <div>
        <h1>You have been matched with a helper</h1>
        <p>
          there name is {name} and they will meet you at {station} station
        </p>
      </div>
    );
  }
}
