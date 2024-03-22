import React from "react";
import parse from "html-react-parser";
import "./details.css";

const Details = ({ description }) => {
  return (
    <div className="ProseMirror">
      {parse(description)}
    </div>
  );
};

export default Details;
