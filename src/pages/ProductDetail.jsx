import React, { useState } from "react";
import { Header } from "../components/Header";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useLoggedInContext } from "../contexts/LoggedInContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button, Input, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { updateProduct } from "../ProductReducer";
import { addToCart } from "../CartReducer";
export const ProductDetail = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Ürün sepete eklendi!",
      duration: 3,
    });
  };
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const products = useSelector((state) => state.products);
  const { loggedIn, isAdmin } = useLoggedInContext();
  const [editedProduct, setEditedProduct] = useState({});
  const handleNameOnBlur = () => {
    dispatch(updateProduct(editedProduct));
  };
  const handleDescriptionOnBlur = () => {
    dispatch(updateProduct(editedProduct));
  };
  const handlePriceOnBlur = () => {
    dispatch(updateProduct(editedProduct));
  };

  useEffect(() => {
    if (loggedIn == false) {
      navigate("/login");
    }
  }, [loggedIn]);
  useEffect(() => {
    const selectedProduct = products.find(
      (product) => product.id === parseInt(productId)
    );
    setEditedProduct({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      description: selectedProduct.description,
      img: selectedProduct.img,
    });
  }, [products, productId]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };
  const handleNameInputChange = (e) => {
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      name: e.target.value,
    }));
  };
  const handleDescriptionInputChange = (e) => {
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      description: e.target.value,
    }));
  };
  const handlePriceInputChange = (e) => {
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      price: parseFloat(e.target.value),
    }));
  };
  const exitEditButtonHandler = () => {
    setIsEditMode(false);
  };
  const handleAddToCart = (editedProduct) => {
    dispatch(addToCart(editedProduct));
    success();
  };
  return (
    <>
      {contextHolder}
      <Header></Header>
      <div className="product-wrapper">
        <div className="img-wrapper">
          <img alt="" src={editedProduct.img}></img>
        </div>
        {isEditMode ? (
          <div className="product-edit">
            <label>{t("product-name")}</label>
            <Input
              className="input-name"
              type="text"
              name="name"
              value={editedProduct.name}
              onChange={handleNameInputChange}
              onBlur={handleNameOnBlur}
            />
            <label>{t("product-description")}</label>
            <textarea
              className="input-description"
              name="description"
              value={editedProduct.description}
              onChange={handleDescriptionInputChange}
              onBlur={handleDescriptionOnBlur}
            />
            <label>{t("product-price")}</label>
            <Input
              className="input-price"
              type="number"
              name="price"
              value={editedProduct.price}
              onBlur={handlePriceOnBlur}
              onChange={handlePriceInputChange}
            />
            <Button className="exit-button" onClick={exitEditButtonHandler}>
              {t("exit-edit")}
            </Button>
          </div>
        ) : (
          <div className="product-info">
            <h3 className="product-price">
              {editedProduct.name}{" "}
              {isAdmin && (
                <Button
                  onClick={handleEditClick}
                  className="admin-edit-button"
                  icon=<EditOutlined />
                >
                  {t("edit")}
                </Button>
              )}
            </h3>
            <p>{editedProduct.description}</p>
            <p className="product-price">{editedProduct.price} $</p>
            <Button
              onClick={() => handleAddToCart(editedProduct)}
              style={{ marginLeft: "331px" }}
            >
              {t("add-to-cart")}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
