import React from "react";

var name = "George";
var station = "Roosevelt";
export default class HelperMatched extends React.Component {
  render() {
    return (
      <div>
        <h1>Success!</h1>
          <h2>{name}</h2>
          <p>Nearest CTA 'L' Station: {station}</p>
      </div>
    );
  }
}
