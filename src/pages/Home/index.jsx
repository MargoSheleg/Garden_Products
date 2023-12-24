import styles from "./index.module.css";
import { animateScroll } from "react-scroll";
import { green, black, white } from "../../utils/index";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as handsImage } from "../../assets/images/hands.svg";

function Home() {
  const scrollToAnchor = () => {
    animateScroll.scrollTo("anchor", {
      smooth: true,
      duration: 500,
    });
  };

  const [btnColorGreen, changeBtnColorGB] = useState(green);

  const [btnColorWhite, changeBtnColorWB] = useState(white);
  const [btnTextColor, changeBtnTextColor] = useState(black);

  function changeColorOfBtnBlackAndGreen(color) {
    changeBtnColorGB(color);
  }
  function changeColorOfBtnBlackAndWhite(bgColor, color) {
    changeBtnColorWB(bgColor);
    changeBtnTextColor(color);
  }

  const [categoriesFromServer, setCategoriesFromServer] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/categories/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCategoriesFromServer(data);
      })
      .catch((error) => {
        console.log("Fetch error", error);
      });
  }, []);

  const [nameTitle, setNameTitle] = useState("");
  const [phoneTitle, setPhoneTitle] = useState("");
  const [emailTitle, setEmailTitle] = useState("");

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
          onClick={scrollToAnchor}
          style={{ backgroundColor: btnColorGreen }}
        >
          Check out
        </button>
      </div>

      <div id="anchor" className={styles.categories}>
        <div className={styles.categoriesTitle}>
          <h2 className={styles.h2}>Categories</h2>
          <Link to="/categories">
            <button className={styles.buttonAllCategories}>
              All categories
            </button>
          </Link>
        </div>
        <div className={styles.categoriesFourBlocks}>
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
                  <p
                    className={styles.categoriesBlocksP}
                    to={`/categories/${el.id}`}
                  >
                    {el.title}
                  </p>
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
            <button
              style={{ backgroundColor: btnColorWhite, color: btnTextColor }}
              className={styles.btnGetDiscount}
              onMouseEnter={() => changeColorOfBtnBlackAndWhite(black, white)}
              onMouseLeave={() => changeColorOfBtnBlackAndWhite(white, black)}
            >
              Get a discount
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
