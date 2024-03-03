import React, { useEffect, useState } from "react";
import { Button, Flex, Dropdown, Space } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import ProductCard from "../components/ProductCard";
import { Header } from "../components/Header";
import productsData from "../products.json";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import { PoweroffOutlined } from "@ant-design/icons";
import { useLoggedInContext } from "../contexts/LoggedInContext";
import { TranslationOutlined, DownOutlined } from "@ant-design/icons";
const { Content, Sider } = Layout;

const ProductLayout = () => {
  const { loggedIn, setLoggedIn } = useLoggedInContext();
  const { t, i18n } = useTranslation();

  const categories = [t("Elektronik"), t("Giyim"), t("Mobilya"), t("Aksesuar")];
  const items = [
    {
      key: "categories",
      label: t("Kategoriler"),
      children: categories.map((category, index) => ({
        key: `${index}`,
        label: category,
      })),
    },
  ];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const handleCategorySelect = (key) => {
    setSelectedCategory(categories[key]);
  };
  const handleShowAllProducts = () => {
    setSelectedCategory(null);
  };
  useEffect(() => {
    if (selectedCategory) {
      const newFilteredProducts = productsData.products.filter(
        (product) => product.category[i18n.language] === selectedCategory
      );
      setFilteredProducts(newFilteredProducts);
    } else {
      setFilteredProducts(productsData.products);
    }
  }, [selectedCategory]);

  // const filteredProducts = selectedCategory
  //   ? productsData.products.filter(
  //       (product) => product.category[i18n.language] == selectedCategory
  //     )
  //   : productsData.products;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleLogOutFunc = () => {
    setLoggedIn(false);
    sessionStorage.setItem("loggedIn", "false");
  };
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
            {t("Tüm ürünleri göster")}
          </Button>

          <Menu
            mode="inline"
            style={{
              borderRight: 0,
            }}
            items={items}
            onSelect={({ key }) => handleCategorySelect(key)}
          />

          <Button
            type="primary"
            style={{
              margin: "60px",
              marginTop: "165%",
              width: "60%",
              marginBottom: "74px",
            }}
            danger
            icon={<PoweroffOutlined />}
            onClick={handleLogOutFunc}
          >
            Log out
          </Button>
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
            <Breadcrumb.Item>{t("Anasayfa")}</Breadcrumb.Item>
            <Breadcrumb.Item>{t("Ürünler")}</Breadcrumb.Item>
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
