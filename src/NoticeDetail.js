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
  
}));

export default function NoticeDetail() {
  const classes = useStyles();
  const history = useHistory();
  console.log('aaa')
//   console.log(match.params)
//   const {noticeId} = match.params
//   console.log(noticeId)
  return (
    <React.Fragment >      
    <Title >상세보기</Title>
      
      
    </React.Fragment>
  );
}






