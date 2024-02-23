import React from "react";
import Layout from "antd/es/layout/layout";
const Footer = () => {
  return (
    <Layout.Footer
      style={{
        textAlign: "center",
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%",
      }}
    >
      Mahrek Tech. ©{new Date().getFullYear()} Created by BŞ
    </Layout.Footer>
  );
};
export default Footer;
