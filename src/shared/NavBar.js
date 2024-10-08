import * as React from "react";
import { NavLink } from "react-router-dom";

const languages = [
  {
    name: "All",
    param: "all",
  },
  {
    name: "JavaScript",
    param: "javascript",
  },
  {
    name: "Ruby",
    param: "ruby",
  },
  {
    name: "Python",
    param: "python",
  },
  {
    name: "Java",
    param: "java",
  },
];

export default function NavBar() {
  return (
    <ul className="nav">
      {languages.map(({ name, param }) => (
        <li key={param}>
          <NavLink
            style={({ isActive }) => ({
              fontWeight: isActive ? "bold" : "normal",
            })}
            to={`/popular/${param}`}
          >
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
