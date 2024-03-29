import React from "react";

import { SearchOutlined } from "@ant-design/icons";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  Layout,
  ConfigProvider,
  theme,
  Button,
  Dropdown,
  Space,
  Input,
} from "antd";

import { DownOutlined } from "@ant-design/icons";
import { useLoggedInContext } from "../contexts/LoggedInContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useSearchText } from "../contexts/SearchTextContext";
import { useSelector } from "react-redux";
export const Header = () => {
  let typingTimer;
  const cartItems = useSelector((state) => state.cart.items);

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
          <div onClick={() => navigate("/sepet")} className="cart-icon">
            <AiOutlineShoppingCart
              style={{
                height: "40px",
                width: "50px",
                color: "#ffffff",
              }}
            />
            {cartItems.length !== 0 && cartItems.length}
          </div>
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
