/* eslint-disable react/prop-types */
import styles from "./Button.module.css";

function Button({ children, type, onClick }) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

export { Button };
