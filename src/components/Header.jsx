import React from "react";

import { Layout, ConfigProvider, Switch, theme, Button } from "antd";
import { TranslationOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
export const Header = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
      }}
    >
      <Layout.Header className="main-header">
        <div className="header-logo-img">
          <img
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
            src="./productflow.png"
            alt="Logo"
          ></img>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            style={{
              backgroundColor: "gray",
              width: "60px",
              height: "40px",
              marginRight: "10px",
              padding: "0",
            }}
            onClick={() => {
              if (i18n.language === "en") {
                i18n.changeLanguage("tr");
              } else {
                i18n.changeLanguage("en");
              }
            }}
          >
            {i18n.language === "tr" ? (
              <img
                src="https://www.countryflags.com/wp-content/uploads/turkey-flag-png-large.png"
                alt="English Flag"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png"
                alt="Turkish Flag"
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </Button>
        </div>
      </Layout.Header>
    </ConfigProvider>
  );
};
