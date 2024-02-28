import React, { useEffect } from "react";
import productsData from "../products.json";
import { EditOutlined } from "@ant-design/icons";
import { Card, Row, Col } from "antd";
import { useLoggedInContext } from "../contexts/LoggedInContext";
const { Meta } = Card;
const ProductCard = ({ filteredProducts }) => {
  useEffect(() => {});
  const { isAdmin } = useLoggedInContext();
  return (
    <Row gutter={[45, 45]}>
      {filteredProducts.map((product) => (
        <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={6}>
          <Card
            style={{
              boxShadow: "2px 2px 5px 0px rgba(0, 64, 128, 0.1)",
              width: "100%",
              height: "100%",
            }}
            cover={<img alt={product.name} src={product.img} />}
            actions={isAdmin ? [<EditOutlined key="edit" />] : null}
          >
            <Meta title={product.name} />
            <div
              style={{
                fontFamily: "sans-serif",
                fontSize: "18px",
                paddingTop: "15px",
              }}
            >
              {product.price}
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductCard;
