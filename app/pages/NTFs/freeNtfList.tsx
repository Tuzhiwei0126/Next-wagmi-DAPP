'use client';
import { Avatar, List, Skeleton } from 'antd';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const ListCom = () => {
  const options = {
    method: 'GET',
    headers: { 'x-api-key': '2nKxVJ2feS2ZUYc8ajB7cSBqu4Y' },
  };

  fetch(
    'https://api.chainbase.online/v1/nft/collection/trending?chain_id=1',
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item
          actions={[
            <a key="list-loadmore-edit">edit</a>,
            <a key="list-loadmore-more">more</a>,
          ]}
        >
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
            <div>content</div>
          </Skeleton>
        </List.Item>
      )}
    />
  );
};

export default function FreeNtfList() {
  return (
    <div>
      <div>
        <div> header</div>
        <div>
          <ListCom />
        </div>
      </div>
      <h1>99</h1>
    </div>
  );
}
//  获取 账户拥有的ntf
// const options = {method: 'GET', headers: {'x-api-key': '2nKxVJ2feS2ZUYc8ajB7cSBqu4Y'}};

// fetch('https://api.chainbase.online/v1/account/nfts?chain_id=1&address=0xF663331cDBA5585CDd0191da5F85b7c490C47304', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));
