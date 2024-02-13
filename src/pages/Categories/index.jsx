import NavButtons from "../../components/NavButtons/index";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
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

  const statusOfCategories = useSelector((store) => store.categories.status);
  return (
    <div className={styles.categoriesPage}>
      <NavButtons title={"Categories"} linkTo={"/categories"} color={black} />

      <div className={styles.categoriesPageTitle}>
        <h2 className={styles.pageCatH2}>Categories</h2>
      </div>
      {statusOfCategories === "fulfilled" && (
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
              <SwiperSlide className={styles.swiperSlideCat} key={el.id}>
                <Link className={styles.catLink} to={`/categories/${el.id}`}>
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
      )}
      {statusOfCategories === "pending" && <Loading />}
      {statusOfCategories === "rejected" && <Error />}
    </div>
  );
}

export default Categories;
