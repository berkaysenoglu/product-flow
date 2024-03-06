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
import { ConfigProvider } from "antd";
const { Content, Sider } = Layout;

const ProductLayout = () => {
  const { setLoggedIn } = useLoggedInContext();
  const { t } = useTranslation();

  const categories = [
    t("electronic"),
    t("clothes"),
    t("furniture"),
    t("accessory"),
  ];
  const items = [
    {
      key: "categories",
      label: t("categories"),
      children: categories.map((category) => ({
        key: `${category}`,
        label: category,
      })),
    },
  ];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const handleCategorySelect = (key) => {
    setSelectedCategory(key);
  };
  const handleShowAllProducts = () => {
    setSelectedCategory(null);
  };
  useEffect(() => {
    if (selectedCategory) {
      const newFilteredProducts = productsData.products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(newFilteredProducts);
    } else {
      setFilteredProducts(productsData.products);
    }
  }, [selectedCategory]);

  // const filteredProducts = selectedCategory
  //   ? productsData.products.filter(
  //       (product) => product.category == selectedCategory
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
    <ConfigProvider theme={{ algorithm: [theme.defaultAlgorithm] }}>
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
              className="show-allitem-button"
              onClick={handleShowAllProducts}
            >
              {t("show-all")}
            </Button>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
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
                  marginTop: "75rem",
                  width: "60%",
                  position: "absolute",
                }}
                danger
                icon={<PoweroffOutlined />}
                onClick={handleLogOutFunc}
              >
                {t("Çıkış yap")}
              </Button>
            </div>
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
    </ConfigProvider>
  );
};
export default ProductLayout;
