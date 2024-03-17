import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
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
    if (loggedIn === false) {
      navigate("/login");
    }
  }, [loggedIn]);
  useEffect(() => {
    if (isAdmin === false) {
      navigate("/");
    }
  }, [isAdmin]);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { t } = useTranslation();
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
  };
  const onReset = () => {
    form.resetFields();
  };
  const { productId } = useParams();

  const selectedProduct = products.find(
    (product) => product.id === parseInt(productId)
  );

  const { name, price, img } = selectedProduct;

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
              {price} $
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
              label={t("product-name")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="price"
              label={t("product-price")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="category"
              label={t("category")}
              rules={[{ required: true }]}
            >
              <Select placeholder={t(t("select-category"))} allowClear>
                <Option value="Electronic">{t("Electronic")}</Option>
                <Option value="Clothes">{t("Clothes")}</Option>
                <Option value="Furniture">{t("Furniture")}</Option>
                <Option value="Accessory">{t("Accessory")}</Option>
              </Select>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Space>
                <Button type="primary" htmlType="submit">
                  {t("save-changes")}
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  {t("reset")}
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
