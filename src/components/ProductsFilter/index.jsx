import styles from "./index.module.css";
import { useState } from "react";
import downPointingTriange from "../../assets/images/downPointingTriange.svg";

function ProductsFilter({
  isDiscounted,
  setIsDiscounted,
  fromVal,
  setFromVal,
  toVal,
  setToVal,
  displayCheckBox,
}) {
  function showOnlyDiscountedItems() {
    if (isDiscounted === false) {
      setIsDiscounted(true);
    } else {
      setIsDiscounted(false);
    }
  }

  const [display, setDisplay] = useState("none");
  const [filterBy, setFilterBy] = useState("by default");

  const [isRotated, setIsRotated] = useState(false);
  function rotateImg(display) {
    setIsRotated(!isRotated);
    setDisplay(display);
  }

  const [colorOfBydefault, setColorOfBydefault] = useState("#282828");
  const [colorOfNewest, setColorOfNewest] = useState("#8B8B8B");
  const [colorOfPriceHighLow, setColorOfPriceHighLow] = useState("#8B8B8B");
  const [colorOfPriceLowHigh, setColorOfPriceLowHigh] = useState("#8B8B8B");
  function changeColorBydefault() {
    setFilterBy("by default");
    setColorOfBydefault("#282828");

    setColorOfNewest("#8B8B8B");
    setColorOfPriceHighLow("#8B8B8B");
    setColorOfPriceLowHigh("#8B8B8B");
  }

  function changeColorNewest() {
    setFilterBy("newest");
    setColorOfNewest("#282828");

    setColorOfBydefault("#8B8B8B");
    setColorOfPriceHighLow("#8B8B8B");
    setColorOfPriceLowHigh("#8B8B8B");
  }

  function changeColorPriceHighLow() {
    setFilterBy("price: high-low");
    setColorOfPriceHighLow("#282828");

    setColorOfNewest("#8B8B8B");
    setColorOfBydefault("#8B8B8B");
    setColorOfPriceLowHigh("#8B8B8B");
  }

  function changeColorPriceLowHigh() {
    setFilterBy("price: low-high");
    setColorOfPriceLowHigh("#282828");

    setColorOfPriceHighLow("#8B8B8B");
    setColorOfNewest("#8B8B8B");
    setColorOfBydefault("#8B8B8B");
  }

  return (
    <div className={styles.filterProducts}>
      <label>Price</label>
      <input
        type="number"
        placeholder="from"
        className={styles.inputFilter}
        value={fromVal}
        onChange={(event) => setFromVal(event.target.value)}
      />
      <input
        type="number"
        placeholder="to"
        className={styles.inputFilter}
        value={toVal}
        onChange={(event) => setToVal(event.target.value)}
      />

      <div className={styles.checkboxDiv} style={{ display: displayCheckBox }}>
        <label className={styles.discountedItems}>Discounted items</label>
        <input
          type="checkbox"
          className={styles.checkbox}
          onClick={() => showOnlyDiscountedItems()}
        />
      </div>

      <label>Sorted</label>
      <div className={styles.btnScrollDownDiv}>
        <button
          className={styles.filterBtn}
          onClick={() =>
            display == "none" ? rotateImg("flex") : rotateImg("none")
          }
        >
          <p>{filterBy}</p>
          <img
            src={downPointingTriange}
            className={`${styles.pointerImg} ${isRotated ? styles.active : ""}`}
          />
        </button>

        <div className={styles.scrollDown} style={{ display: `${display}` }}>
          <button
            className={styles.byDefault}
            onClick={() => changeColorBydefault()}
            style={{ color: colorOfBydefault }}
          >
            by default
          </button>
          <button
            className={styles.newest}
            onClick={() => changeColorNewest()}
            style={{ color: colorOfNewest }}
          >
            newest
          </button>
          <button
            className={styles.priceHighLow}
            onClick={() => changeColorPriceHighLow()}
            style={{ color: colorOfPriceHighLow }}
          >
            price: high-low
          </button>
          <button
            className={styles.priceLowHigh}
            onClick={() => changeColorPriceLowHigh()}
            style={{ color: colorOfPriceLowHigh }}
          >
            price: low-high
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductsFilter;
