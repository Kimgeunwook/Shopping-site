import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Typography from '@material-ui/core/Typography';
import Calendar from './Calendar.js';
import RowList from './RowList.js';
// Generate Order Data
function createData(check, id, type, date , num, product, seller, orderer,price, status) {
  return { check, id, type, date , num, product, seller, orderer, price, status };
}

const rows = [
  createData('true', 0, '교환', '2020-07-13', '201511178', 'zara 티셔츠', 'ZARA', '근욱(yuk888)', '30,000원', '배송중'),
  createData('true', 1, '교환', '2020-07-13', '201511178', 'zara 티셔츠', 'ZARA', '근욱(yuk888)', '30,000원', '배송중'),
  createData('true', 2, '교환', '2020-07-13', '201511178', 'zara 티셔츠', 'ZARA', '근욱(yuk888)', '30,000원', '배송중'),
  createData('true', 3, '교환', '2020-07-13', '201511178', 'zara 티셔츠', 'ZARA', '근욱(yuk888)', '30,000원', '배송중'),
  createData('true', 4, '교환', '2020-07-13', '201511178', 'zara 티셔츠', 'ZARA', '근욱(yuk888)', '30,000원', '배송중'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  tablehead : {
    background : 'lightgray',
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title >주문 현황</Title>

      <Calendar/>
      <RowList />

      
      <Table size="small">
        <TableHead className={classes.tablehead}>
          <TableRow>
            <TableCell>선택</TableCell>
            <TableCell>번호</TableCell>
            <TableCell>유형</TableCell>
            <TableCell>주문 일시</TableCell>
            <TableCell>주문 번호</TableCell>
            <TableCell>주문 상품</TableCell>
            <TableCell>판매자</TableCell>
            <TableCell>주문자(아이디)</TableCell>
            <TableCell>결제 금액</TableCell>
            <TableCell>결제 상태</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.check}</TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.num}</TableCell>
              <TableCell>{row.product}</TableCell>
              <TableCell>{row.seller}</TableCell>
              <TableCell>{row.orderer}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.status}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}