import React from "react";
import "./CodeGithub.scss";

export default function CodeGithub() {
  return (
    <div className="cg">
      <h2>Código fuente:</h2>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/erikyvanov/Frontend-Users-Posts"
      >
        <img
          src="https://image.flaticon.com/icons/svg/25/25231.svg"
          alt="logo github"
        />
        Frontend
      </a>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/erikyvanov/API-Users-Posts"
      >
        <img
          src="https://image.flaticon.com/icons/svg/25/25231.svg"
          alt="logo github"
        />
        Backend
      </a>
    </div>
  );
}
