import React from "react";

import { Layout, ConfigProvider, Switch, theme, Button } from "antd";
import { TranslationOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t, i18n } = useTranslation();

  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
      }}
    >
      <Layout.Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          height: "100px",
          justifyContent: "space-between",
          padding: "0 0px",
        }}
      >
        <div className="header-img">
          <img src="./productflow.png" alt="Logo"></img>
        </div>
        <Button
          style={{
            backgroundColor: "gray",
            width: "70px",
            height: "40px",
            marginLeft: "1280px",
          }}
          onClick={() => {
            if (i18n.language === "en") {
              i18n.changeLanguage("tr");
            } else {
              i18n.changeLanguage("en");
            }
          }}
          icon={<TranslationOutlined style={{ fontSize: "30px" }} />}
        >
          {i18n.language}
        </Button>
        <Switch></Switch>
      </Layout.Header>
    </ConfigProvider>
  );
};
