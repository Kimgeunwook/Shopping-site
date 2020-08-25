import React from 'react';
import clsx from 'clsx';
import {useHistory} from 'react-router-dom';
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
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItems from './ListItems';
import ModifyUserInfo from './ModifyUserInfo';
import NoticeBoard from './NoticeBoard';
import NoticeAdd from './NoticeAdd';
import ProductAdd from './ProductAdd';
import Orders from './Orders';
import {Route,} from 'react-router-dom';
import SignInSide from './SignInSide';
import Customers from './Customers';
import ProductCheck from './ProductCheck';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NoticeDetail from './NoticeDetail';

//화면 밑에 copyright하면서 나오는 문구 컴포넌트
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


//material ui 사용하는부분 (=css같은 역할)
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
  const history = useHistory();
  const {categoryname} = match.params //브라우저에서 www.사이트이름/App/abc 이렇게 입력하면 match.params에 abc가 들어온다
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  
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
          
          {/* history.push() 인자 안에 있는 상대경로로 이동 */}
          <IconButton color="inherit" onClick = {() => history.push('/App/ModifyUserInfo')}> 
              <AccountCircleIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      
      {/* Drawer == 옆에 메뉴바 */}
      <Drawer
        variant="permanent"
        classes={{
          //clsx = 조건에 따라 클래스명을 줄수 있는 npm 모듈
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
                {/* url 에서 App/{컴포넌트이름} 에 따라 어떤 컴포넌트를 띄워주는지 결정하는 부분 */}
                {categoryname === "ModifyUserInfo"  && <ModifyUserInfo />}
                {categoryname === "Orders"  && <Orders />}
                {categoryname === "Customers"  && <Customers />}
                {categoryname === "ProductAdd"  && <ProductAdd/>}
                {categoryname === "NoticeBoard"  && <NoticeBoard />}
                {categoryname === "ProductCheck"  && <ProductCheck />}
                {categoryname === "NoticeAdd" && <NoticeAdd />}
                {categoryname === "NoticeDetail" && <NoticeDetail />}
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