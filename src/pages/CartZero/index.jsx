import styles from "./index.module.css";
import NavButton from "../../components/NavButton";
import Title from "../../components/Title";
import { useNavigate } from "react-router-dom";

function CartZero() {
  const navigate = useNavigate();
  return (
    <div className={styles.cartZero}>
      <div className={styles.titleOfCartDiv}>
        <Title title={"Shopping cart"} />
        <NavButton title={"Back to the store"} color={"#8B8B8B"} linkTo={"/"} />
      </div>
      <p className={styles.cartZeroP}>
        Looks like you have no items in your basket currently.
      </p>
      <button onClick={() => navigate("/")} className={styles.cartZeroBtn}>
        Continue Shopping
      </button>
    </div>
  );
}

export default CartZero;
