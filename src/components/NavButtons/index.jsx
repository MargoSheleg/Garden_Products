import NavButton from "../NavButton";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

function NavButtons({ title, linkTo, color }) {
  const navigate = useNavigate();
  return (
    <div className={styles.btnsContainer}>
      <button className={styles.btnToMainPage} onClick={() => navigate("/")}>
        Main page
      </button>
      <NavButton title={title} color={color} linkTo={linkTo} />
    </div>
  );
}

export default NavButtons;
