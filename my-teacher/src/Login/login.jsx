import "./login.css";
import { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined ,CodeOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login(props) {
    const naviagte =  new useNavigate()
  const [codeImageUrl, setCodeImageUrl] = useState("");
  useEffect(() => {
    // 验证码
    Code();
  },[]);
  // 验证码
  function Code() {
    axios
      .get("https://www.zzgoodqc.cn/index.php/index/index/getcode")
      .then((res) => {
        console.log(res.data.msg);
        setCodeImageUrl(res.data.msg);
      });
  }
   function tiggCode() {
     Code();
   }
//    账户和密码
  const onFinish = (values) => {
    console.log(values);
        axios.post("https://www.zzgoodqc.cn/index.php/index/index/login",values).then(()=>{
          naviagte("/home/table")
        });
  };
  const styles = {
    width: "300px",
  };
 
  return (
    <div className="box">
      <div className="header">
        <div className="header_left"></div>
        <div className="header_right">
          <h1>登录</h1>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "请输入用户名!",
                },
              ]}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
                style={styles}
              />
            </Form.Item>
            <Form.Item
              name="pwd"
              rules={[
                {
                  required: true,
                  message: "请输入密码!",
                },
              ]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
                style={styles}
              />
            </Form.Item>
            <Form.Item
              name="vercode"
              rules={[
                {
                  required: true,
                  message: "请输入验证码!",
                },
              ]}>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Input
                  prefix={<CodeOutlined className="site-form-item-icon" />}
                  placeholder="验证码"
                  style={{ width: "150px", height: "50px" }}
                />
                {codeImageUrl && (
                  <h1 onClick={tiggCode} className="Codename">
                    {codeImageUrl}
                  </h1>
                )}
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button">
                登录
              </Button>
              Or <a href="">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default Login;
