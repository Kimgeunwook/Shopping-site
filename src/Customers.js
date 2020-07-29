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
import axios from 'axios';
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
  const [keyword, setkeyword] = useState('')
  const [keyText, setkeyText] = useState('')
  const [page, setPage] = useState(1)
  const [grade, setgrade] = useState('all')
  const keywordArr = [['name', '이름'], ['id','아이디'], ['hp','번호']]
  const gradeArr = [['one','1'],['two','2'],['three','3'],['four','4'],['five','5'],['all','모두']]
  const [mailstate, setcheckState] = useState({
    checkedReceive: true,
    checkedNotReceive: false,    
  });
  const [lowerAmount, setlowerAmount] = useState(0)
  const [upperAmount, setupperAmount] = useState(Infinity)
  const [lowerReserve, setlowerReserve] = useState(0)
  const [upperReserve, setupperReserve] = useState(Infinity)
  const [fromDate, setFromDate] = useState('0000-01-01')
  const [toDate, setToDate] = useState('9999-12-30')
  useEffect(() => {
    axios.get(`/api/user/table?&page=${page}`)
    .then(response => {
      setrows(response.data)
    })
  },[])
  const textChange = (event) => { //메인 검색 text
    setkeyText(event.target.value)
  };
  const lowerAmountChange = (event) => { 
    setlowerAmount(event.target.value)
  };
  const upperAmountChange = (event) => { 
    setupperAmount(event.target.value)
  };
  const lowerReserveChange = (event) => { 
    setlowerReserve(event.target.value)
  };
  const upperReserveChange = (event) => { 
    setupperReserve(event.target.value)
  };
  const btnClick = (event) => { //메인 검색 btn클릭시
    axios.get(`/api/user/table?page=${page}&keyword=${keyword}&keyText=${keyText}`)
    .then(response => {
      setrows(response.data)
    })
  }
  const detailbtnClick = (event) => { //상세 검색 btn클릭시
    axios.get(`/api/user/detail?page=${page}&grade=${grade}&lowerAmount=${lowerAmount}&upperAmount=${upperAmount}&lowerReserve=${lowerReserve}&upperReserve=${upperReserve}&mailstate=${mailstate}&fromDate=${fromDate}&toDate=${toDate}`)
    .then(response => {
      setrows(response.data)
    })
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>

     
        {/* //////////////////////// */}
      
      <Grid item xs={2}>

      </Grid>

      <Grid item xs={3}  >
          <SelectKeyword func= {setkeyword} arr= {keywordArr} />
      </Grid>

      <Grid item xs={3}>
          <form  noValidate autoComplete="off">
              <TextField id="outline-search" label="search" variant="outlined" onChange = {textChange} />
          </form>
      </Grid>

      <Grid item xs={3}>
        <Button variant="contained" color="primary" className={classes.searchbtn}  onClick={btnClick}>
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
           <Calendar fromfunc = {setFromDate} tofunc = {setToDate}/>
        </Grid>
        <Grid item xs={1} className={classes.buytext}>
           구매금액 : 
        </Grid>
        <Grid item xs={2}>
        <form className={classes.pricetext} noValidate autoComplete="off">
          <TextField id="standard-basic" label="최소금액" onChange = {lowerAmountChange} />
        </form>
        </Grid>
        <Grid item xs={1} className={classes.buytext}>
          <div className={classes.buytext2}>
             ~
          </div>
        </Grid>
        <Grid item xs={2}>
        <form className={classes.pricetext} noValidate autoComplete="off">
          <TextField id="standard-basic" label="최대금액" onChange = {upperAmountChange} />
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
          <SelectKeyword func= {setgrade} arr = {gradeArr}/>  
        </Grid>
        <Grid item xs={1}>
          
        </Grid>
        <Grid item xs={1} className={classes.buytext3}>
           적립금 : 
        </Grid>
        <Grid item xs={2}>
        <form className={classes.pricetext} noValidate autoComplete="off">
          <TextField id="standard-basic" label="최소금액" onChange = {lowerReserveChange} />
        </form>
        </Grid>
        <Grid item xs={1} className={classes.buytext3}>
          <div className={classes.buytext2}>
             ~
          </div>
        </Grid>
        <Grid item xs={2}>
        <form className={classes.pricetext} noValidate autoComplete="off">
          <TextField id="standard-basic" label="최대금액" onChange = {upperReserveChange} />
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
          <Checkboxs func= {setcheckState}/>
        </Grid>
        <Grid item xs={6}>
        </Grid>
        {/* //////////////////////// */}



        {/* //////////////////////// */}
        <Grid item xs={12}>
          <div className={classes.btn}>
            <Button variant="contained" color="primary" onClick= {detailbtnClick} >
              상세검색
            </Button>
          </div>
          
          </Grid>
        {/* //////////////////////// */}

        <Grid item xs={12}>
          <div className={classes.result}>
             {rows.length}건의 검색 결과가 있습니다.
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
              <TableCell>{row.HP}</TableCell>
              <TableCell>{row.susbscriptionDate}</TableCell>
              <TableCell>{row.Name}</TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.grade}</TableCell>
              <TableCell>{row.visit}</TableCell>
              <TableCell>{row.totalPurchaseAmount}</TableCell>
              <TableCell>{row.totalReserve}</TableCell>
              <TableCell>{row.mailReceive ? 'YES' : 'NO'}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>



        <Grid item xs={12}>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.page}>
          <PageControl func = {setPage}/>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
