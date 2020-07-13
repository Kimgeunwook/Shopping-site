// import React from 'react' ;
// import Calendar from 'react-calendar';
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// const useStyles = makeStyles({
//     calendarHeader: {
//     textAlign:'center',
//   },
// });
// export default function Calendarcomp() {
//     const [date, setDate] = React.useState(new Date());
//      const onChangeDate = (e) => {
//         setDate(e);
//         const a = e.toString().split(' ');
//         console.log(a)
//      };
//      const classes = useStyles();
//     return (
//       //   <div>
//       //   <Calendar
//       //   className={classes.calendarHeader}
//       //     onChange={onChangeDate}
//       //     value={date}
//       //   />
        
//       // </div>
//       <form className={classes.container} noValidate>
//   <TextField
//     id="date"
//     label="Birthday"
//     type="date"
//     defaultValue="2017-05-24"
//     className={classes.textField}
//     InputLabelProps={{
//       shrink: true,
//     }}
//   />
// </form>
//     )
// }

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
  const [date, setDate] = React.useState('');
  const [date2, setDate2] = React.useState('');
  const onChangeDate = (e) => {
    setDate(e.currentTarget.value);
    console.log(e.currentTarget.value)
  };
  const onChangeDate2 = (e) => {
    setDate2(e.currentTarget.value);
    console.log(e.currentTarget.value)
  };
  return (
    <div className={classes.calendarentity}>
      <TextField
        id="dateFrom"
        label="주문일(부터)"
        type="date"
        className={classes.textField}
        onChange={onChangeDate}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
              id="dateTo"
              label="주문일(까지)"
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