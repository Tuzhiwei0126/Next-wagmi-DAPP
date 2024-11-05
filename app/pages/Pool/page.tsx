'use client';

import { BackgroundLines } from '@/components/ui/background-lines';
import { useReadPoolManagerGetAllPools } from '@/utils/generated';
import { Button, Space, Splitter, Table } from 'antd';
import { useEffect, useRef, useState } from 'react';
import AddModal from './AddModal';

const columns = [
  {
    title: 'TokenA',
    dataIndex: 'token0',
    key: 'token0',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'TokenB',
    dataIndex: 'token1',
    key: 'token1',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Fee tier',
    dataIndex: 'fee',
    key: 'fee',
  },
  {
    title: 'Set price range',
    dataIndex: 'tickUpper',
    key: 'tickUpper',
  },
  {
    title: 'Set price range',
    dataIndex: 'tickLower',
    key: 'tickLower',
  },
  {
    title: 'Current price',
    dataIndex: 'feeProtocol',
    key: 'feeProtocol',
  },
  {
    title: 'Liquidity',
    dataIndex: 'tick',
    key: 'tick',
  },
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: (_, { tags }) => (
  //     <>
  //       {tags.map((tag) => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
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

const App = () => {
  const childrenRef = useRef();
  const [state, SetState] = useState([]);
  const [Loading, SetLoading] = useState(true);
  const {
    data: balance,
    error,
    isPending,
  } = useReadPoolManagerGetAllPools({
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  });
  useEffect(() => {
    if (balance) {
      console.log(balance?.slice(0, 1), error, isPending, 112121);
      SetState(balance);
      SetLoading(isPending);
    }
  }, [balance, isPending]);

  // if (balance) {
  //   SetLoading(isPending);
  // }
  // //   SetState(balance?.slice(0, 1));
  //
  // const {
  //   data: balance,
  //   error,
  //   isPending,
  // } = useReadPoolManagerGetAllPools({
  //   address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
  // });
  // if (balance) {
  //   // SetState(balance?.slice(0, 1));
  //   // SetLoading(isPending);
  // }

  // console.log(balance?.slice(0, 1), error, isPending, 112121);
  //   console.log(, 'childrenRef');
  //   childrenRef?.current?.setOpen(true);
  //   const { setOpen, open } = childrenRef?.current || {};
  //onClick={ childrenRef?.current?.setOpen(true)}
  const test = () => {
    //@ts-ignore
    childrenRef?.current?.setOpen(true);
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

  return (
    <>
      <BackgroundLines className="flex w-full flex-col items-center justify-center px-4">
        <div className="h-4/5 w-full pt-20">
          <div className="px-20">
            <Splitter style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
              <Splitter.Panel defaultSize="50%" min="30%" max="60%">
                <div>
                  {addPool}
                  <Table
                    loading={Loading}
                    key="index"
                    class="h-full"
                    columns={columns.slice(0, 6)}
                    // dataSource={balance?.[0]}
                    dataSource={state}
                  />
                </div>
              </Splitter.Panel>
              <Splitter.Panel>
                <div>
                  {toggleButton}
                  <Table
                    loading={Loading}
                    key="index"
                    columns={columns}
                    dataSource={state}
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
