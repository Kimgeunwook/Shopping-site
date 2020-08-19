import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  AccordionDetail : {
    fontSize: theme.typography.pxToRem(12),
    
  },
}));

export default function ListItems() {
  const history = useHistory();
  const classes = useStyles();
  return (
      <div>
        {/* //////////HOME////////// */}
        <div className={classes.root} >
            <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
            <Typography className={classes.heading}>HOME</Typography>
                
              
            </AccordionSummary>
            <AccordionDetails>
              <div className={classes.AccordionDetail}>
              <ListItem button 
              onClick = {() => history.push('/App/HOME')}>
                 <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon> 
                HOME1
              </ListItem>

              <ListItem button
              onClick = {() => history.push('/App/Orders')}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                HOME2
              </ListItem>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        {/* //////////////////// */}

        {/* /////////주문관리/////////// */}
        <div className={classes.root} >
            <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>회원관리</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={classes.AccordionDetail}>
              <ListItem button 
              onClick = {() => history.push('/App/HOME')}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                회원관리1
              </ListItem>

              <ListItem button
              onClick = {() => history.push('/App/Customers')}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                회원관리2
              </ListItem>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        {/* //////////////////// */}

        {/* //////////회원관리////////// */}
        <div className={classes.root} >
            <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>주문관리</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={classes.AccordionDetail}>
              <ListItem button 
              onClick = {() => history.push('/App/HOME')}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                주문관리1
              </ListItem>

              <ListItem button
              onClick = {() => history.push('/App/Orders')}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                주문관리2
              </ListItem>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        {/* //////////////////// */}


        {/* //////////통계////////// */}
        <div className={classes.root} >
            <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>상품</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={classes.AccordionDetail}>
              <ListItem button 
              onClick = {() => history.push('/App/ProductAdd')}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                상품 등록
              </ListItem>

              <ListItem button
              onClick = {() => history.push('/App/ProductCheck')}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                상품 조회
              </ListItem>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
        {/* //////////////////// */}



        {/* //////////////////// */}
        <ListItem button
        onClick = {() => history.push('/App/NoticeBoard')}
        >
            게시판
        </ListItem>
  </div>
  );
}
