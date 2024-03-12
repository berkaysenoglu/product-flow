import React, { useEffect } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Card, Row, Col } from "antd";
import { useLoggedInContext } from "../contexts/LoggedInContext";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

const ProductCard = ({ filteredProducts }) => {
  const navigate = useNavigate();
  useEffect(() => {});
  const { isAdmin } = useLoggedInContext();
  const handleEditProduct = (x) => {
    navigate(`/${x}`);
  };
  return (
    <Row gutter={[45, 45]}>
      {filteredProducts.map((product) => (
        <Col key={product.id} xs={24} sm={12} md={8} lg={7} xl={6}>
          <Card
            hoverable
            className="product-card"
            cover={<img alt={product.name} src={product.img} />}
            onClick={() => handleEditProduct(product.id)}
          >
            <Meta title={product.name} />
            <div className="product-price">{product.price} $</div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductCard;
