import styles from "./index.module.css";

function PlusMinusBtn() {
  return (
    <div className={styles.quantityButtonDiv}>
      <button className={styles.minusBtn}>-</button>
      <p className={styles.quantity}>quantity</p>
      <button className={styles.plusBtn}>+</button>
    </div>
  );
}

export default PlusMinusBtn;
