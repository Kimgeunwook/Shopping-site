import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop : theme.spacing(5),
    marginBottom : theme.spacing(5),
  },
  paper: {
    marginRight: theme.spacing(5),
  },
  buttonList : {
    marginRight : theme.spacing(5),
  }
}));

export default function MenuListComposition() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <MenuList>
          <Button className={classes.buttonList}>주문 확인 전</Button>
          <Button className={classes.buttonList}>주문 확인</Button>
          <Button className={classes.buttonList}>배송 준비 중</Button>
          <Button className={classes.buttonList}>배송 중</Button>
          <Button className={classes.buttonList}>배송 완료</Button>
          <Button className={classes.buttonList}>주문 모두 보기</Button>
        </MenuList>
      </Paper>
      
    </div>
  );
}
