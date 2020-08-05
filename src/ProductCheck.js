import React, {useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Search from './Search';
import PageControl from './PageControl';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import ProductAdd from './ProductAdd';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

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
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  productdetail:{
    padding : theme.spacing(5),
    marginTop: theme.spacing(2),
  }
}));

export default function Orders() {
  const classes = useStyles();
  const [Products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [keyword, setkeyword] = useState('')
  const [keyText, setkeyText] = useState('')
  const keywordArr = [['orderNum','상품 이름'],['seller', '판매자']]
  const [open, setOpen] = React.useState(false);
  const [productId, setproductID] = useState('init')
  const [selectedProduct, setselectedProduct] = useState('init')

  
  useEffect( () => {
    async function get()
    {
        await axios.get(`/api/product/selected?id=${productId}`)
        .then(response => {
          setselectedProduct(response.data)
        })    

        if(productId != 'init')
        {
          setOpen(true);
        }
    }
    get();
    
  },[productId])
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    axios.get(`/api/product/check`)
    .then(response => {
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
    <Title >상품 조회</Title>
      <Search func= {setkeyword} func2 = {setkeyText} btnfunc = {btnClick} arr = {keywordArr}/>
     
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
              <TableCell><Button variant="contained" value ={product._id} color="primary" onClick={() => setproductID(product._id)}>상세보기</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.page}>
        <PageControl func = {setPage}/>
      </div>
      
      <Dialog
        fullWidth={true}
        maxWidth={'lg'}
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title">
          <div className={classes.productdetail}><ProductAdd/></div>
        

        <DialogActions>
          <Button onClick={handleClose} color="primary"> Close </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

