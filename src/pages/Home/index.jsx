import NavButton from "../../components/NavButton";
import Title from "../../components/Title/index";
import ProductCard from "../../components/ProductCard";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { green, black, white } from "../../utils/index";
import handsRegistr from "../../assets/images/handsRegistr.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../../store/slices/categorySlice";

import { Link as LinkScroll, animateScroll as scroll } from "react-scroll";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);
  const categoriesList = useSelector(
    (store) => store.categories.categoriesFromServer
  );

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
      fetch("http://localhost:3333/sale/send", {
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

  const statusOfCategories = useSelector((store) => store.categories.status);
  const statusOfProducts = useSelector((store) => store.categories.status);
  const onlyDiscountedProducts = useSelector(
    (store) => store.products.onlyDiscountedProducts
  );

  return (
    <div className={styles.home}>
      <div className={styles.amazingDiscountsDiv}>
        <h1 className={styles.h1}>
          Amazing Discounts
          <br /> on Garden Products!
        </h1>
        <LinkScroll
          activeClass="active"
          to="prodForSale"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        >
          <button
            className={styles.checkOutBtn}
            onMouseEnter={() => changeColorOfBtnBlackAndGreen(black)}
            onMouseLeave={() => changeColorOfBtnBlackAndGreen(green)}
            style={{ backgroundColor: btnColorGreen }}
          >
            Check out
          </button>
        </LinkScroll>
      </div>

      <div className={styles.categories}>
        <div className={styles.categoriesTitle}>
          <Title title={"Categories"} />

          <NavButton
            title={"All categories"}
            color={black}
            linkTo={"/categories"}
          />
        </div>
        {statusOfCategories === "fulfilled" && (
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className={styles.categoriesFiveBlocks}
          >
            {categoriesList &&
              categoriesList.map((el) => (
                <SwiperSlide
                  className={styles.swiperSlideCategories}
                  key={el.id}
                >
                  <Link className={styles.link} to={`/categories/${el.id}`}>
                    <div className={styles.categoriesBlockDiv}>
                      <img
                        className={styles.categoriesBlocksImg}
                        src={"http://localhost:3333" + el.image}
                        alt={el.title}
                      />
                      <p className={styles.categoriesBlocksP}>{el.title}</p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
        {statusOfCategories === "pending" && <Loading />}
        {statusOfCategories === "rejected" && <Error />}
      </div>

      <div className={styles.discount}>
        <p className={styles.discountText}>5% off on the first order</p>
        <div className={styles.photoAndInputs}>
          <img src={handsRegistr} alt="Hands" />
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
        <Title title={"Sale"} />
        <NavButton title={"All sales"} linkTo={"/allsales"} />
      </div>

      {statusOfProducts === "fulfilled" && (
        <Swiper
          name="prodForSale"
          navigation={true}
          modules={[Navigation]}
          className={styles.discountedProdFourSwiper}
        >
          {onlyDiscountedProducts.slice(0, 4).map((el) => (
            <SwiperSlide className={styles.saleProdSwiperSlide} key={el.id}>
              <ProductCard key={el.id} el={el} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {statusOfProducts === "pending" && <Loading />}
      {statusOfProducts === "rejected" && <Error />}
    </div>
  );
}

export default Home;
