import styles from "./index.module.css";
import error from "../../assets/images/404.svg";
import { black, green } from "../../utils/index";
import { useState } from "react";
import { Link } from "react-router-dom";

function NotFound() {
  const [btnColorGreen, changeBtnColorUseStateFunction] = useState(green);

  function changeColorOfBtn(color) {
    changeBtnColorUseStateFunction(color);
  }

  return (
    <div className={styles.notFound}>
      <img src={error} />
      <h2 className={styles.pageNotFound}>Page Not Found</h2>
      <p className={styles.pOfTheError}>
        We’re sorry, the page you requested could not be found.
        <br /> Please go back to the homepage.
      </p>
      <Link to="/">
        <button
          className={styles.btnGoHome}
          style={{ backgroundColor: btnColorGreen }}
          onMouseEnter={() => changeColorOfBtn(black)}
          onMouseLeave={() => changeColorOfBtn(green)}
        >
          Go Home
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
