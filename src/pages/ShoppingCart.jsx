import React from "react";
import { Header } from "../components/Header";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import {
  Card,
  InputNumber,
  Button,
  Input,
  notification,
  message,
  Tooltip,
} from "antd";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

import {
  addToCart,
  removeFromCart,
  updateQuantity,
  removeAllFromCart,
} from "../CartReducer";
import { useLoggedInContext } from "../contexts/LoggedInContext";
import Sider from "antd/es/layout/Sider";
export const ShoppingCart = () => {
  const [messageApi, messageContextHolder] = message.useMessage();
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Bakiye yetersiz!",
    });
  };
  const [api, contextHolder] = notification.useNotification();
  const openSuccessfullNotification = () => {
    api.open({
      message: "Alışveriş tamamlandı!",
      description: "Ürünler başarılı bir şekilde sipariş edildi",
      duration: 2,
    });
  };
  const { loggedIn, balance, setBalance } = useLoggedInContext();
  const [isBalanceEnough, setIsBalanceEnough] = useState();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    if (balance >= totalPrice) {
      setIsBalanceEnough(true);
    } else {
      setIsBalanceEnough(false);
    }
  }, [totalPrice]);

  useEffect(() => {
    if (items.length === 0) {
      setIsEmpty(true);
    }
  }, [totalQuantity]);

  useEffect(() => {
    const newTotalQuantity = items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    setTotalQuantity(newTotalQuantity);
  }, [items]);

  const handleCompleteShopping = () => {
    if (isBalanceEnough) {
      const newBalance = balance - totalPrice;

      setBalance(newBalance);
      openSuccessfullNotification();
      dispatch(removeAllFromCart());
    } else {
      error();
    }
  };

  return (
    <>
      <Header />
      {contextHolder}
      {messageContextHolder}
      <div className="cart-content">
        <>
          <div className="cart-wrapper">
            {isEmpty && (
              <h1 style={{ marginTop: "90px" }}>{t("no-item-in-cart")}</h1>
            )}
            {items.map((item) => (
              <div className="cart-item-wrapper">
                <img style={{ width: "400px" }} alt="" src={item.img}></img>
                <div className="quantity-wrapper">
                  <Button
                    type="text"
                    onClick={() => dispatch(removeFromCart(item.id))}
                    icon={
                      item.quantity === 1 ? (
                        <MdDelete fontSize="15px" color="#ff6000" />
                      ) : (
                        <FaMinus color="#ff6000" />
                      )
                    }
                  ></Button>
                  <Input
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      if (!isNaN(newValue) && newValue <= item.stock) {
                        dispatch(
                          updateQuantity({ id: item.id, quantity: newValue })
                        );
                      } else {
                        e.target.value = item.stock;
                      }
                    }}
                    value={item.quantity}
                    max={item.stock}
                    className="input-quantity"
                  ></Input>
                  <Tooltip
                    title={
                      item.stock === item.quantity && t("stock-insufficient")
                    }
                  >
                    <Button
                      icon={
                        item.quantity === item.stock ? (
                          <FaPlus color="#9a9c9c" />
                        ) : (
                          <FaPlus color="#ff6000" />
                        )
                      }
                      type="text"
                      disabled={item.quantity === item.stock}
                      onClick={() =>
                        dispatch(
                          addToCart({ ...item, quantity: item.quantity + 1 })
                        )
                      }
                    ></Button>
                  </Tooltip>
                </div>
                <h4>{item.name} </h4>
                <p>{item.price} $</p>
              </div>
            ))}
          </div>
          <div className="cart-right-content">
            <h2 style={{ color: "#ff6000" }}>
              {t("your-balance")}: {balance.toFixed(2)} $
            </h2>
            <h3>
              {" "}
              {t("cart-total")} : {totalPrice.toFixed(2)} $
            </h3>
            <h4>
              {t("total-quantity")} : {totalQuantity}
            </h4>
            <div className="button-wrapper">
              <Button
                danger
                type="primary"
                onClick={() => dispatch(removeAllFromCart())}
              >
                {t("clear-cart")}
              </Button>
              <Button onClick={handleCompleteShopping} type="primary">
                {t("complete-shopping")}
              </Button>
            </div>
          </div>
        </>
      </div>
    </>
  );
};
