import { Button, Form, Modal } from 'antd';

import { InputNumber, Slider } from 'antd';
import React, { useImperativeHandle, useState } from 'react';
import AmountInput from '../Transaction/AmountInput';

const App = (props, ref) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOk = () => {
    form.submit();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  const handleCancel = () => {
    setOpen(false);
  };
  useImperativeHandle(ref, () => {
    return {
      setOpen,
      open,
    };
  }, [open]);
  const [form] = Form.useForm();
  const onChange: InputNumberProps['onChange'] = (value) => {
    console.log('changed', value);
  };
  return (
    <>
      <Modal
        open={open}
        title="Title"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          name="basic"
          layout="vertical"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 800 }}
          initialValues={{ remember: true }}
          form={form}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <AmountInput />
          </Form.Item>

          <Form.Item<FieldType>
            label=""
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <AmountInput />
          </Form.Item>

          <Form.Item<FieldType>
            label="Fee tier"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <InputNumber<number>
              defaultValue={100}
              min={0}
              max={100}
              style={{ width: '100%' }}
              formatter={(value) => `${value}%`}
              parser={(value) => value?.replace('%', '') as unknown as number}
              //   onChange={onChange}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Set price range"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <InputNumber
              min={1}
              max={10}
              style={{ width: '45%', marginRight: '10%' }}
              defaultValue={3}
              placeholder="low Price"
              onChange={onChange}
            />
            <InputNumber
              min={1}
              max={10}
              placeholder="high Price"
              defaultValue={3}
              style={{ width: '45%' }}
              onChange={onChange}
            />
          </Form.Item>
          <Form.Item<FieldType>
            label="Current price"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <InputNumber
              min={1}
              style={{ width: '100%' }}
              max={10}
              defaultValue={3}
              onChange={onChange}
            />
            <Slider />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default React.forwardRef(App);
