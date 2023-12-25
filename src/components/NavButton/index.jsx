import styles from "./index.module.css";
import { Link } from "react-router-dom";

function NavButton({ title, color, linkTo }) {
  return (
    <Link to={linkTo}>
      <button style={{ color: color }} className={styles.btnTo}>
        {title}
      </button>
    </Link>
  );
}

export default NavButton;
