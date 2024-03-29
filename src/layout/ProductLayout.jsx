import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import ProductCard from "../components/ProductCard";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import { UnorderedListOutlined } from "@ant-design/icons";
import { useLoggedInContext } from "../contexts/LoggedInContext";
import { ConfigProvider } from "antd";
import { useSelector } from "react-redux";
import { FaLaptop, FaTshirt, FaChair } from "react-icons/fa";
import { MdOutlineWatch } from "react-icons/md";
import { useSearchText } from "../contexts/SearchTextContext";

const { Content, Sider } = Layout;

const ProductLayout = () => {
  const { t } = useTranslation();
  const { searchText } = useSearchText();
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

  const handleCategorySelect = (item) => {
    setSelectedCategory(item.key);
  };
  const handleShowAllProducts = () => {
    setSelectedCategory(null);
  };
  const products = useSelector((state) => state.products);
  useEffect(() => {
    if (selectedCategory && searchText) {
      const filtered = products.filter(
        (product) =>
          product.category === selectedCategory &&
          product.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else if (searchText) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else if (selectedCategory) {
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, searchText, products]);

  // const filteredProducts = selectedCategory
  //   ? productsData.products.filter(
  //       (product) => product.category == selectedCategory
  //     )
  //   : productsData.products;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
                selectedKeys={[selectedCategory]}
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
