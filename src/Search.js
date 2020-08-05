import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Calendar from './Calendar';
import SelectKeyword from './SelectKeyword'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginTop : theme.spacing(3),
  },
  leftcomp : {
      marginLeft : theme.spacing(5),
  },
  rightcomp : {
      marginTop : theme.spacing(2),
      marginLeft : theme.spacing(1),
  },
  textroot : {
    '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
  },
  buttoncomp : {
    marginLeft : theme.spacing(2),
    marginTop : theme.spacing(4)
  }
}));


// function btnClick(){
//     // const fetchUsers = async () => {
//     //   try{
//     //      const response = await Axios.get('/api/books');
//     //      console.log(response.data)
//     //   }catch (e){
//     //       console.log(e)
//     //   }
//     // }
//     // fetchUsers();
  
// }

export default function CenteredGrid(props) {
  const classes = useStyles();
  const [searchKeyword, setsearchKeyword] = useState('')
  useEffect(() => { 
    props.func(searchKeyword)
  },[searchKeyword])
  const textChange = (event) => {
    props.func2(event.target.value)
  };
  const btnClick = (event) => {
    props.btnfunc()
  }
  return (
    // justify="flex-end"
    <div className={classes.root}>
      <Grid container spacing={0} justify = 'center' >
        <Grid item xs={5}  className={classes.leftcomp}>
             <Calendar />
        </Grid>
        
        <Grid item xs={2} className={classes.rightcomp} >
        <SelectKeyword func = {setsearchKeyword} arr = {props.arr}/>  
        </Grid>

        <Grid item xs={2} className={classes.rightcomp}>
            <form className={classes.textroot} noValidate autoComplete="off">
                <TextField id="outline-search" label="search" variant="outlined" onChange = {textChange} />
            </form>
        </Grid>
        <Grid item xs={2} className={classes.buttoncomp}>
        <Button variant="contained" color="primary" onClick={btnClick}>
            검색
        </Button>
        </Grid>
      </Grid>
    </div>
  );
}