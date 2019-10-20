import React from "react";
import logo from "/Users/malcolmmachesky/Documents/code/hackathon/TAFED/tafed/src/Dog.gif";

var waitingDone = false;

export default class HelperWaiting extends React.Component {
  render() {
    return (
      <div onLoad={onload}>
        <h1>Waiting to help</h1>
        <img src={logo} alt="loading..." />
      </div>
    );
  }
}
function onload(e) {
  var test = window.setInterval(function() {
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
      if (num == "1" && !waitingDone) {
        waitingDone = true;
        clearInterval(test);
        window.location.href = "/HelperMatched";
      }
    };
  }, 2000);
}
