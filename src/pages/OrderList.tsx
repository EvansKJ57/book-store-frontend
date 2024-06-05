import React from 'react';
import styled from 'styled-components';
import Title from '../components/common/Title';
import { useOrders } from '../hooks/useOrders';
import { formatNumber, formatDate } from '../utils/format';
import Button from '../components/common/Button';

const OrderList = () => {
  const { orders, selectOrderItem, selectedItemId } = useOrders();

  return (
    <>
      <Title size="large">주문 내역</Title>
      <OrderListStyle>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>주문일자</th>
              <th>주소</th>
              <th>수령인</th>
              <th>전화번호</th>
              <th>대표상품명</th>
              <th>수량</th>
              <th>금액</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.orderId}>
                <tr key={order.orderId}>
                  <td>{order.orderId}</td>
                  <td>{formatDate(order.createdAt, 'YYYY.MM.DD')}</td>
                  <td>{order.address}</td>
                  <td>{order.receiver}</td>
                  <td>{order.contact}</td>
                  <td>{order.orderedBooks[0].title}</td>
                  <td>{order.totalQty}</td>
                  <td>{formatNumber(order.totalPrice)} 원</td>
                  <td>
                    <Button
                      size="small"
                      scheme="normal"
                      onClick={() => selectOrderItem(order.orderId)}
                    >
                      자세히
                    </Button>
                  </td>
                </tr>
                {selectedItemId === order.orderId && (
                  <tr>
                    <td></td>
                    <td colSpan={8}>
                      <ul className="detail">
                        {order.orderedBooks.map((book) => (
                          <li key={book.id}>
                            <div>
                              <span>{book.id}</span>
                              <span>{book.title}</span>
                              <span>{book.author}</span>
                              <span>{formatNumber(book.price)} 원</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </OrderListStyle>
    </>
  );
};

const OrderListStyle = styled.div`
  padding: 24px 0 0 0;
  table {
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    border-bottom: 1px solid ${({ theme }) => theme.color.border};

    th,
    td {
      padding: 16px;
      border-bottom: 1px solid ${({ theme }) => theme.color.border};
      text-align: center;
    }
  }
  .detail {
    margin: 0;
    li {
      list-style: square;
      text-align: left;
      div {
        display: flex;
        padding: 8px 12px;
        gap: 8px;
      }
    }
  }
`;

export default OrderList;
