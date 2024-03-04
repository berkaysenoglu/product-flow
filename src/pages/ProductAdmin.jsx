import React from "react";
import { Header } from "../components/Header";
import ProductCard from "../components/ProductCard";
import { useParams } from "react-router-dom";
import ProductsData from "../products.json"; // veri tabanım
import { InboxOutlined } from "@ant-design/icons";
import { Form, Upload, Button, Input, Select, Space } from "antd";
import { Card } from "antd";

const { Meta } = Card;
const { Option } = Select;

const ProductAdmin = () => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  const { productId } = useParams();

  const products = ProductsData.products;

  const selectedProduct = products.find(
    (product) => product.id === parseInt(productId)
  );
  console.log(selectedProduct);
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
            cover={<img alt="" src={selectedProduct.img} />}
          >
            <Meta title={selectedProduct.name} />
            <div
              style={{
                fontFamily: "sans-serif",
                fontSize: "18px",
                paddingTop: "15px",
              }}
            >
              {selectedProduct.price}
            </div>
          </Card>
        </div>
        <div className="form-upload">
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              name="ürünadı"
              label="Ürün Adı:"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="fiyat"
              label="Ürün fiyatı"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="kategori"
              label="Kategori"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select a option and change input text above"
                allowClear
              >
                <Option value="Elektronik">Elektronik</Option>
                <Option value="Giyim">Giyim</Option>
                <Option value="Mobilya">Mobilya</Option>
                <Option value="Aksesuar">Aksesuar</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.category !== currentValues.category
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("category") === "other" ? (
                  <Form.Item
                    name="categoryEkle"
                    label="Yeni Kategori"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Değişiklikleri Kaydet
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Sıfırla
                </Button>
              </Space>
            </Form.Item>
          </Form>
          <Form.Item label="Fotoğrafı değiştir">
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
                  Yeni fotoğrafı yüklemek için tıkla veya sürükle
                </p>
                <p className="ant-upload-hint">
                  Tekli veya çoklu olarak yükleyebilirsin
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
