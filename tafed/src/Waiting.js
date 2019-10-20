import React from "react";
import logo from "/Users/malcolmmachesky/Documents/code/hackathon/TAFED/tafed/src/Dog.gif";
import { Redirect } from "react-router-dom";
import SelectInput from "@material-ui/core/Select/SelectInput";
var waitingDone = false;
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}
window.setInterval(function() {
  const Http = new XMLHttpRequest();
  const url = "http://127.0.0.1:5000/status?helper=1";
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange = e => {
    var response = Http.responseText;
    console.log(response);
    var num;
    for (var i = 0; i < response.length; i++) {
      if (response.charAt(i) == "1" || response.charAt(i) == "0") {
        num = response.charAt(i);
      }
    }
    if (num == "1") {
    }
  };
}, 5000);

export default class Waiting extends React.Component {
  render() {
    if (waitingDone) {
      return <Redirect to="/Matched" />;
    } else {
      return (
        <div>
          <h1>Waiting For a Helper</h1>
          <img src={logo} alt="loading..." />
        </div>
      );
    }
  }
}
