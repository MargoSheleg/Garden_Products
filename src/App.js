import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import Footer from "./components/Footer/index";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import { useState, useEffect } from "react";
import AllProducts from "./pages/AllProducts";
import AllSales from "./pages/AllSales";
import OneProduct from "./pages/OneProduct";
import OneCategory from "./pages/OneCategory/index";
import ShoppingCart from "./pages/ShoppingCart";
import CartZero from "./pages/CartZero/index";

function App() {
  const [categoriesFromServer, setCategoriesFromServer] = useState([]);

  const [cart, setCart] = useState([
    {
      id: 1,
      title: "Savannah Summer Annual Collection",
      price: 53,
      discont_price: 50,
      description:
        "We love this fusion of colorful blossoms, created by combining some of the most floriferous and high performance annuals we know in our Savannah Summer Collection. Cherry-red Zinnia and sunrise-hued Lantana provide a perpetual fountain of flowers amidst the dark purple spiky foliage of Tradescantia.",
      image: "/product_img/1.jpeg",
      createdAt: "2022-10-02T14:43:29.000Z",
      updatedAt: "2022-10-02T14:43:29.000Z",
      categoryId: 1,
    },
    {
      id: 2,
      title: "Angelonia angustifolia Archangel™ White",
      price: 10.75,
      discont_price: null,
      description:
        "Angelonia angustifolia Archangel™ White displays pristine white blossoms arranged on tall stems that sparkle above clean, glossy, dark green foliage. These sturdy, well-branched plants add texture and commanding presence to borders, containers, and flower arrangements.",
      image: "/product_img/2.jpeg",
      createdAt: "2022-10-02T14:43:29.000Z",
      updatedAt: "2022-10-02T14:43:29.000Z",
      categoryId: 1,
    },
    {
      id: 3,
      title: "Angelonia angustifolia Archangel™ Blue Bicolor",
      price: 10.75,
      discont_price: null,
      description:
        "This Summer Snapdragon is part of the Archangel™ series that produces large flowers. Angelonia angustifolia Archangel™ Blue Bicolor is an outstanding performer, offering a long season of color in containers and garden beds. Plants are well-branched with bicolored blossoms of deep purple and soft lilac backed by glossy, dark green leaves.",
      image: "/product_img/3.jpeg",
      createdAt: "2022-10-02T14:43:29.000Z",
      updatedAt: "2022-10-02T14:43:29.000Z",
      categoryId: 1,
    },
    {
      id: 4,
      title: "Afternoon Tea Annual Collection",
      price: 65,
      discont_price: null,
      description:
        "Our lovely Afternoon Tea Annual Collection is sure to please with its blend of pinks and purples. Includes a pretty pink-and-white flowered Dahlia, dark-leaved Ipomoea, bright-eyed Angelonia, lavender Lobularia, deep blue Calibrachoa, and a wave of pink Petunia. 6 plants total, 1 each of the varieties listed below. Container not included.",
      image: "/product_img/4.jpeg",
      createdAt: "2022-10-02T14:43:29.000Z",
      updatedAt: "2022-10-02T14:43:29.000Z",
      categoryId: 1,
    },
    {
      id: 5,
      title: "Angelonia Angelissa™ Rose",
      price: 12.95,
      discont_price: 12.1,
      description:
        "A distinctive shade of rosy purple characterizes the blossoms of carefree, long-blooming Angelonia Angelissa™ Rose and ensures that this Summer Snapdragon’s upright flower spikes are an attraction in gardens and containers over a full season. The fragrant flowers, which are large by Angelonia standards, attract pollinators.",
      image: "/product_img/5.jpeg",
      createdAt: "2022-10-02T14:43:29.000Z",
      updatedAt: "2022-10-02T14:43:29.000Z",
      categoryId: 1,
    },
  ]);

  const [display, setDisplay] = useState("none");

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

  const [productsFromServer, setProductsFromServer] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/products/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProductsFromServer(data);
      })
      .catch((error) => {
        console.log("Fetch error", error);
      });
  }, []);

  const [fromVal, setFromVal] = useState("");
  const [toVal, setToVal] = useState("");
  const [isDiscounted, setIsDiscounted] = useState(false);

  const filteredProducts = productsFromServer.filter((el) => {
    if (fromVal && toVal) {
      return el.price >= fromVal && el.price <= toVal;
    } else if (fromVal) {
      return el.price >= fromVal;
    } else if (toVal) {
      return el.price <= toVal;
    } else {
      return productsFromServer;
    }
  });

  const onlyDiscountedProducts = filteredProducts.filter((el) => {
    return el.discont_price !== null;
  });

  return (
    <>
      <Header cart={cart} display={display} setDisplay={setDisplay} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              categoriesFromServer={categoriesFromServer}
              productsFromServer={productsFromServer}
              onlyDiscountedProducts={onlyDiscountedProducts}
            />
          }
        />

        <Route
          path="/categories"
          element={<Categories categoriesFromServer={categoriesFromServer} />}
        />

        <Route
          path="/allproducts"
          element={<AllProducts productsFromServer={productsFromServer} />}
        />

        <Route
          path="/allsales"
          element={<AllSales productsFromServer={productsFromServer} />}
        />

        <Route
          path="/cart"
          element={
            <ShoppingCart
              cart={cart}
              setCart={setCart}
              display={display}
              setDisplay={setDisplay}
            />
          }
        />

        <Route path="/cartZero" element={<CartZero />} />

        {categoriesFromServer.map((el) => (
          <Route
            path={`/categories/${el.id}`}
            element={
              <OneCategory
                productsFromServer={productsFromServer}
                productCategory={el.title}
                categoryId={el.id}
              />
            }
          />
        ))}

        {productsFromServer &&
          categoriesFromServer &&
          productsFromServer.map((el) => (
            <Route
              key={el.id}
              path={`/products/${el.id}`}
              element={
                <OneProduct
                  productCategory={
                    categoriesFromServer[el.categoryId - 1].title
                  }
                  title={el.title}
                  productId={el.id}
                  image={el.image}
                  discountPrice={el.discont_price}
                  price={el.price}
                  description={el.description}
                  categoryId={el.categoryId}
                />
              }
            />
          ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
