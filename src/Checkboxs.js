import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';



export default function CheckboxLabels(props) {
  const [state, setState] = React.useState({
    checkedReceive: true,
    checkedNotReceive: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    props.func({ ...state, [event.target.name]: event.target.checked })
  };

  return (
    <FormGroup row>
        <FormControlLabel
        control={
          <Checkbox
            checked={state.checkedReceive}
            onChange={handleChange}
            name="checkedReceive"
            color="primary"
          />
        }
        label="수신"
      />
      <FormControlLabel
        control={<Checkbox 
            checked={state.checkedNotReceive} 
            onChange={handleChange} 
            name="checkedNotReceive" />}
        label="수신 거부"
      />
      
    </FormGroup>
  );
}
