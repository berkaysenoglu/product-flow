import React from "react";
import { Layout, theme, Switch } from "antd";

const { Header, Content, Footer } = Layout;
const items = new Array(3).fill(null).map((_, index) => ({
  key: String(index + 1),
  label: `nav ${index + 1}`,
}));
const ProductLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 0px",
        }}
      >
        <div className="header-img">
          <img src="./productflow.png" alt="Logo"></img>
        </div>
        <Switch style={{ marginLeft: "875px" }}></Switch>
      </Header>
      <Content
        style={{
          padding: "0 48px",
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Mahrek Tech. ©{new Date().getFullYear()} Created by BŞ
      </Footer>
    </Layout>
  );
};
export default ProductLayout;
