import React from "react";
import userData from "../users.json";
import { SearchOutlined } from "@ant-design/icons";
import {
  Layout,
  ConfigProvider,
  Switch,
  theme,
  Button,
  Dropdown,
  Space,
  Input,
} from "antd";

import { TranslationOutlined, DownOutlined } from "@ant-design/icons";
import { useLoggedInContext } from "../contexts/LoggedInContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useSearchText } from "../contexts/SearchTextContext";
export const Header = () => {
  let typingTimer;
  const { setSearchText } = useSearchText();
  const { userName, setLoggedIn } = useLoggedInContext();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const handleLogOutFunc = () => {
    setLoggedIn(false);
    sessionStorage.setItem("loggedIn", "false");
  };
  const items = [
    {
      key: "1",
      label: <a onClick={handleLogOutFunc}>{t("logOut")}</a>,
      icon: <MdLogout />,
      danger: true,
    },
  ];
  const handleSearchChange = (e) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      setSearchText(e.target.value.toLowerCase());
    }, 550);
  };
  return (
    <ConfigProvider
      theme={{
        algorithm: [theme.defaultAlgorithm],
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
        <Input
          onChange={(e) => handleSearchChange(e)}
          prefix={<SearchOutlined />}
          className="search-bar"
          type="text"
          name=""
          id=""
        />
        <div className="right-content">
          <Dropdown
            className="user-dropdown"
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {userName}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <Button
            type="linked"
            className="translation-button"
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
                className="flag-image"
                src="https://www.countryflags.com/wp-content/uploads/turkey-flag-png-large.png"
                alt="English Flag"
              />
            ) : (
              <img
                className="flag-image"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png"
                alt="Turkish Flag"
              />
            )}
          </Button>
        </div>
      </Layout.Header>
    </ConfigProvider>
  );
};
