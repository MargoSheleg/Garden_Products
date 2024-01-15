import PlusMinusBtn from "../PlusMinusBtn";
import { useState } from "react";
import styles from "./index.module.css";
import xBlack from "../../assets/images/xBlack.svg";

function ItemCart({ el, cart, setCart }) {
  function deleteItem() {
    setCart((prevCart) => {
      return prevCart.filter((item) => item !== el);
    });
  }

  function plus() {
    setQuantity(quantity + 1);
  }

  function minus() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }
  const [quantity, setQuantity] = useState(1);

  return (
    <div className={styles.itemCart}>
      <img
        src={`http://localhost:3333${el.image}`}
        className={styles.itemImg}
      />
      <div className={styles.itemInfo}>
        <p className={styles.itemName}>{el.title}</p>
        <div className={styles.priceAndBtnDiv}>
          <PlusMinusBtn plus={plus} minus={minus} quantity={quantity} />

          {el.discont_price !== null ? (
            <div className={styles.pricesCart}>
              <p className={styles.discontPriceCart}>${el.discont_price}</p>
              <p className={styles.priceDCart}>${el.price}</p>
            </div>
          ) : (
            <p className={styles.priceCart}>${el.price}</p>
          )}
        </div>
      </div>
      <img className={styles.xBlack} src={xBlack} onClick={deleteItem} />
    </div>
  );
}

export default ItemCart;
