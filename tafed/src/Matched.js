import React from "react";
import { func } from "prop-types";

var name = "Joe";
var station = "Roosevelt";

export default class Matched extends React.Component {
  render() {
    return (
      <div onLoad={onload}>
        <h1>You have been matched with a helper</h1>
        <p>
          there name is {name} and they will meet you at {station} station
        </p>
      </div>
    );
  }
}
function onload(e) {
  // const Http = new XMLHttpRequest();
  // const url = "http://127.0.0.1:5000/matched?helper=0";
  // Http.open("GET", url);
  // Http.send();
  // Http.onreadystatechange = e => {
  //   var response = Http.responseText;
  //   console.log(response);
  //   var splits = response.split('"');
  //   name = splits[3];
  //   station = splits[7];
  //   console.log(name);
  //};
}
