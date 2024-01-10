import PlusMinusBtn from "../PlusMinusBtn";
import styles from "./index.module.css";
import xBlack from "../../assets/images/xBlack.svg";

function ItemCart({ el, cart, setCart }) {
  return (
    <div className={styles.itemCart}>
      <img
        src={`http://localhost:3333${el.image}`}
        className={styles.itemImg}
      />
      <div className={styles.itemInfo}>
        <p className={styles.itemName}>{el.title}</p>
        <div className={styles.priceAndBtnDiv}>
          <PlusMinusBtn />

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
      <img className={styles.xBlack} src={xBlack} />
    </div>
  );
}

export default ItemCart;
