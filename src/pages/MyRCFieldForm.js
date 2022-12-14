import React from "react";
import Form, { Field } from "../components/my-rc-field-form";

export default function MyRCFieldForm() {
  const [form] = Form.useForm();

  React.useEffect(() => {
    console.log("form", form); //sy-log
    form.setFieldsValue({ username: "default" });
  }, []);

  return (
    <Form form={form}>
      <Field label="用户名" name="username">
        <input placeholder="请输入用户名" />
      </Field>
      <Field label="密码" name="password">
        <input placeholder="请输入密码" type={"password"} />
      </Field>
      <button type="submit">提交</button>
    </Form>
  );
}
