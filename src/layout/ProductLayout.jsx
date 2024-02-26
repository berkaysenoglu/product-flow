import React from "react";
import { Layout, theme } from "antd";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
const { Content } = Layout;

const ProductLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header />
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <div
          style={{
            padding: 50,
            minHeight: 250,

            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <ProductCard></ProductCard>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
};
export default ProductLayout;
