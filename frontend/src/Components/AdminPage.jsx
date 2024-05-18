import { Form, Input, Button, message, Col } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import axios from "axios"
function AdminPage() {
  const submit = () => {
    message.success("Movie data has been uploaded");
  };

  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");
  const [form] = Form.useForm();

  const addMovie = () => {
    let data = {
      id: Math.floor(Math.random() * 100),
      movieName: title,
      movieDetails: description,
      moviePoster: picture,
      movieRating: 0,
    };
    axios
      .post("http://localhost:5005/addmovie", data)
      .then((res) => {
        if (res.status === 200) {
          form.resetFields();
          submit();
        }
      })
      .catch((err) => console.error(err));
  }
  return (
        <Col span={12}>
          <Form form={form} style={{ padding: 20 }}>
            <Form.Item
              label="Movie name"
              name={"movieName"}
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input placeholder="Movie name" onChange={(e) => setTitle(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Movie details"
              name={"details"}
              rules={[{ required: true, message: "This field is required" }]}
            >
              <TextArea placeholder="Movie details"  onChange={(e) => setDescription(e.target.value)}/>
            </Form.Item>
            <Form.Item
              label="Movie Poster Link"
              name={"posterImageLink"}
              rules={[{ required: true, message: "This field is required" }]}
            >
              <TextArea placeholder="Movie Poster Link"  onChange={(e) => setPicture(e.target.value)}/>
            </Form.Item>
            <Button type="primary" onClick={addMovie}>
              Submit
            </Button>
          </Form></Col>
  );
}
export default AdminPage;
