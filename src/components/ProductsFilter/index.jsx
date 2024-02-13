import { useState } from "react";
import { useSelector } from "react-redux";
import { assignFromVal, assignToVal } from "../../store/slices/filterSlice";
import { useDispatch } from "react-redux";
import {
  changeIsDiscounted,
  changeShowByDefault,
  changeShowHighLow,
  changeShowLowHigh,
} from "../../store/slices/filterSlice";
import styles from "./index.module.css";
import downPointingTriange from "../../assets/images/downPointingTriange.svg";

function ProductsFilter({ displayCheckBox }) {
  const fromVal = useSelector((store) => store.filter.fromVal);
  const toVal = useSelector((store) => store.filter.toVal);
  const isDiscounted = useSelector((store) => store.filter.isDiscounted);
  const dispatch = useDispatch();

  function showOnlyDiscountedItems() {
    if (isDiscounted === false) {
      dispatch(changeIsDiscounted(true));
    } else {
      dispatch(changeIsDiscounted(false));
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
  const [colorOfPriceHighLow, setColorOfPriceHighLow] = useState("#8B8B8B");
  const [colorOfPriceLowHigh, setColorOfPriceLowHigh] = useState("#8B8B8B");

  function changeColorBydefault() {
    setFilterBy("by default");
    setColorOfBydefault("#282828");

    setColorOfPriceHighLow("#8B8B8B");
    setColorOfPriceLowHigh("#8B8B8B");

    dispatch(changeShowByDefault(true));
    dispatch(changeShowHighLow(false));
    dispatch(changeShowLowHigh(false));
  }

  function changeColorPriceHighLow() {
    setFilterBy("price: high-low");
    setColorOfPriceHighLow("#282828");

    setColorOfBydefault("#8B8B8B");
    setColorOfPriceLowHigh("#8B8B8B");

    dispatch(changeShowByDefault(false));
    dispatch(changeShowHighLow(true));
    dispatch(changeShowLowHigh(false));
  }

  function changeColorPriceLowHigh() {
    setFilterBy("price: low-high");
    setColorOfPriceLowHigh("#282828");

    setColorOfPriceHighLow("#8B8B8B");
    setColorOfBydefault("#8B8B8B");

    dispatch(changeShowByDefault(false));
    dispatch(changeShowHighLow(false));
    dispatch(changeShowLowHigh(true));
  }

  return (
    <div className={styles.filterProducts}>
      <div className={styles.priceDiv}>
        <label>Price</label>
        <input
          type="number"
          placeholder="from"
          className={styles.inputFilter}
          value={fromVal === 0 ? "" : fromVal}
          onChange={(event) => dispatch(assignFromVal(event.target.value))}
        />
        <input
          type="number"
          placeholder="to"
          className={styles.inputFilter}
          value={toVal === 0 ? "" : toVal}
          onChange={(event) => dispatch(assignToVal(event.target.value))}
        />
      </div>

      <div className={styles.checkboxDiv} style={{ display: displayCheckBox }}>
        <label className={styles.discountedItems}>Discounted items</label>
        <input
          type="checkbox"
          className={styles.checkbox}
          onClick={() => showOnlyDiscountedItems()}
        />
      </div>

      <div className={styles.btnScrollDownDiv}>
        <label>Sorted</label>
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
