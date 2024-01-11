import { useState, useEffect } from "react";
import {
  Button,
  Table,
  Modal,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Radio,
  Pagination,
  Divider,
} from "antd";
import {
  AudioOutlined,
  DeleteOutlined,
  SearchOutlined,
  ExclamationCircleFilled,
  FormOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "./Teacher.css";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(updateLocale);
dayjs.updateLocale("zh-cn", {
  weekStart: 0,
});
function TeacherView() {
  const { Search } = Input;
  const { confirm } = Modal;
  const [open, setOpen] = useState(false);
  const [hide, setShow] = useState(false);
  const [onhide, setHide] = useState(false);
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1677ff",
      }}
    />
  );

  const [form] = Form.useForm();
  //  添加
  const onFinish = (values) => {
    console.log(values.birthdata);
    const Formdate = {
      ...values,
      birthdata: formatDate(values.birthdata),
    };
    console.log(Formdate);
    axios
      .post("https://www.zzgoodqc.cn/index.php/index/index/addteacher", Formdate)
      .then(() => {
        form.resetFields();
        reading();
      });
  };
  const onClose = () => {
    setOpen(false);
    setShow(false);
    setHide(false);
  };
  const formatDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  // 时间
  const [selectedDate, formattedDate] = useState(null);
  const onChange = (date, dateString) => {
    formattedDate(formatDate(date));
    console.log();
  };
  const [teachData, setData] = useState([]);
  //   渲染页面
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const reading = () => {
    axios
      .get(
        `https://www.zzgoodqc.cn/index.php/index/teacher/teacherlist?page=${currentPage}&pagelimit=${pageSize}`
      )
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data.data);
        setTotal(res.data.data.pagecount);
      });
  };
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  useEffect(() => {
    reading();
  }, [currentPage, pageSize]);
  const Dellist = (id) => [
    axios
      .get("https://www.zzgoodqc.cn/index.php/index/teacher/delteacher?id=" + id)
      .then(() => [reading()]),
  ];
  // 删除
  const del = (id) => {
    confirm({
      title: "提示！",
      icon: <ExclamationCircleFilled />,
      content: "你确定要删除吗",
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        Dellist(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  //   搜索
  const onSearch = (value) => {
    axios
      .get("https://www.zzgoodqc.cn/index.php/index/teacher/getsearch", {
        params: {
          name: value,
        },
      })
      .then((res) => {
        const searchData = res.data.data.data;
        setData(searchData);
      });
  };
  //   添加
  const addlist = () => {
    setShow(true);
  };
  // 查看
  const [userlist, setuselist] = useState("");
  const probole = (id) => {
    setOpen(true);
    axios
      .get("https://www.zzgoodqc.cn/index.php/index/index/getteacherbyid?id=" + id)
      .then((res) => {
        setuselist(res.data.data);
      });
  };
 
  // 修改
   const [formData, setFormData] = useState({
    name:""
   });
  const revice = (data) => {
    setHide(true);
    form.setFieldsValue(data); 
  };
  const onecho = (values) => {
     const requestData = form.getFieldsValue();
    axios
      .post("https://www.zzgoodqc.cn/index.php/index/index/upteacher", requestData)
      .then((res) => {
        console.log(res.data);
        reading();
      });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "150px",
      align: "center",
    },
    {
      title: "名字",
      dataIndex: "name",
      key: "name",
      width: "150px",
      align: "center",
    },
    {
      title: "昵称",
      dataIndex: "nick",
      key: "nick",
      width: "150px",
      align: "center",
    },
    {
      title: "出生日期",
      dataIndex: "birthdata",
      key: "birthdata",
      width: "150px",
      align: "center",
    },
    {
      title: "性别",
      dataIndex: "sex",
      key: "sex",
      width: "150px",
      align: "center",
      render: (text) => <span>{text === 0 ? "男" : "女"}</span>,
    },
    {
      title: "手机号",
      dataIndex: "iphone",
      key: "iphone",
      width: "150px",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="circle"
            icon={<SearchOutlined />}
            onClick={() => probole(record.id)}
          />
          <Button
            shape="circle"
            icon={<FormOutlined />}
            style={{ backgroundColor: "#F37335", color: "#ffffff" }}
            onClick={() => revice(record)}
          />
          <Button
            type="primary"
            danger
            shape="circle"
            onClick={() => del(record.id)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
      width: "150px",
      align: "center",
    },
  ];
  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">{title}:</p>
      {content}
    </div>
  );

  return (
    <div className="teach_header">
      <div className="teach_header_top">
        <Search
          placeholder="input search text"
          enterButton="搜索"
          size="large"
          suffix={suffix}
          onSearch={onSearch}
          style={{ width: "300px" }}
        />
        <Button
          type="primary"
          style={{ marginLeft: "15px" }}
          onClick={addlist}
          icon={<PlusOutlined />}>
          添加列表
        </Button>
      </div>
      <div className="teach_center">
        <Table
          columns={columns}
          dataSource={
            teachData
              ? teachData.map((item) => ({ ...item, key: item.id }))
              : []
          }
          bordered
          pagination={false}
        />
        <Pagination
          total={total}
          defaultCurrent={currentPage}
          defaultPageSize={pageSize}
          showSizeChanger
          showQuickJumper
          onChange={handlePageChange}
        />
      </div>
      <div className="add_teach_list">
        {/* 添加 */}
        <Drawer
          title="Create a new account"
          width={720}
          onClose={onClose}
          open={hide}
          styles={{
            body: {
              paddingBottom: 80,
            },
          }}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
            </Space>
          }>
          <Form
            layout="vertical"
            onFinish={onFinish}
            form={form}
            initialValues={formData}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="名字"
                  rules={[
                    {
                      required: true,
                      message: "请输入你的名字",
                    },
                  ]}>
                  <Input placeholder="请输入你的名字" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="nick"
                  label="昵称"
                  rules={[
                    {
                      required: true,
                      message: "请输入你的昵称",
                    },
                  ]}>
                  <Input placeholder="请输入您的昵称" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="birthdata"
                  label="出生日期"
                  rules={[
                    {
                      required: true,
                      message: "请选择您的出生日期",
                    },
                  ]}>
                  <DatePicker onChange={onChange} value={selectedDate} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="sex"
                  label="sex"
                  rules={[
                    {
                      required: true,
                      message: "请选择性别",
                    },
                  ]}>
                  <Radio.Group name="radiogroup" defaultValue={1}>
                    <Radio value={0}>男</Radio>
                    <Radio value={1}>女</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="iphone"
                  label="手机号"
                  rules={[
                    {
                      required: true,
                      message: "请输入你的手机号",
                    },
                  ]}>
                  <Input placeholder="请输入你的手机号" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}>
                  <Button type="primary" htmlType="submit">
                    提交
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </div>
      <div className="View_teach_list">
        <Drawer
          width={640}
          placement="right"
          closable={false}
          onClose={onClose}
          open={open}>
          <p className="site-description-item-profile-p">个人信息</p>
          <Row>
            <Col span={12}>
              <DescriptionItem title="名字" content={userlist.name} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="昵称" content={userlist.nick} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="出生日期" content={userlist.birthdata} />
            </Col>
            <Col span={12}>
              <DescriptionItem title="性别" content={userlist.sex} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <DescriptionItem title="手机号" content={userlist.iphone} />
            </Col>
          </Row>

          <Divider />
        </Drawer>
      </div>
      <div className="View_echo">
        {/* 修改 */}
        <Drawer
          title="Create a new account"
          width={720}
          onClose={onClose}
          open={onhide}
          styles={{
            body: {
              paddingBottom: 80,
            },
          }}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
            </Space>
          }>
          <Form onFinish={onecho} initialValues={formData} form={form}>
            <Form.Item name="id" style={{ display: "block" }}>
              <Input type="hidden" />
            </Form.Item>
            <Form.Item
              name="name"
              label="名字"
              rules={[
                {
                  required: true,
                  message: "请输入你的名字",
                },
              ]}>
              <Input
                placeholder="请输入你的名字"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item
              name="nick"
              label="昵称"
              rules={[
                {
                  required: true,
                  message: "请输入你的昵称",
                },
              ]}>
              <Input placeholder="请输入您的昵称" value={formData.nick} />
            </Form.Item>
            <Form.Item
              name="sex"
              label="sex"
              rules={[
                {
                  required: true,
                  message: "请选择性别",
                },
              ]}>
              <Radio.Group name="radiogroup" value={formData.sex}>
                <Radio value={0}>男</Radio>
                <Radio value={1}>女</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="iphone"
              label="手机号"
              rules={[
                {
                  required: true,
                  message: "请输入你的手机号",
                },
              ]}>
              <Input placeholder="请输入你的手机号" value={formData.iphone} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}>
              <Button type="primary" htmlType="submit">
                修改
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    </div>
  );
}

export default TeacherView;
