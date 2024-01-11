import styles from "./index.module.css";

function PlusMinusBtn({ plus, minus, quantity }) {
  return (
    <div className={styles.quantityButtonDiv}>
      <button className={styles.minusBtn} onClick={minus}>
        -
      </button>
      <p className={styles.quantity}>{quantity}</p>
      <button className={styles.plusBtn} onClick={plus}>
        +
      </button>
    </div>
  );
}

export default PlusMinusBtn;
