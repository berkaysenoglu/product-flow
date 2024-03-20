import React from "react";
import { Header } from "../components/Header";
import { useSelector } from "react-redux";
import { Card, InputNumber, Button, Input } from "antd";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  removeAllFromCart,
} from "../CartReducer";
export const ShoppingCart = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);
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
  return (
    <>
      <Header />
      <div className="cart-content">
        {isEmpty ? (
          <div className="cart-right-content">
            <h3>
              {" "}
              {t("cart-total")} : {totalPrice.toFixed(2)} $
            </h3>
            <h4>
              {t("total-quantity")} : {totalQuantity}
            </h4>
            <div className="button-wrapper">
              <Button danger type="primary">
                {t("clear-cart")}
              </Button>
              <Button type="primary">{t("complete-shopping")}</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="cart-wrapper">
              {items.map((item) => (
                <div className="cart-item-wrapper">
                  <img style={{ width: "400px" }} alt="" src={item.img}></img>
                  <div className="quantity-wrapper">
                    <a
                      aria-label="ürünü azalt"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <svg width={32} height={32}>
                        <path
                          d="M22 17H10c-.23 0-.667-.448-.667-1s.437-1 .667-1h12c.333 0 .666.448.666 1s-.436 1-.666 1z"
                          fill="#FF6000"
                        ></path>
                      </svg>
                    </a>
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
                    <a
                      aria-label="ürünü arttır"
                      onClick={() =>
                        dispatch(
                          addToCart({ ...item, quantity: item.quantity + 1 })
                        )
                      }
                    >
                      <svg width={32} height={32}>
                        <path
                          d="M8.618 16V16.018l.006.072v.01l.002.008a.736.736 0 00.728.628s0 0 0 0h5.91v5.91c0 .406.33.736.736.736H16.018l.072-.006h.01l.009-.002a.736.736 0 00.627-.728v-5.91h5.91c.406 0 .736-.33.736-.736V15.982l-.006-.072v-.01l-.002-.008a.736.736 0 00-.728-.628h-5.91v-5.91A.736.736 0 0016 8.618H15.982l-.072.006h-.01l-.008.002a.736.736 0 00-.628.728s0 0 0 0v5.91h-5.91s0 0 0 0a.736.736 0 00-.736.736z"
                          fill="#FF6000"
                          stroke="#FF6000"
                          stroke-width="0.5"
                        ></path>
                      </svg>
                    </a>
                  </div>
                  <h4>{item.name} </h4>
                  <p>{item.price} $</p>
                </div>
              ))}
            </div>
            <div className="cart-right-content">
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
                <Button type="primary">{t("complete-shopping")}</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
