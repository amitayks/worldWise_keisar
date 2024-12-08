import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        {" "}
        &copy; copy right {new Date().getFullYear()} worlWise keisar
      </p>
    </footer>
  );
}

export default Footer;
