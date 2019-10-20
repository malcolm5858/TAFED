import React from "react";

var name = "George";
var station = "Roosevelt";
export default class HelperMatched extends React.Component {
  render() {
    return (
      <div>
        <h1>You have been matched with someone who needs your help</h1>
        <p>
          there name is {name} and they will meet you at {station} station
        </p>
      </div>
    );
  }
}
