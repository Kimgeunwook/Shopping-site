import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import { mainListItems, secondaryListItems } from './listItems';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItems from './ListItems';
import Chart from './Chart';
import Deposits from './Deposits';
import ProductAdd from './ProductAdd';
import Orders from './Orders';
import {Route, Redirect} from 'react-router-dom';
import SignInSide from './SignInSide';
import Customers from './Customers';
import ProductCheck from './ProductCheck';
import axios from 'axios';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    
    marginRight: 36,
  },
  menuButtonHidden: {
    
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function App({match}) {
  // URL에서 APP다음 오는애가 누군지 알아내는 부분
  const {categoryname} = match.params
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  
  return (
    
    <div className={classes.root}>
      
      <Route path ="/sign" component = {SignInSide} exact />
      
      <CssBaseline /> 

      {/* 상단 메뉴바 부분 */}
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          {/* IconButton == 닫힌상태에서 펼치는 버튼 == 햄버거*/}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          {/* 제목부분 */}
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {categoryname}
          </Typography>
          <IconButton color="inherit">
            {/* badge == 알림개수 , notificationsicon == 종모양 */}
            <Badge badgeContent={3} color="secondary">
              <NotificationsIcon />
            </Badge>
          
          </IconButton>
          
          
        </Toolbar>
      </AppBar>
      
      {/* Drawer == 옆에 메뉴바 */}
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          {/* ChevronLeft == 닫힘버튼 */}
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><ListItems/></List>
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>

      {/* 실제로 컨텐츠 부분 */}
      <main className={classes.content} >

        {/* appbarspacer == 툴바 자리 남겨두고 내용 보여주게 하는거  */}
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container} >
          <Grid container spacing={3} >
            <Grid item xs={12}  >
              <Paper className={classes.paper} >
                {/* {categoryname === "HOME"  && <Home /> } */}
                {categoryname === "Orders"  && <Orders />}
                {categoryname === "Customers"  && <Customers />}
                {categoryname === "ProductAdd"  && <ProductAdd/>}
                {categoryname === "Integrations"  && <Deposits />}
                {categoryname === "ProductCheck"  && <ProductCheck />}
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}