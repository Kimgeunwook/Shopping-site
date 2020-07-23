import React, {useState } from 'react';
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
    marginLeft : theme.spacing(5),
    border : 1,
    
  },
  paper: {
    marginRight: theme.spacing(5),
    border : 1,
  },
  buttonList : {
    marginRight : theme.spacing(5),
    border : 1,
    width : '7rem'
  }
}));
export default function MenuListComposition(props) {
  const classes = useStyles();
  const setFilt = (e) => {
    props.func(e.currentTarget.value)
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <MenuList>
          <Button className={classes.buttonList} value = {"주문 확인 전"} onClick = {setFilt}>주문 확인 전</Button>
          <Button className={classes.buttonList} value = {"주문 확인"} onClick = {setFilt}>주문 확인</Button>
          <Button className={classes.buttonList} value = {"배송 준비 중"} onClick = {setFilt}>배송 준비 중</Button>
          <Button className={classes.buttonList} value = {"배송중"} onClick = {setFilt}>배송중</Button>
          <Button className={classes.buttonList} value = {"배송 완료"} onClick = {setFilt}>배송 완료</Button>
          <Button className={classes.buttonList} value = {"주문 모두 보기"} onClick = {setFilt}>주문 모두 보기</Button>
        </MenuList>
      </Paper>
      
    </div>
  );
}
