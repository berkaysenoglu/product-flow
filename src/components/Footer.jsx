import React from "react";
import Layout from "antd/es/layout/layout";
const Footer = () => {
  return (
    <Layout.Footer className="main-footer">
      Mahrek Tech. ©{new Date().getFullYear()} Created by BŞ
    </Layout.Footer>
  );
};
export default Footer;
