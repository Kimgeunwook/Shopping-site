import React, {useState , useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import RowList from './RowList.js';
import Search from './Search';
import PageControl from './PageControl';
import axios from 'axios';

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
  page : {
    display: 'flex',
    marginTop : theme.spacing(3),
    justifyContent: 'center',
  }
}));

export default function Orders() {
  const classes = useStyles();
  const [Products, setProducts] = useState([])
  const [filt, setfilt] = useState('주문 모두 보기')
  const [page, setPage] = useState(1)
  const [keyword, setkeyword] = useState('')
  const [keyText, setkeyText] = useState('')
  const keywordArr = [['orderNum','주문 번호'],['name', '주문 상품'],['seller', '판매자'],['buyer', '주문자']]
  useEffect(() => {
    axios.get(`/api/order/table?filt=${filt}&page=${page}`)
    .then(response => {
      setProducts(response.data)
    })
  },[])
  
  useEffect(() => { //filt값 조정
    axios.get(`/api/order/table?filt=${filt}&page=${page}`)
    .then(response => {
      setProducts(response.data)
    })
  },[filt])
  useEffect(() => { //page값 조정
    axios.get(`/api/order/table?filt=${filt}&page=${page}`)
    .then(response => {
      setProducts(response.data)
    })
  },[page])
  const btnClick = (event) => {
    axios.get(`/api/order/table?filt=${filt}&page=${page}&keyword=${keyword}&keyText=${keyText}`)
    .then(response => {
      setProducts(response.data)
    })
  };
  
  return (
    <React.Fragment >      
    <Title >주문 현황</Title>
      <Search func= {setkeyword} func2 = {setkeyText} btnfunc = {btnClick} arr = {keywordArr}/>
      <RowList func = {setfilt}/>
      <Table size="small">
        <TableHead className={classes.tablehead}>
          <TableRow>
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
        {Products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>-</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell>{product.orderDate}</TableCell>
              <TableCell>{product.orderNum}</TableCell>
              <TableCell>{product.orderProduct.name}</TableCell>
              <TableCell>{product.orderProduct.seller.Name}</TableCell>
              <TableCell>{product.buyer.Name}</TableCell> 
              <TableCell>{product.orderProduct.price[product.orderOption]}</TableCell>
              <TableCell>{product.orderStatus}</TableCell>             
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.page}>
        <PageControl func = {setPage}/>
      </div>
      
      
    </React.Fragment>
  );
}