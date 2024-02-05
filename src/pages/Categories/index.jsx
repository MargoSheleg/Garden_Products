import NavButtons from "../../components/NavButtons/index";
import { Link } from "react-router-dom";
import { black } from "../../utils/index";
import styles from "./index.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllCategories } from "../../store/slices/categorySlice";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

function Categories() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  const categoriesList = useSelector(
    (store) => store.categories.categoriesFromServer
  );

  return (
    <div className={styles.categoriesPage}>
      <NavButtons title={"Categories"} linkTo={"/categories"} color={black} />

      <div className={styles.categoriesPageTitle}>
        <h2 className={styles.pageCatH2}>Categories</h2>
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className={styles.categoriesPageBlock}
      >
        {categoriesList &&
          categoriesList.map((el) => (
            <SwiperSlide className={styles.swiperSlideCat}>
              <Link
                className={styles.catLink}
                to={`/categories/${el.id}`}
                key={el.id}
              >
                <div className={styles.categoriesPageBlockDiv}>
                  <img
                    className={styles.categoriesPageBlockImg}
                    src={"http://localhost:3333" + el.image}
                    alt={el.title}
                  />
                  <p className={styles.categoriesPageBlocksP}>{el.title}</p>
                </div>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default Categories;
