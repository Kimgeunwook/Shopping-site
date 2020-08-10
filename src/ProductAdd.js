import React, {useState, useEffect} from 'react';
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
import axios from 'axios';
import { ListItemText } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor : '#f5f5f5',
    color: theme.palette.text.secondary,
    height : '7vh',
  },
  optionpaper : {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    backgroundColor : '#f5f5f5',
    
  },
  categoryText : {
      width : '100%',
      backgroundColor : 'white'
  },
  priceText  :{
      width : '60%',      
      backgroundColor : 'white'
  },
  pointText :{
    backgroundColor : 'white'
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
  },
  info : {
    marginRight :theme.spacing(2),
    marginBottom : theme.spacing(3),
    backgroundColor : 'white',
    width : '35%', 
  },
  infoOption  :{
    marginRight :theme.spacing(2),
    marginBottom : theme.spacing(3),
    backgroundColor : 'white',
    width : '15%', 
  },
  infoOptionbtn:{
    marginRight :theme.spacing(2),
    marginBottom : theme.spacing(3),
  },
  infoOptionbtn:{
    marginRight :theme.spacing(2),
    marginBottom : theme.spacing(3),
  },
}));

export default function ProductAdd(props) {
  const classes = useStyles();
  const [keyword, setkeyword] = useState('')
  const keywordArr = [['top', '상의'], ['bottom','하의'], ['shoes','신발']]
  const [inputList, setInputList] = useState([{ info: "", description: "" }]);
  const [inputListOption, setInputListOption] = useState([{ optionName: "", optionDetail: [{detail:"", stock : "", price :""}] }]);
  const [reserveMethod, setreserveMethod] = useState('')
  const [shippingMethod, setshippingMethod] = useState('')
  const [checkFeature, setcheckFeature] = useState([{"newProduct" : false, "bestProduct" : false, "saleProduct" : false}])
  const [hiddenFlag , sethiddenFlag] = useState(false)//true = 상세보기 화면  false = 등록화면
  const [modifyMode, setmodifyMode] = useState(false)
  const [productObject, setproductObject] = useState()
  useEffect( () => {
    
    if(props.object == undefined)
     {
      sethiddenFlag(false); 
    }
    else {
      sethiddenFlag(true);
      setproductObject(props.object[0])
    }
  },[])
  const handdleModify = async () =>{
    let isHost;
    await axios.get(`/api/product/getAuth?productId=${props.object[0]._id}`)
        .then(response => {
          if(response.data == true) isHost = true;
          else isHost = false;
        })    
    {isHost ? sethiddenFlag(false) : alert('상품의 주인이 아닙니다.') }
    setmodifyMode(true)
  }

  const putModify = async () => {
    await axios({
      method: 'put',
      url: '/api/product/update',
      data: {
        productObject
      }
    }).then(function (response) {
      window.location = "/App/ProductCheck"
    });
  }

  const handdleTextChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setproductObject(productObject => ({
      ...productObject,
      [name]: value
  }));
  };
    
  const handleCheckbox = (e) => {
    const list = [...checkFeature];
    list[0][e.target.value] = !checkFeature[0][e.target.value];
    setcheckFeature(list);
  };

  const handlereserveMethod = (e) => {
    const value = e.target.value
    setreserveMethod(value)
    setproductObject(productObject => ({
      ...productObject,
      ["reserveMethod"]: value
  }));
  }
  const handleFee = (e) => {
    const value = e.target.value
    setshippingMethod(value)
    setproductObject(productObject => ({
      ...productObject,
      ["shippingMethod"]: value
  }));
  }
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
    console.log(inputList)
    setInputList([...inputList, { info: "", description: "" }]);
  };
  const handlemodiAddClick = () => {
    setproductObject({
      ...productObject,
      information : productObject.information.concat({info : "", description : ""})
    })
  };
  const handlemodiRemoveClick = index => {
    const list = [...productObject.information];
    list.splice(index, 1);
    setproductObject({
      ...productObject,
      information : list
    })
  };
  const handlemodiInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...productObject.information];
    list[index][name] = value;
    setproductObject({
      ...productObject,
      information : list
    })
  };
   ///////////////////옵션관련
   const addOption = () => {
     if(!hiddenFlag && !modifyMode)
     {
        setInputListOption([...inputListOption, { optionName: "",  optionDetail: [{detail:"", stock : "", price :""}]}]);
     }
     if(hiddenFlag || !hiddenFlag && modifyMode)
     {
      setproductObject({
        ...productObject,
        option : productObject.option.concat({name : "", detail : "", price : "", stock : ""})
      })
     }
  }
  const deleteOption = (index, flag) => {
    if(flag == 1)
    {
      const list = [...inputListOption];
      if(list.length != 1) 
      {
        list.splice(index, 1);
      }
      setInputListOption(list);
    }
    else
    {
      const list = [...productObject.option];
      if(list.length != 1)
      {
        const initname = list[index].name
        let cnt = 0;
        for(let i = 0 ; i < list.length; i++) if(initname == list[i].name) cnt++;
        list.splice(index, cnt);
        setproductObject({
          ...productObject,
          option : list
        })
      }
      
    }
  }
  const handleInputChangeOption = (e, index, j) => {
    console.log('여긱여이기@@@@@@')
    const { name, value } = e.target;
    if(name == 'optionName')
    {
      const list = [...inputListOption];
      list[index][name] = value;
      setInputListOption(list);
    }
    else if( name == 'detailName')
    {
      const list = [...inputListOption];
      list[index]['optionDetail'][j]['detail'] = value;
      setInputListOption(list);
    }
    else if( name == 'lastNameone')
    {
      const list = [...inputListOption];
      list[index]['optionDetail'][j]['stock'] = value;
      setInputListOption(list);
    }
    else{
      const list = [...inputListOption];
      list[index]['optionDetail'][j]['price'] = value;
      setInputListOption(list);
    }
  };

  const handleInputChangeOption2 = (e, index) => {
    const { name, value } = e.target;
    const list = [...productObject.option];
    list[index][name] = value;
      setproductObject({
        ...productObject,
        option : list
      })
  };
  // handle click event of the Remove button
  const handleAddClickOption = (i, j, flag) => {
    if(flag == 1)
    {
      const list = [...inputListOption];
      list[i]['optionDetail'].push({detail: "", stock : "", price :""})
      setInputListOption(list);
    }
    else
    {
      const length = productObject.option.length - i
      let list = productObject.option.slice(0,i + 1)
      .concat({name :productObject.option[i].name , detail : "", price : "", stock : ""})
      .concat(productObject.option.slice(i + 1, i + 1 + length))
      setproductObject({
        ...productObject,
        option : list
      })
    }
   
  };
  ///////////////////
  const removeOptionItem = (i, j, flag) => {
    if(flag == 1)
    {
      const list = [...inputListOption];
      list[i]['optionDetail'].splice(j, 1);
      setInputListOption(list);
    }
    else
    {
      const list = [...productObject.option];
      list.splice(i, 1);
      setproductObject({
        ...productObject,
        option : list
      })
    }
    
  }


  return (
    <div className={classes.root}>
        <h1>{hiddenFlag ? "상품 수정" : "상품 등록"}</h1>
     <form className={classes.form} noValidate action = "/api/product/add" method = "post">
     {/* 상품 카테고리 부분 */}
      <Grid container spacing={2}>
        <Grid item xs = {2}>
          <Paper className={classes.paper} >
          {hiddenFlag? props.object[0].category : 
                <>
                  <SelectKeyword  value = {keyword} func= {setkeyword} arr= {keywordArr} disable = {hiddenFlag? true : false} />       
                  <TextField style ={{display : 'none'}} name = 'category'  value = {keyword}/>
              </>
           }
          </Paper>
        </Grid>

        <Grid item xs>
          <Paper className={classes.paper}>
          <TextField onChange ={handdleTextChange} className={classes.categoryText} disabled = {hiddenFlag? true : false} value = {hiddenFlag ? productObject.name : undefined} name = "name" size = "small"id="outline-search" label="상품명" variant="outlined"/>
          </Paper>
        </Grid>
      </Grid>
      

      {/* 가격부분 */}
      <Grid container spacing={2} justify = "space-between">
        <Grid item xs ={ 6}>
          <Paper className={classes.paper}  >
              <div style={{display : 'flex',  position: 'relative', top: '50%', transform: 'translate(0%, -50%)'}}>
                  <span style={{textAlign: 'center', transform: 'translate(0%, +25%)'}}>판매 가격&nbsp;:&nbsp;</span>
                  <TextField onChange ={handdleTextChange} className={classes.priceText} disabled = {hiddenFlag ? true : false} value = {hiddenFlag? productObject.price : undefined} name = 'price' size = "small" id="outline-search" label="판매 가격" variant="outlined"/>
                  <span style={{textAlign: 'center', transform: 'translate(0%, +25%)'}}>&nbsp;원</span>
            </div> 
          </Paper>
        </Grid>

        <Grid item  xs ={ 6}>
          <Paper className={classes.paper}  >
              <div style={{display : 'flex',  position: 'relative', top: '50%', transform: 'translate(0%, -50%)'}}>
                  <span style={{textAlign: 'center', transform: 'translate(0%, +25%)'}}>정상 가격&nbsp;:&nbsp;</span>
                  <TextField onChange ={handdleTextChange} className={classes.priceText} disabled = {hiddenFlag? true : false} value = {hiddenFlag ? productObject.price : undefined} name = 'productBasicPrice' size = "small" id="outline-search" label="정상 가격" variant="outlined"/>
                  <span style={{textAlign: 'center', transform: 'translate(0%, +25%)'}}>&nbsp;원</span>
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
            <RadioGroup row aria-label="position" name="reserveMethod"  value = {hiddenFlag ? productObject.reserveMethod : reserveMethod} onChange = {handlereserveMethod} >
                <FormControlLabel className={classes.radio} disabled = {hiddenFlag ? true : false}  value="basic" control={<Radio color="primary" />} label="기본 포인트" />
                <FormControlLabel className={classes.radio} disabled = {hiddenFlag ? true : false}  value="seperate" control={<Radio color="primary" />} label="별도 포인트" />
                <TextField onChange ={handdleTextChange} className={classes.pointText} name = "reserveFee" disabled = {hiddenFlag ? true : false} value = {hiddenFlag ? productObject.reserveFee : undefined}  size = "small" id="outline-search" label="판매 가격의" variant="outlined"/>
                <span style={{textAlign: 'center', transform: 'translate(0%, +25%)'}}>&nbsp;%</span>
                <FormControlLabel className={classes.radio}  disabled = {hiddenFlag ? true : false}  value="notuse" control={<Radio color="primary" />} label="포인트 없음" />
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
          <TextField onChange ={handdleTextChange} className={classes.categoryText} disabled = {hiddenFlag ? true : false} value = {hiddenFlag ? productObject.image : undefined} name = 'image' size = "small"id="outline-search" label="상품 이미지 url" variant="outlined"/>
          </Paper>
        </Grid>
      </Grid>
      
      {/* 상품 사이트 */}
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
              <div className={classes.featureTitle}>상품 사이트 주소</div>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
          <TextField onChange ={handdleTextChange} className={classes.categoryText} disabled = {hiddenFlag ? true : false} value = {hiddenFlag ? productObject.site : undefined} name = 'site' size = "small"id="outline-search" label="상품 사이트 url" variant="outlined"/>
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
            <RadioGroup row aria-label="position" name="shippingMethod" value = {hiddenFlag ? productObject.shippingMethod : shippingMethod} onChange = {handleFee} >
                <FormControlLabel className={classes.radio} disabled = {hiddenFlag ? true : false}  value="basic" control={<Radio color="primary" />} label="기본 배송비" />
                <FormControlLabel className={classes.radio} disabled = {hiddenFlag ? true : false}  value="seperate" control={<Radio color="primary" />} label="별도 배송비" />
                <TextField onChange ={handdleTextChange}  className={classes.pointText} disabled = {hiddenFlag ? true : false} value = {hiddenFlag ? productObject.shippingFee : undefined}  name ="shippingFee"  size = "small" id="outline-search" label="별도 배송비" variant="outlined"/>
                 <span style={{textAlign: 'center', transform: 'translate(0%, +25%)'}}>&nbsp;원</span>
                <FormControlLabel className={classes.radio} disabled = {hiddenFlag ? true : false}  value="notuse" control={<Radio color="primary" />} label="배송비 무료" />
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
          <FormGroup aria-label="position" row >
                <FormControlLabel name = "newProduct"  value = "newProduct"  onChange={handleCheckbox} checked = {hiddenFlag && props.object[0].feature.indexOf("newProduct") != -1 ? true : checkFeature[0]["newProduct"]} disabled = {hiddenFlag ? true : false} control={<Checkbox color="primary" />} label="New" />
                <FormControlLabel name = "bestProduct" value = "bestProduct" onChange={handleCheckbox} checked = {hiddenFlag && props.object[0].feature.indexOf("bestProduct") != -1 ? true : checkFeature[0]["bestProduct"]} disabled = {hiddenFlag ? true : false} control={<Checkbox color="primary" />} label="Best" />
                <FormControlLabel name = "saleProduct" value = "saleProduct" onChange={handleCheckbox} checked = {hiddenFlag && props.object[0].feature.indexOf("saleProduct") != -1 ? true : checkFeature[0]["saleProduct"]} disabled = {hiddenFlag ? true : false}  control={<Checkbox color="primary" />} label="할인" />
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
              
          {
          (!hiddenFlag && !modifyMode) &&
          inputList.map((x, i) => {
            return (
                <div >
                    <TextField name="info" size = "small" className={classes.info} value = {x.info} onChange={e => handleInputChange(e, i)} label="상품 정보 항목" variant="outlined"/>
                    <TextField name="description" size = "small" className={classes.info} value = {x.description} onChange={e => handleInputChange(e, i)} label="설명" variant="outlined"/>
                    <span >
                        {inputList.length - 1 === i && 
                            <Button variant="contained" color="primary" className={classes.infoOptionbtn}   onClick={handleAddClick}>
                                Add
                            </Button>}
                        {inputList.length !== 1 && 
                            <Button variant="contained" color="primary" className={classes.infoOptionbtn}  onClick={() => handleRemoveClick(i)}>
                                Remove
                            </Button>}
                        
                    </span>
                </div>
              );
          })}
          
          {
           (hiddenFlag || !hiddenFlag && modifyMode)  &&
          productObject.information.map((x, i) => {
            return (
                <div >
                    <TextField name="info" size = "small" disabled = {!modifyMode ? true : false}  className={classes.info} value = {x.info} onChange={e => handlemodiInputChange(e, i)} label="상품 정보 항목" variant="outlined"/>
                    <TextField name="description" size = "small" disabled = {!modifyMode ? true : false}  className={classes.info} value = {x.description} onChange={e => handlemodiInputChange(e, i)} label="설명" variant="outlined"/>
                    <span >
                        {productObject.information.length - 1 === i && 
                            <Button variant="contained" color="primary" className={classes.infoOptionbtn}   onClick={handlemodiAddClick}>
                                Add
                            </Button>}
                        {productObject.information.length !== 1 && 
                            <Button variant="contained" color="primary" className={classes.infoOptionbtn}  onClick={() => handlemodiRemoveClick(i)}>
                                Remove
                            </Button>}
                        
                    </span>
                </div>
              );
          })}
          
       {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
          </Paper>
        </Grid>
      </Grid>


      {/* 옵션 */}
      <Grid container spacing={2}>
        <Grid item xs={2}>
        <Paper className={classes.paper}>
            <div className={classes.featureTitle}>옵션</div>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.optionpaper}>
            <div>
              
              
            </div>
            <Button type="submit" variant="outlined" className={classes.infoOptionbtn}  color="primary" type = 'button'onClick = {addOption}>
                      추가 
              </Button>
          {
          (!hiddenFlag && !modifyMode) &&
          inputListOption.map((x, i) => {
            return (
                  <div >
                      {inputListOption[i]['optionDetail'].map((y, j)=> {
                        return (
                          <>
                          <div>
                          {j == 0 &&
                                  <> 
                                  <Button variant="contained"  color="primary" className={classes.infoOptionbtn}  onClick={() => deleteOption(i, 1)}>
                                      옵션 삭제
                                  </Button>
                                  <TextField name="optionName" size = "small" className={classes.infoOption} value = {x.optionName} onChange={e => handleInputChangeOption(e, i)} label="옵션명" variant="outlined"/>
                                  </>}

                          {j != 0 &&
                                  <> 
                                  <Button variant="contained" style = {{visibility : 'hidden'}}  color="primary" className={classes.infoOptionbtn}  onClick={() => deleteOption(i)}>
                                      옵션 삭제
                                  </Button>
                                  <TextField name="optionName" size = "small"  style = {{visibility : 'hidden'}} className={classes.infoOption} value = {x.optionName} onChange={e => handleInputChangeOption(e, i)} label="옵션명" variant="outlined"/>
                                  </>}
                          
                          <TextField name="detailName"  size = "small" className={classes.infoOption} value = {y.description} onChange={e => handleInputChangeOption(e, i, j)} label="디테일 옵션" variant="outlined"/>
                          <TextField name="lastNameone"  size = "small" className={classes.infoOption} value = {y.description} onChange={e => handleInputChangeOption(e, i, j)} label="추가가격" variant="outlined"/>
                          <TextField name="lastNametwo"  size = "small" className={classes.infoOption} value = {y.price} onChange={e => handleInputChangeOption(e, i, j)} label="재고" variant="outlined"/>
                          <span >
                          {inputListOption[i]['optionDetail'].length - 1 === j && 
                              <Button variant="contained" color="primary" className={classes.infoOptionbtn}   onClick={() => handleAddClickOption(i, j,1)}>
                                  Add
                              </Button>}
                          {inputListOption[i]['optionDetail'].length !== 1 && 
                              <Button variant="contained" color="primary" className={classes.infoOptionbtn}  onClick={() => removeOptionItem(i,j,1)}>
                                  Remove
                              </Button>}
                            </span>
                          </div>
                         
                      </>
                        )
                      } )}
                      
                  </div>
                );
            })}

            {
           (hiddenFlag || !hiddenFlag && modifyMode)  &&
          productObject.option.map((x, i) => {
            return (
                      <div>
                      {(i == 0 || x.name != productObject.option[i - 1].name ) &&
                              <> 
                              <Button variant="contained" disabled = {!modifyMode ? true : false}  color="primary" className={classes.infoOptionbtn}  onClick={() => deleteOption(i, 2)}>
                                  옵션 삭제
                              </Button>
                              <TextField name="name" size = "small" disabled = {!modifyMode ? true : false} className={classes.infoOption} value = {x.name} onChange={e => handleInputChangeOption2(e, i)} label="옵션명" variant="outlined"/>
                              </>}

                      {(i != 0 && x.name == productObject.option[i - 1].name ) &&
                              <> 
                              <Button variant="contained" style = {{visibility : 'hidden'}}  color="primary" className={classes.infoOptionbtn}  onClick={() => deleteOption(i,2)}>
                                  옵션 삭제
                              </Button>
                              <TextField name="name" size = "small"  style = {{visibility : 'hidden'}} className={classes.infoOption} value = {x.name} onChange={e => handleInputChangeOption2(e, i)} label="옵션명" variant="outlined"/>
                              </>}
                      
                      <TextField name="detail"  size = "small" disabled = {!modifyMode ? true : false} className={classes.infoOption} value = {x.detail} onChange={e => handleInputChangeOption2(e, i)} label="디테일 옵션" variant="outlined"/>
                      <TextField name="price"  size = "small" disabled = {!modifyMode ? true : false} className={classes.infoOption} value = {x.price} onChange={e => handleInputChangeOption2(e, i)} label="추가가격" variant="outlined"/>
                      <TextField name="stock"  size = "small" disabled = {!modifyMode ? true : false} className={classes.infoOption} value = {x.stock} onChange={e => handleInputChangeOption2(e, i)} label="재고" variant="outlined"/>
                      <span >
                      {(productObject.option.length - 1 === i || x.name != productObject.option[i + 1].name )&& 
                          <Button variant="contained" disabled = {!modifyMode ? true : false} color="primary" className={classes.infoOptionbtn}   onClick={() => handleAddClickOption(i, 1, 2)}>
                              Add
                          </Button>}
                      {productObject.option.length !== 1 && 
                          <Button variant="contained" disabled = {!modifyMode ? true : false} color="primary" className={classes.infoOptionbtn}  onClick={() => removeOptionItem(i,1,2)}>
                              Remove
                          </Button>}
                        </span>
                      </div>
                     
                  );
                })}
          </Paper>
          
        </Grid>
      </Grid>
      {
            (!hiddenFlag && !modifyMode)// 상품등록
                && 
            <div className={classes.button}>
                <Button type="submit"  variant="outlined" color="primary" >
                        상품 저장
                </Button>       
            </div>
      }
      </form>
      {
            hiddenFlag  // 상품 상세보기
                && 
            <div className={classes.button}>
                <Button type="button" variant="outlined" color="primary" onClick={handdleModify}>
                      상품 수정
                </Button>
            </div>
      }
      {
            (!hiddenFlag && modifyMode) // 상품 상세보기
                && 
            <div className={classes.button}>
                <Button type="button" variant="outlined" color="primary" onClick={putModify}>
                      상품 업데이트
                </Button>
            </div>
      }
    </div>
  );
}