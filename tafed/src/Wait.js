import React from "react";
import { Redirect } from "react-router-dom";
import Matched from "./Matched";
var name = "";
var station = "";

export default class Wait extends React.Component {
  render() {
    if (name == "") {
      this.forceUpdate();
    } else {
      return <Matched name={name} station={station} />;
    }
  }
}

const Http = new XMLHttpRequest();
const url = "http://127.0.0.1:5000/matched?helper=0";
Http.open("GET", url);
Http.send();
Http.onreadystatechange = e => {
  var response = Http.responseText;
  console.log(response);

  var splits = response.split('"');
  name = splits[3];
  station = splits[7];
  console.log(name);
};
