import styles from "./index.module.css";
import ix from "../../assets/images/x.svg";
import { useState } from "react";

function CongratulationsPopUp({ display, setDisplay }) {
  function removePopup() {
    setDisplay("none");
  }

  return (
    <div
      className={styles.congratulationsPopUpBlock}
      style={{ display: display }}
    >
      <div className={styles.popup}>
        <p className={styles.congratulations}>Congratulations!</p>
        <p className={styles.popupText}>
          Your order has been successfully placed on the website.
        </p>
        <p className={styles.popupText}>
          A manager will contact you shortly to confirm your order.
        </p>
        <img
          className={styles.escapeCross}
          src={ix}
          onClick={() => removePopup()}
        />
      </div>
    </div>
  );
}

export default CongratulationsPopUp;
