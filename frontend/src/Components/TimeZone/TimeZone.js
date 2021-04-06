import React from "react";
import './TimeZone.css';

const Timezone = (props) =>{
  return (
    <article className="timezone">
    <div className="row">
        <h4>{props.location}</h4>
        <h4>{props.currentTime}</h4>
    </div>
    <h5>{props.gmt}</h5>
  </article>
  );
}

export default Timezone;