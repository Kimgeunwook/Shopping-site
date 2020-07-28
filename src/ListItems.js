import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
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
              <Typography className={classes.AccordionDetail}>
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
              </Typography>
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
              <Typography className={classes.AccordionDetail}>
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
              </Typography>
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
              <Typography className={classes.AccordionDetail}>
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
              </Typography>
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
              <Typography className={classes.heading}>통계</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.AccordionDetail}>
              <ListItem button 
              onClick = {() => history.push('/App/Reports')}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                통계1
              </ListItem>

              <ListItem button
              onClick = {() => history.push('/App/Integrations')}>
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                통계2
              </ListItem>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        {/* //////////////////// */}



        {/* //////////////////// */}
        <ListItem button
        onClick = {() => history.push('/App/Integrations')}
        >
            게시판
        </ListItem>
  </div>
  );
}
