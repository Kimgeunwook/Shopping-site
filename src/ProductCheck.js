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
import Button from '@material-ui/core/Button';
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
  },
  result: {
    display: 'flex',
    marginTop : theme.spacing(3),
    justifyContent: 'flex-end',
  }, 
}));

export default function Orders() {
  const classes = useStyles();
  const [Products, setProducts] = useState([])
  // const [filt, setfilt] = useState('주문 모두 보기')
  const [page, setPage] = useState(1)
  const [keyword, setkeyword] = useState('')
  const [keyText, setkeyText] = useState('')
  const keywordArr = [['orderNum','상품 이름'],['seller', '판매자']]
  useEffect(() => {
    axios.get(`/api/product/check`)
    .then(response => {
      console.log(response.data)
      setProducts(response.data)
    })
  },[])
  
  
  useEffect(() => { //page값 조정
    if(keyword == '') axios.get(`/api/product/check?page=${page}`)
    .then(response => {
      setProducts(response.data)
    })
    else axios.get(`/api/product/check?page=${page}&keyword=${keyword}&keyText=${keyText}`)
    .then(response => {
      setProducts(response.data)
    })
  },[page])
  const btnClick = (event) => {
    axios.get(`/api/product/check?page=${page}&keyword=${keyword}&keyText=${keyText}`)
    .then(response => {
      setProducts(response.data)
    })
  };
  
  return (
    <React.Fragment >      
    <Title >주문 현황</Title>
      <Search func= {setkeyword} func2 = {setkeyText} btnfunc = {btnClick} arr = {keywordArr}/>
      {/* <RowList func = {setfilt}/> */}

     
          <div className={classes.result}>
             {Products.length}건의 검색 결과가 있습니다.
          </div>
      
      <Table size="small">
        <TableHead className={classes.tablehead}>
          <TableRow>
            <TableCell>상품 이름</TableCell>
            <TableCell>판매자</TableCell>
            <TableCell>기본 가격</TableCell>
            <TableCell>사이트</TableCell>
            <TableCell>카테고리</TableCell>
            <TableCell>상세보기</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {Products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.seller.Name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.site}</TableCell>
              <TableCell>{product.category}</TableCell>    
              <TableCell><Button variant="contained" color="primary" onClick={btnClick}>상세보기</Button></TableCell> 
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