import React, {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import Title from './Title';
function preventDefault(event) {
  event.preventDefault();
}



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  paper: {
    padding: theme.spacing(1),
    marginTop : theme.spacing(1),
    backgroundColor : '#f5f5f5',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button : {
    marginTop : theme.spacing(2),
    textAlign: 'right',
  },
  buttonelement : {
    marginRight : theme.spacing(3),
  },
  inputTextTitle : {
    width : '95%',
    height : 50,
    backgroundColor : 'white'
  },
  inputTextContent : {
    width : '95%',
    height : 400,
    backgroundColor : 'white'
  },
  formControl: {
    minWidth: 90,
  },
}));


export default function NoticeDetail() {
  const [NoticeObj, setNoticeObj] = useState()
  const classes = useStyles();
  const history = useHistory();
  const curId = window.location.href.split('id=')[1]
  useEffect(() => {
    axios.get(`/api/noticeBoard/detail?id=${curId}`)
    .then(response => {
      setNoticeObj(response.data[0])
    })
  },[])
  return (
    <React.Fragment >      
    <Title >게시글 상세보기</Title>
    <div className={classes.root}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}><h1>{NoticeObj !== undefined ? NoticeObj.title + '  (' + NoticeObj.writer.Name + ')' : ""}</h1></Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <textarea disabled type = 'text' value = {NoticeObj !== undefined ? NoticeObj.content: ""} className={classes.inputTextContent} />
                </Paper>
            </Grid>
        </Grid>

        <div className={classes.button}>
              
            <Button type="button" onClick = {() => history.push('/App/NoticeBoard')} variant="outlined" color="primary" >
                    목록보기
            </Button>       
        </div>
  </div>
      
    </React.Fragment>
  );
}






