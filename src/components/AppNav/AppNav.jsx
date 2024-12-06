import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <div className={styles.nav}>
      <ul>
        <li>
          <NavLink to={"cities"}>Cities</NavLink>
        </li>
        <li>
          <NavLink to={"countrys"}>Countrys</NavLink>
        </li>
      </ul>
    </div>
  );
}

export { AppNav };
