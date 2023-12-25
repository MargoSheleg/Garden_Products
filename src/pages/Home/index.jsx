import styles from "./index.module.css";
import { green, black, white } from "../../utils/index";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as handsImage } from "../../assets/images/hands.svg";

function Home({ categoriesFromServer }) {
  const [btnColorGreen, changeBtnColorGB] = useState(green);

  const [btnColorWhite, changeBtnColorWB] = useState(white);
  const [btnTextColor, changeBtnTextColor] = useState(black);

  function changeColorOfBtnBlackAndGreen(color) {
    changeBtnColorGB(color);
  }
  function changeColorOfBtnBlackAndWhite(bgColor, color) {
    if (getADiscountBtn === "Get a discount") {
      changeBtnColorWB(bgColor);
      changeBtnTextColor(color);
    }
  }

  const [getADiscountBtn, changeGetADiscountBtn] = useState("Get a discount");

  const [nameTitle, setNameTitle] = useState("");
  const [phoneTitle, setPhoneTitle] = useState("");
  const [emailTitle, setEmailTitle] = useState("");

  const [errorAllFields, setErrorAllFields] = useState("none");

  const errorText = "All fields must be filled!";

  function changeTheTextBtnAndSendReq(color, bgColor) {
    if (nameTitle !== "" && phoneTitle !== "" && emailTitle !== "") {
      const obj = {
        name: nameTitle,
        phoneNumber: phoneTitle,
        email: emailTitle,
      };
      fetch("http://localhost:3333", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      });
      changeBtnTextColor(color);
      changeBtnColorWB(bgColor);
      changeGetADiscountBtn("Request Submitted");
      setErrorAllFields("none");

      setNameTitle("");
      setPhoneTitle("");
      setEmailTitle("");
    } else {
      setErrorAllFields("inline");
    }
  }

  return (
    <div>
      <div className={styles.amazingDiscountsDiv}>
        <h1 className={styles.h1}>
          Amazing Discounts
          <br /> on Garden Products!
        </h1>
        <button
          className={styles.checkOutBtn}
          onMouseEnter={() => changeColorOfBtnBlackAndGreen(black)}
          onMouseLeave={() => changeColorOfBtnBlackAndGreen(green)}
          style={{ backgroundColor: btnColorGreen }}
        >
          Check out
        </button>
      </div>

      <div className={styles.categories}>
        <div className={styles.categoriesTitle}>
          <h2 className={styles.h2}>Categories</h2>
          <Link to="/categories">
            <button className={styles.buttonAllCategories}>
              All categories
            </button>
          </Link>
        </div>
        <div className={styles.categoriesFiveBlocks}>
          {categoriesFromServer &&
            categoriesFromServer.map((el) => (
              <Link
                className={styles.link}
                to={`/categories/${el.id}`}
                key={el.id}
              >
                <div className={styles.categoriesBlockDiv}>
                  <img
                    className={styles.categoriesBlocksImg}
                    src={"http://localhost:3333" + el.image}
                    alt={el.title}
                  />
                  <p className={styles.categoriesBlocksP}>{el.title}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>

      <div className={styles.discount}>
        <p className={styles.discountText}>5% off on the first order</p>
        <div className={styles.photoAndInputs}>
          <img src={handsImage} alt="Hands" />
          <div className={styles.getDiscount}>
            <input
              value={nameTitle}
              onChange={(event) => setNameTitle(event.target.value)}
              className={styles.inputDiscount}
              placeholder="Name"
              type="text"
            />
            <input
              value={phoneTitle}
              onChange={(event) => setPhoneTitle(event.target.value)}
              className={styles.inputDiscount}
              placeholder="Phone number"
              type="text"
            />
            <input
              value={emailTitle}
              onChange={(event) => setEmailTitle(event.target.value)}
              className={styles.inputDiscount}
              placeholder="Email"
              type="text"
            />
            <p
              className={styles.errorNotAllFieldsFilled}
              style={{ display: errorAllFields }}
            >
              {errorText}
            </p>
            <button
              style={{ backgroundColor: btnColorWhite, color: btnTextColor }}
              className={styles.btnGetDiscount}
              onMouseEnter={() => changeColorOfBtnBlackAndWhite(black, white)}
              onMouseLeave={() => changeColorOfBtnBlackAndWhite(white, black)}
              onClick={() => changeTheTextBtnAndSendReq(green, white)}
            >
              {getADiscountBtn}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.saleTitle}>
        <h2 className={styles.saleh2}>Sale</h2>
        <Link to="/allsales">
          <button className={styles.buttonAllSales}>All sales</button>
        </Link>
      </div>

      <div className={styles.saleBlocksDiv}></div>
    </div>
  );
}

export default Home;
