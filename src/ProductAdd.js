import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SelectKeyword from './SelectKeyword';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height : '7vh',
  },
  optionpaper : {
    padding: theme.spacing(2),
    
    color: theme.palette.text.secondary,
    
  },
  categoryText : {
      width : '100%',
  },
  priceText:{
      width : '60%',
  },
  radio : {
      marginLeft :  theme.spacing(10),
  },
  featureTitle : {
    textAlign: 'center',
    transform: 'translate(0%, +50%)'
  },
  button : {
      marginTop : theme.spacing(6),
      textAlign : 'center',
  }
}));

export default function AutoGrid() {
  const classes = useStyles();
  const [keyword, setkeyword] = useState('')
  const keywordArr = [['top', '상의'], ['bottom','하의'], ['shoes','신발']]
  const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
   
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  const handleAddClick = () => {
    console.log('이것만')
    setInputList([...inputList, { firstName: "", lastName: "" }]);
  };
  return (
    <div className={classes.root}>
        <h1>상품 등록</h1>
     <form className={classes.form} noValidate action = "/api/product/add" method = "post">
     {/* 상품 카테고리 부분 */}
      <Grid container spacing={2}>
        <Grid item xs = {3}>
          <Paper className={classes.paper} >
             <SelectKeyword func= {setkeyword} arr= {keywordArr}  />       
          </Paper>
        </Grid>

        <Grid item xs>
          <Paper className={classes.paper}>
          <TextField className={classes.categoryText}  size = "small"id="outline-search" label="상품명" variant="outlined"/>
          </Paper>
        </Grid>
      </Grid>
      

      {/* 가격부분 */}
      <Grid container spacing={2} justify = "space-between">
        <Grid item xs ={ 3}>
          <Paper className={classes.paper}  >
              <div style={{display : 'flex',  position: 'relative', top: '50%', transform: 'translate(0%, -50%)'}}>
                  <span style={{textAlign: 'center', transform: 'translate(0%, +25%)'}}>판매 가격&nbsp;:&nbsp;</span>
                  <TextField className={classes.priceText} size = "small" id="outline-search" label="판매 가격" variant="outlined"/>
                  <span style={{textAlign: 'center', transform: 'translate(0%, +25%)'}}>&nbsp;원</span>
            </div> 
          </Paper>
        </Grid>

        <Grid item  xs ={ 3}>
          <Paper className={classes.paper}  >
              <div style={{display : 'flex',  position: 'relative', top: '50%', transform: 'translate(0%, -50%)'}}>
                  <span style={{textAlign: 'center', transform: 'translate(0%, +25%)'}}>정상 가격&nbsp;:&nbsp;</span>
                  <TextField className={classes.priceText} size = "small" id="outline-search" label="정상 가격" variant="outlined"/>
                  <span style={{textAlign: 'center', transform: 'translate(0%, +25%)'}}>&nbsp;원</span>
            </div> 
          </Paper>
        </Grid>
    
        <Grid item  xs ={ 5}>
          <Paper className={classes.paper}  >
              <div style={{display : 'flex',  position: 'relative', top: '50%', transform: 'translate(0%, -50%)'}}>
                  <span style={{textAlign: 'center', transform: 'translate(0%, +25%)'}}>최대 구매 개수&nbsp;:&nbsp;</span>
                  <TextField className={classes.priceText} size = "small" id="outline-search" label="최대 구매 개수" variant="outlined"/>
                  <span style={{textAlign: 'center', transform: 'translate(0%, +25%)'}}>&nbsp;개</span>
            </div> 
          </Paper>
        </Grid>
      </Grid>

        {/* 적립 포인트 */}
      <Grid container spacing={2}>
      <Grid item xs={2} >
          <Paper className={classes.paper} >
              <div className={classes.featureTitle}>적립 포인트</div>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>    
            <RadioGroup row aria-label="position" name="position" defaultValue="basic" >
                <FormControlLabel className={classes.radio} value="basic" control={<Radio color="primary" />} label="기본 포인트" />
                <FormControlLabel className={classes.radio} value="seperate" control={<Radio color="primary" />} label="별도 포인트" />
                <TextField className={classes.pointText} size = "small" id="outline-search" label="판매 가격의" variant="outlined"/>
                <span style={{textAlign: 'center', transform: 'translate(0%, +25%)'}}>&nbsp;%</span>
                <FormControlLabel className={classes.radio} value="notuse" control={<Radio color="primary" />} label="포인트 없음" />
            </RadioGroup>
          </Paper>
        </Grid>
      </Grid>

      {/* 상품 이미지 */}
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
              <div className={classes.featureTitle}>상품 이미지</div>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
          <TextField className={classes.categoryText}  size = "small"id="outline-search" label="상품 이미지 url" variant="outlined"/>
          </Paper>
        </Grid>
      </Grid>
      
      {/* 상품 이미지 */}
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
              <div className={classes.featureTitle}>상품 사이트 주소</div>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
          <TextField className={classes.categoryText}  size = "small"id="outline-search" label="상품 사이트 url" variant="outlined"/>
          </Paper>
        </Grid>
      </Grid>

      {/* 상품 배송비 */}
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <div className={classes.featureTitle}>배송비</div>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>    
            <RadioGroup row aria-label="position" name="position" defaultValue="basic" >
                <FormControlLabel className={classes.radio} value="basic" control={<Radio color="primary" />} label="기본 배송비" />
                <FormControlLabel className={classes.radio} value="seperate" control={<Radio color="primary" />} label="별도 배송비" />
                <TextField className={classes.pointText} size = "small" id="outline-search" label="별도 배송비" variant="outlined"/>
                <span style={{textAlign: 'center', transform: 'translate(0%, +25%)'}}>&nbsp;원</span>
                <FormControlLabel className={classes.radio} value="notuse" control={<Radio color="primary" />} label="배송비 무료" />
            </RadioGroup>
          </Paper>
        </Grid>
      </Grid>


      {/* 상품 특성 */}
      <Grid container spacing={2}>
        <Grid item xs={2}>
        <Paper className={classes.paper}>
            <div className={classes.featureTitle}>상품 특성</div>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
          <FormGroup aria-label="position" row>
                <FormControlLabel value="newProduct"control={<Checkbox color="primary" />} label="New" />
                <FormControlLabel value="bestProduct"control={<Checkbox color="primary" />} label="Best" />
                <FormControlLabel value="saleProduct"control={<Checkbox color="primary" />} label="할인" />
          </FormGroup>
          </Paper>
        </Grid>
      </Grid>

      {/* 상품 정보 */}
      <Grid container spacing={2}>
        <Grid item xs={2}>
        <Paper className={classes.paper}>
            <div className={classes.featureTitle}>상품 정보</div>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.optionpaper}>
              
          {inputList.map((x, i) => {
         return (
            <div className="box">
              <input
                name="firstName"
     placeholder="Enter First Name"
                value={x.firstName}
                onChange={e => handleInputChange(e, i)}
              />
              <input
                className="ml10"
                name="lastName"
     placeholder="Enter Last Name"
                value={x.lastName}
                onChange={e => handleInputChange(e, i)}
              />
              <span className="btn-box">
                {inputList.length !== 1 && <button
                  className="mr10"
                  onClick={() => handleRemoveClick(i)}>Remove</button>}
                {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
              </span>
            </div>
          );
      })}
       <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={2}>
        <Paper className={classes.paper}>
            <div className={classes.featureTitle}>옵션</div>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.optionpaper}>xs</Paper>
        </Grid>
      </Grid>
     <div className={classes.button}>
      <Button type="submit" variant="outlined" color="primary" >
            상품 저장
     </Button>
     </div>
      </form>
    </div>
  );
}
