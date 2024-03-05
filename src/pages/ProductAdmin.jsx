import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import ProductCard from "../components/ProductCard";
import { useParams, useNavigate } from "react-router-dom";
import ProductsData from "../products.json"; // veri tabanım
import { InboxOutlined } from "@ant-design/icons";
import { Form, Upload, Button, Input, Select, Space } from "antd";
import { Card } from "antd";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../ProductReducer";
import { useLoggedInContext } from "../contexts/LoggedInContext";
const { Meta } = Card;
const { Option } = Select;

const ProductAdmin = () => {
  const navigate = useNavigate();
  const { loggedIn, isAdmin } = useLoggedInContext();
  useEffect(() => {
    if (loggedIn == false) {
      navigate("/login");
    }
  }, [loggedIn]);
  useEffect(() => {
    if (isAdmin == false) {
      navigate("/");
    }
  }, [isAdmin]);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { t, i18n } = useTranslation();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const [form] = Form.useForm();

  const handleUpdate = (values) => {
    dispatch(
      updateProduct({
        id: productId,
        name: values.name,
        price: values.price,
        category: values.category,
      })
    );
    console.log(products);
  };
  const onReset = () => {
    form.resetFields();
  };
  const { productId } = useParams();

  const selectedProduct = products.find(
    (product) => product.id === parseInt(productId)
  );

  const { name, price, category, img } = selectedProduct;

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      <Header />
      <div className="admin-content-wrapper">
        <div className="product-wrapper">
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={<img alt="" src={img} />}
          >
            <Meta title={name} />
            <div
              style={{
                fontFamily: "sans-serif",
                fontSize: "18px",
                paddingTop: "15px",
              }}
            >
              {price}
            </div>
          </Card>
        </div>
        <div className="form-upload">
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={handleUpdate}
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              name="name"
              label={t("Ürün Adı:")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label={t("Ürün Fiyatı:")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="category"
              label={t("Kategori")}
              rules={[{ required: true }]}
            >
              <Select
                placeholder={t(
                  "Seçeneklerden birisini seç ve kategori girdisini değiştir"
                )}
                allowClear
              >
                <Option value="Elektronik">{t("Elektronik")}</Option>
                <Option value="Giyim">{t("Giyim")}</Option>
                <Option value="Mobilya">{t("Mobilya")}</Option>
                <Option value="Aksesuar">{t("Aksesuar")}</Option>
              </Select>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Space>
                <Button type="primary" htmlType="submit">
                  {t("Değişiklikleri Kaydet")}
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  {t("Sıfırla")}
                </Button>
              </Space>
            </Form.Item>
          </Form>
          <Form.Item style={{ marginLeft: "60px" }}>
            <Form.Item
              name="dragger"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              noStyle
            >
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  {t("Yeni fotoğrafı yüklemek için tıkla veya sürükle")}
                </p>
                <p className="ant-upload-hint">
                  {t("Tekli veya çoklu olarak yükleyebilirsin")}
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
        </div>
      </div>
    </>
  );
};

export default ProductAdmin;
