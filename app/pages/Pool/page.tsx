'use client';

import { BackgroundLines } from '@/components/ui/background-lines';
import {
  poolManagerAbi,
  useReadPoolManagerGetAllPools,
} from '@/utils/generated';
import { Button, Space, Splitter, Table, Tag } from 'antd';
import { useRef } from 'react';
import { useWriteContract } from 'wagmi';
import AddModal from './AddModal';
interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns = [
  {
    title: 'Token',
    dataIndex: 'key',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Fee tier',
    dataIndex: 'name',
    key: 'Fee',
  },
  {
    title: 'Set price range',
    dataIndex: 'priceRange',
    key: 'priceRange',
  },
  {
    title: 'Current price',
    dataIndex: 'age',
    key: 'priceCurrent',
  },
  {
    title: 'Liquidity',
    dataIndex: 'address',
    key: 'Liquidity',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Remove </a>
        <a>Collect</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '5',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '7',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '88',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '656',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const tokenA: `0x${string}` = '0xEcd0D12E21805803f70de03B72B1C162dB0898d9';
const tokenB: `0x${string}` = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';
const data11 = {
  token0: tokenA,
  token1: tokenB,
  tickLower: 1,
  tickUpper: 30000,
  fee: 3000,
  sqrtPriceX96: 10n,
};
const App = () => {
  const childrenRef = useRef();
  const { writeContract } = useWriteContract();

  //   console.log(, 'childrenRef');
  //   childrenRef?.current?.setOpen(true);
  //   const { setOpen, open } = childrenRef?.current || {};
  //onClick={ childrenRef?.current?.setOpen(true)}
  const test = () => {
    //@ts-ignore
    // childrenRef?.current?.setOpen(true);
    const res = writeContract({
      abi: poolManagerAbi,
      address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      functionName: 'createAndInitializePoolIfNecessary',
      args: [
        {
          tokenA: tokenA,
          tokenB: tokenB,
          fee: 3000,
          tickLower: 1,
          tickUpper: 3000,
          sqrtPriceX96: BigInt('100000000'),
        },
      ],
    });
    console.log(res, 'resres');
  };
  const toggleButton = (
    <Button type="primary" onClick={test}>
      Add
    </Button>
  );
  const addPool = (
    <Button type="primary" onClick={test}>
      addPool
    </Button>
  );

  const GetPoolContract = () => {
    const {
      data: balance,
      error,
      isPending,
    } = useReadPoolManagerGetAllPools({
      address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    });
    console.log(balance, error, isPending, 112121);
    if (isPending) return <div>Loading...</div>;

    if (error) return <div>Error: {error.shortMessage || error.message}</div>;

    return <div>Balance: {balance?.toString()}</div>;
  };
  return (
    <>
      <BackgroundLines className="flex w-full flex-col items-center justify-center px-4">
        <div className="h-4/5 w-full pt-20">
          <div className="px-20">
            <Splitter style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <Splitter.Panel defaultSize="50%" min="30%" max="60%">
                <div>
                  {data.length ? addPool : null}
                  <GetPoolContract />

                  <Table<DataType>
                    key="index"
                    class="h-full"
                    columns={columns.slice(0, 6)}
                    dataSource={data}
                  />
                </div>
              </Splitter.Panel>
              <Splitter.Panel>
                <div>
                  {data.length ? toggleButton : null}
                  <Table<DataType>
                    key="index"
                    columns={columns}
                    dataSource={data}
                  />
                </div>
              </Splitter.Panel>
            </Splitter>
          </div>
        </div>
      </BackgroundLines>

      <AddModal ref={childrenRef} />
    </>
  );
};

export default App;
