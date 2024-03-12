import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import ProductCard from "../components/ProductCard";
import { Header } from "../components/Header";
import productsData from "../products.json"; //veritabanım
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import { PoweroffOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useLoggedInContext } from "../contexts/LoggedInContext";
import { ConfigProvider } from "antd";
import { useSelector } from "react-redux";
import { FaLaptop, FaTshirt, FaChair, FaNecklace } from "react-icons/fa";
import { MdOutlineWatch } from "react-icons/md";

const { Content, Sider } = Layout;

const ProductLayout = () => {
  const { setLoggedIn } = useLoggedInContext();
  const { t } = useTranslation();

  const categories = [
    { key: "Electronic", icon: <FaLaptop /> },
    { key: "Clothes", icon: <FaTshirt /> },
    { key: "Furniture", icon: <FaChair /> },
    { key: "Accessory", icon: <MdOutlineWatch /> },
  ];
  const items = [
    {
      key: "categories",
      label: t("categories"),
      children: categories.map((category) => ({
        key: category.key,
        label: t(category.key),
        icon: category.icon,
      })),
      icon: <UnorderedListOutlined />,
    },
  ];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  console.log(selectedCategory);
  const handleCategorySelect = (item) => {
    setSelectedCategory(item.key);
  };
  const handleShowAllProducts = () => {
    setSelectedCategory(null);
  };
  const products = useSelector((state) => state.products);
  useEffect(() => {
    if (selectedCategory) {
      const newFilteredProducts = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(newFilteredProducts);
    } else {
      setFilteredProducts(products);
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
        <Header></Header>
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
            <div className="menu-wrapper">
              <Menu
                icon={<UnorderedListOutlined />}
                mode="inline"
                style={{
                  borderRight: 0,
                }}
                items={items}
                onSelect={({ key }) =>
                  handleCategorySelect(
                    categories.find((item) => item.key === key)
                  )
                }
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
          <Layout className="main-layout">
            <Breadcrumb className="main-breadcrumb">
              <Breadcrumb.Item>{t("Anasayfa")}</Breadcrumb.Item>
              <Breadcrumb.Item>{t("Ürünler")}</Breadcrumb.Item>
              {selectedCategory && (
                <Breadcrumb.Item>{t(selectedCategory)}</Breadcrumb.Item>
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
