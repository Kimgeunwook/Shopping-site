import React, {useState } from 'react';
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

export default function NoticeAdd() {
  const classes = useStyles();
  const history = useHistory();
  const [category, setcategory] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [noticeObject, setnoticeObject] = useState([{ type: "normal", title: "", content : "" }]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handdleTextChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    if(name === 'type')
    {
      setcategory(e.target.value)
    }
    setnoticeObject(noticeObject => ({
      ...noticeObject,
      [name]: value
  }));
  };
  
  const addNotice = async() => {
    await axios({
        method: 'post',
        url: '/api/noticeBoard/add',
        data: {
            noticeObject
        }
      })
      .then(function (response) {
          window.location = "/App/NoticeBoard"
      });
  }
  return (
    <div className={classes.root}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper className={classes.paper}><h1>게시글 등록</h1></Paper>
            </Grid>

            
            <Grid item xs = {2}>
                <Paper className={classes.paper} >
                    
                <FormControl className={classes.formControl}>
                    <InputLabel >분류</InputLabel>
                    <Select
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={category}
                        onChange={handdleTextChange}
                        name = 'type'
                    >
                    <MenuItem value={"normal"}>일반글</MenuItem>
                    <MenuItem value={"notice"}>공지글</MenuItem>
                    </Select>
                </FormControl>  
                </Paper>
            </Grid>

            <Grid item xs={10}>
                <Paper className={classes.paper}>
                    <textarea placeholder = "제목" onChange = {handdleTextChange} type = 'text' className={classes.inputTextTitle}   name = "title" label="제목" />
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <textarea placeholder = "내용" onChange = {handdleTextChange} type = 'text' className={classes.inputTextContent}  name = "content"  label="내용" />
                </Paper>
            </Grid>
        </Grid>

        <div className={classes.button}>
            <Button type="button" onClick = {addNotice}  className={classes.buttonelement}  variant="outlined" color="primary" >
                    게시글 등록
            </Button>       
            <Button type="button" onClick = {() => history.push('/App/NoticeBoard')} variant="outlined" color="primary" >
                    취소
            </Button>       
        </div>
  </div>
  );
}






