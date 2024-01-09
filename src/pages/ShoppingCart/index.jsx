import Title from "../../components/Title/index";
import styles from "./index.module.css";
import NavButton from "../../components/NavButton/index";
import { useState } from "react";

function ShoppingCart(cart, addToCart, itemCounter, setItemCounter) {
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <div className={styles.shoppingCart}>
      <div className={styles.titleOfCartDiv}>
        <Title title={"Shopping cart"} />
        <NavButton title={"Back to the store"} color={"#8B8B8B"} linkTo={"/"} />
      </div>

      <div className={styles.ordersAndDetailsDiv}>
        <div className={styles.itemsDiv}></div>

        <div className={styles.orderDetailsDiv}>
          <h2 className={styles.orderDetails}>Order details</h2>
          <p className={styles.itemCounter}>{itemCounter} items</p>
          <div className={styles.totalDiv}>
            <p className={styles.total}>Total</p>
            <p className={styles.totalPrice}>${totalPrice}</p>
          </div>
          <input
            className={styles.inputNameCart}
            type="text"
            placeholder="Name"
          />
          <input
            className={styles.inputPhoneCart}
            type="text"
            placeholder="Phone number"
          />
          <input
            className={styles.inputEmailCart}
            type="text"
            placeholder="Email"
          />
          <button className={styles.orderBtnCart}>Order</button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
