import React, {useState , useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RowList from './RowList.js';
import Search from './Search';
import PageControl from './PageControl';
import {useHistory} from 'react-router-dom';
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
  button : {
    marginTop : theme.spacing(2),
    textAlign: 'right',
  },
  buttonelement : {
    marginRight : theme.spacing(3),
  },
}));

export default function Deposits() {
  const classes = useStyles();
  const history = useHistory();
  const [NoticeBoard, setNoticeBoard] = useState([])
  const [page, setPage] = useState(1)
  const [keyword, setkeyword] = useState('')
  const [keyText, setkeyText] = useState('')
  const keywordArr = [['type','분류'],['title', '제목'],['writer', '글쓴이']]
  useEffect(() => {
    axios.get(`/api/noticeBoard/table?page=${page}`)
    .then(response => {
      setNoticeBoard(response.data)
    })
  },[])

  useEffect(() => {
    console.log(NoticeBoard)
  },[NoticeBoard])
  return (
    <React.Fragment >      
    <Title >게시판</Title>
      <Table size="small">
        <TableHead className={classes.tablehead}>
          <TableRow>
            <TableCell>분류</TableCell>
            <TableCell>제목</TableCell>
            <TableCell>글쓴이</TableCell>
            <TableCell>작성일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {NoticeBoard.map((notice) => (
            <TableRow key={notice._id}>
              <TableCell>{notice.type}</TableCell>
              <TableCell><a>{notice.title}</a></TableCell>
              <TableCell>{notice.writer.Name}</TableCell>
              <TableCell>{notice.writeDate.substr(0,10)}</TableCell>    
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.button}>
            <Button type="button" onClick = {() => history.push('/App/NoticeAdd')}  className={classes.buttonelement}  variant="outlined" color="primary" >
                    게시글 추가
            </Button>         
        </div>
      <div className={classes.page}>
        <PageControl func = {setPage}/>
      </div>
      
    </React.Fragment>
  );
}






