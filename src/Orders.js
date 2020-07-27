// import React from 'react';
// import Link from '@material-ui/core/Link';
// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Title from './Title';
// import RowList from './RowList.js';
// import Search from './Search';
// import PageControl from './PageControl';
// // Generate Order Data
// function createData(check, id, type, date , num, product, seller, orderer,price, status) {
//   return { check, id, type, date , num, product, seller, orderer, price, status };
// }

// const rows = [
//   createData('true', 0, '교환', '2020-07-13', '201511178', 'zara 티셔츠', 'ZARA', '근욱(yuk888)', '30,000원', '배송중'),
//   createData('true', 1, '교환', '2020-07-13', '201511178', 'zara 티셔츠', 'ZARA', '근욱(yuk888)', '30,000원', '배송중'),
//   createData('true', 2, '교환', '2020-07-13', '201511178', 'zara 티셔츠', 'ZARA', '근욱(yuk888)', '30,000원', '배송중'),
//   createData('true', 3, '교환', '2020-07-13', '201511178', 'zara 티셔츠', 'ZARA', '근욱(yuk888)', '30,000원', '배송중'),
//   createData('true', 4, '교환', '2020-07-13', '201511178', 'zara 티셔츠', 'ZARA', '근욱(yuk888)', '30,000원', '배송중'),
// ];

// function preventDefault(event) {
//   event.preventDefault();
// }

// const useStyles = makeStyles((theme) => ({
//   seeMore: {
//     marginTop: theme.spacing(3),
//   },
//   tablehead : {
//     background : 'lightgray',
//   },
//   page : {
//     display: 'flex',
//     marginTop : theme.spacing(3),
//     justifyContent: 'center',
//   }
// }));

// export default function Orders() {
//   const classes = useStyles();
//   return (
//     <React.Fragment >
//       <Title >주문 현황</Title>
//       <Search />
//       <RowList/>

      
//       <Table size="small">
//         <TableHead className={classes.tablehead}>
//           <TableRow>
//             <TableCell>선택</TableCell>
//             <TableCell>번호</TableCell>
//             <TableCell>유형</TableCell>
//             <TableCell>주문 일시</TableCell>
//             <TableCell>주문 번호</TableCell>
//             <TableCell>주문 상품</TableCell>
//             <TableCell>판매자</TableCell>
//             <TableCell>주문자(아이디)</TableCell>
//             <TableCell>결제 금액</TableCell>
//             <TableCell>결제 상태</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <TableRow key={row.id}>
//               <TableCell>{row.check}</TableCell>
//               <TableCell>{row.id}</TableCell>
//               <TableCell>{row.type}</TableCell>
//               <TableCell>{row.date}</TableCell>
//               <TableCell>{row.num}</TableCell>
//               <TableCell>{row.product}</TableCell>
//               <TableCell>{row.seller}</TableCell>
//               <TableCell>{row.orderer}</TableCell>
//               <TableCell>{row.price}</TableCell>
//               <TableCell>{row.status}</TableCell>
              
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <div className={classes.page}>
//         <PageControl />
//       </div>
      
//       <div className={classes.seeMore}>
//         <Link color="primary" href="#" onClick={preventDefault}>
//           See more orders
//         </Link>
//       </div>
//     </React.Fragment>
//   );
// }
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
  useEffect(() => {
    axios.get(`/api/order/table?filt=${filt}&page=${page}`)
    .then(response => {
      setProducts(response.data)
      console.log(response.data[0].orderProduct.name)
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
     console.log(keyword + keyText)
    axios.get(`/api/order/table?filt=${filt}&page=${page}&keyword=${keyword}&keyText=${keyText}`)
    .then(response => {
      setProducts(response.data)
    })
  };
  return (
    <React.Fragment >      
    <Title >주문 현황</Title>
      <Search func= {setkeyword} func2 = {setkeyText} btnfunc = {btnClick}/>
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
          {/* {Products.map((product) => (
            <TableRow key={product.num}>
              <TableCell>{product._id}</TableCell>
              <TableCell>{product.num}</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell>{product.orderDate}</TableCell>
              <TableCell>{product.orderNum}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.seller}</TableCell>
              <TableCell>{product.buyer}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.status}</TableCell>              
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
      <div className={classes.page}>
        <PageControl func = {setPage}/>
      </div>
      
      
    </React.Fragment>
  );
}