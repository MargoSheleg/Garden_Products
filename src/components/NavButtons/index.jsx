import styles from "./index.module.css";
import { Link } from "react-router-dom";
import NavButton from "../NavButton";

function NavButtons({ title, linkTo, color }) {
  return (
    <div className={styles.btnsContainer}>
      <Link className={styles.linkToMainPage} to="/">
        <button className={styles.btnToMainPage}>Main page</button>
      </Link>
      <NavButton title={title} color={color} linkTo={linkTo} />
    </div>
  );
}

export default NavButtons;
