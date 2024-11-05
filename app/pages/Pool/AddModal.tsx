import { poolManagerAbi } from '@/utils/generated';
import { TickMath, encodeSqrtRatioX96 } from '@uniswap/v3-sdk';
import { Button, Form, InputNumber, Modal, Slider } from 'antd';
import React, { useImperativeHandle, useState } from 'react';
import { useWriteContract } from 'wagmi';
import AmountInput from '../Transaction/AmountInput';
const AddModal = (props, ref) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { writeContract } = useWriteContract();
  const handleOk = async () => {
    console.log(form, 'formform');
    const tokenA: `0x${string}` = '0xEcd0D12E21805803f70de03B72B1C162dB0898d9';
    const tokenB: `0x${string}` = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';

    const res = await writeContract({
      abi: poolManagerAbi,
      address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      functionName: 'createAndInitializePoolIfNecessary',
      args: [
        {
          tokenA: tokenA,
          tokenB: tokenB,
          fee: 1000,
          tickLower: TickMath.getTickAtSqrtRatio(encodeSqrtRatioX96(2, 1)),
          tickUpper: TickMath.getTickAtSqrtRatio(encodeSqrtRatioX96(9000, 1)),
          sqrtPriceX96: BigInt(encodeSqrtRatioX96(100, 1).toString()),
        },
      ],
    });
    console.log(res, 99999);

    // form.submit();
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   setOpen(false);
    // }, 3000);
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
  const onChange = (value) => {
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

export default React.forwardRef(AddModal);
