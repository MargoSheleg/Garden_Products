import styles from "./index.module.css";

function Title({ title }) {
  return <h2 className={styles.h2}>{title}</h2>;
}

export default Title;
