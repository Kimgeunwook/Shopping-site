import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  calendarentity : {
    marginTop : theme.spacing(3),
  }
});

function DatePickers(props) {
  const { classes } = props;
  const onChangeDate = (e) => {
    props.fromfunc(e.currentTarget.value);
  };
  const onChangeDate2 = (e) => {
    props.tofunc(e.currentTarget.value);
  };
  return (
    <div className={classes.calendarentity}>
      <TextField
        id="dateFrom"
        label="일(부터)"
        type="date"
        className={classes.textField}
        onChange={onChangeDate}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
              id="dateTo"
              label="일(까지)"
              type="date"
              className={classes.textField}
              onChange={onChangeDate2}
              InputLabelProps={{
                shrink: true,
              }}
            />
    </div>
  );
}

DatePickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DatePickers);