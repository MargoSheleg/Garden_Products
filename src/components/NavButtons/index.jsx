import styles from "./index.module.css";
import { Link } from "react-router-dom";
import NavButton from "../NavButton";
import { black } from "../../utils/index";

function NavButtons({ title }) {
  return (
    <div className={styles.btnsContainer}>
      <Link className={styles.linkToMainPage} to="/">
        <button className={styles.btnToMainPage}>Main page</button>
      </Link>
      <NavButton title={title} color={black} />
    </div>
  );
}

export default NavButtons;
