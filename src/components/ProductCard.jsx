import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../CartReducer";
const { Meta } = Card;

const ProductCard = ({ filteredProducts }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  useEffect(() => {});
  const handleEditProduct = (x) => {
    navigate(`/${x}`);
  };
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <Row gutter={[45, 45]}>
      {filteredProducts.map((product, index) => (
        <Col key={product.id} xs={24} sm={12} md={8} lg={7} xl={6}>
          <Card
            hoverable
            className="product-card"
            cover={<img alt={product.name} src={product.img} />}
            onClick={() => handleEditProduct(product.id)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Meta title={product.name} />
            <div className="product-price">{product.price} $</div>
            {hoveredIndex === index && (
              <Button
                className="add-to-cart-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
              >
                <ShoppingCartOutlined /> {t("add-to-cart")}
              </Button>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductCard;
