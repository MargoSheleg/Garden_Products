import styles from "./index.module.css";
import { Link } from "react-router-dom";

function NavButton({ title, color, linkTo }) {
  return (
    <div className={styles.btnContainer}>
      <Link to={linkTo}>
        <button style={{ color: color }} className={styles.btnTo}>
          {title}
        </button>
      </Link>
    </div>
  );
}

export default NavButton;
