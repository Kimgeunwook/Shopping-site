import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SelectKeyword from './SelectKeyword';
import Button from '@material-ui/core/Button';
import Calendar from './Calendar';
import Checkboxs from './Checkboxs';
import Divider from '@material-ui/core/Divider';
import PageControl from './PageControl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Drawer from '@material-ui/core/Drawer';
import TableRow from '@material-ui/core/TableRow';
function createData(check, id, type, date , num, product, seller, orderer,price, status) {
  return { check, id, type, date , num, product, seller, orderer, price, status };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  searchbtn : {
    marginTop : theme.spacing(1)
  },
  leftcomp : {
    marginLeft : theme.spacing(5)
  },
  buytext :{
    display : 'flex',
    textAlign : 'center',
    alignItems : 'center',
    fontSize : 15,
    marginTop : theme.spacing(2),
    marginLeft : theme.spacing(1),
    margin : '0 auto'
  },
  pricetext : {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    marginTop : theme.spacing(1)
  },
  buytext2 : {
    display : 'flex',
    textAlign : 'center',
    alignItems : 'center',
    marginTop : theme.spacing(2),
    margin : '0 auto'
  },
  buytext3 : {
    display : 'flex',
    textAlign : 'center',
    alignItems : 'center',
    marginLeft : theme.spacing(5)
  },
  btn : {
    display: 'flex',
    marginTop : theme.spacing(3),
    justifyContent: 'center',
  },
  result: {
    display: 'flex',
    marginTop : theme.spacing(3),
    justifyContent: 'flex-end',
  }, 
  page : {
    display: 'flex',
    marginTop : theme.spacing(3),
    justifyContent: 'center',
  },
  tablehead : {
    background : 'lightgray',
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const [rows, setrows] = useState([])
  useEffect(() => {
    // axios.get(`/api/order/table?filt=${filt}&page=${page}`)
    // .then(response => {
    //   setProducts(response.data)
    // })
  },[])
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>

     
        {/* //////////////////////// */}
      
      <Grid item xs={2}>

      </Grid>

      <Grid item xs={3} justifyContent="flex-end" >
          <SelectKeyword />
      </Grid>

      <Grid item xs={3}>
          <form  noValidate autoComplete="off">
              <TextField id="outline-search" label="search" variant="outlined" />
          </form>
      </Grid>

      <Grid item xs={3}>
        <Button variant="contained" color="primary" className={classes.searchbtn} >
          검색
        </Button>
      </Grid>

   
        
      
      
      <Grid item xs={1}>
      </Grid>
        {/* //////////////////////// */}

        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>


        {/* //////////////////////// */}
        <Grid item xs={5} className={classes.leftcomp}>
           <Calendar />
        </Grid>
        <Grid item xs={1} className={classes.buytext}>
           구매금액 : 
        </Grid>
        <Grid item xs={2}>
        <form className={classes.pricetext} noValidate autoComplete="off">
          <TextField id="standard-basic" label="최소금액" />
        </form>
        </Grid>
        <Grid item xs={1} className={classes.buytext}>
          <div className={classes.buytext2}>
             ~
          </div>
        </Grid>
        <Grid item xs={2}>
        <form className={classes.pricetext} noValidate autoComplete="off">
          <TextField id="standard-basic" label="최대금액" />
        </form>
        </Grid>
        {/* //////////////////////// */}


        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>



        {/* //////////////////////// */}
        <Grid item xs={1}  className={classes.buytext3}>
          회원등급 : 
        </Grid>
        <Grid item xs={2}>
          <SelectKeyword />  
        </Grid>
        <Grid item xs={1}>
          
        </Grid>
        <Grid item xs={1} className={classes.buytext3}>
           적립금 : 
        </Grid>
        <Grid item xs={2}>
        <form className={classes.pricetext} noValidate autoComplete="off">
          <TextField id="standard-basic" label="최소금액" />
        </form>
        </Grid>
        <Grid item xs={1} className={classes.buytext3}>
          <div className={classes.buytext2}>
             ~
          </div>
        </Grid>
        <Grid item xs={2}>
        <form className={classes.pricetext} noValidate autoComplete="off">
          <TextField id="standard-basic" label="최대금액" />
        </form>
        </Grid>
         {/* //////////////////////// */}
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}></Grid>


        {/* //////////////////////// */}
        <Grid item xs={1} className={classes.buytext3}>
            메일 수신 : 
        </Grid>
        <Grid item xs={4}>
          <Checkboxs />
        </Grid>
        <Grid item xs={6}>
        </Grid>
        {/* //////////////////////// */}



        {/* //////////////////////// */}
        <Grid item xs={12}>
          <div className={classes.btn}>
            <Button variant="contained" color="primary"  >
              상세검색
            </Button>
          </div>
          
          </Grid>
        {/* //////////////////////// */}

        <Grid item xs={12}>
          <div className={classes.result}>
             000건의 검색 결과가 있습니다.
          </div>
        </Grid>
        

        <Table size="small">
        <TableHead className={classes.tablehead}>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>가입일</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>아이디</TableCell>
            <TableCell>회원 등급</TableCell>
            <TableCell>방문수</TableCell>
            <TableCell>구매 금액</TableCell>
            <TableCell>적립금</TableCell>
            <TableCell>메일 수신 여부</TableCell>
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



        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.page}>
            <PageControl />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
