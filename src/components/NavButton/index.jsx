import styles from "./index.module.css";

function NavButton({ title, color }) {
  return (
    <button style={{ color: color }} className={styles.btnTo}>
      {title}
    </button>
  );
}

export default NavButton;
