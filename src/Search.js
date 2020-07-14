import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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

export default function CenteredGrid() {
  const classes = useStyles();

  return (
    // justify="flex-end"
    <div className={classes.root}>
      <Grid container spacing={0} >
        <Grid item xs={5}  className={classes.leftcomp}>
        <Calendar />
        </Grid>
        
        <Grid item xs={2} className={classes.rightcomp}>
        <SelectKeyword />  
        </Grid>

        <Grid item xs={2} className={classes.rightcomp}>
            <form className={classes.textroot} noValidate autoComplete="off">
                <TextField id="outline-search" label="search" variant="outlined" />
            </form>
        </Grid>
        <Grid item xs={2} className={classes.buttoncomp}>
        <Button variant="contained" color="primary">
            검색
        </Button>
        </Grid>
      </Grid>
    </div>
  );
}