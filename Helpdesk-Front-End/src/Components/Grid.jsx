import React from "react";
import "./Grid.css";

export default function Grid() {
  return (
    <div className="container">
      <div class="card-deck">
        <div className="To-Do-Column">
          <div class="card-header">
            <h4>Free</h4>
          </div>
          <div></div>
        </div>

        <div className="In-Progress-Column"></div>
        <div class="card-header">
          <h4>Free</h4>
        </div>
        <div></div>
        <div className="Code-Review-Column"></div>
        <div class="card-header">
          <h4>Free</h4>
        </div>
        <div></div>
        <div className="Done-Column"></div>
      </div>
    </div>
  );
}
