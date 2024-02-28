import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import ProductCard from "../components/ProductCard";
import { Header } from "../components/Header";
import productsData from "../products.json";
import Footer from "../components/Footer";
const { Content, Sider } = Layout;
const categories = ["Elektronik", "Giyim", "Mobilya", "Aksesuar"];
const items = [
  {
    key: "categories",
    label: "Kategoriler",
    children: categories.map((category, index) => ({
      key: `${index}`,
      label: category,
    })),
  },
];
const ProductLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleCategorySelect = (key) => {
    setSelectedCategory(categories[key]);
  };
  const handleShowAllProducts = () => {
    setSelectedCategory(null);
  };
  const filteredProducts = selectedCategory
    ? productsData.products.filter(
        (product) => product.category == selectedCategory
      )
    : productsData.products;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      ></Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Button
            style={{ margin: "20px", marginTop: "9px", marginBottom: "13px" }}
            onClick={handleShowAllProducts}
          >
            Tüm ürünleri göster
          </Button>

          <Menu
            mode="inline"
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items}
            onSelect={({ key }) => handleCategorySelect(key)}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Products</Breadcrumb.Item>
            {selectedCategory && (
              <Breadcrumb.Item>{selectedCategory}</Breadcrumb.Item>
            )}
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <ProductCard filteredProducts={filteredProducts}></ProductCard>
          </Content>
        </Layout>
      </Layout>
      <Footer></Footer>
    </Layout>
  );
};
export default ProductLayout;
