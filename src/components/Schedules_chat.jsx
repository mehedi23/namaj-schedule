import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';








const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#82bd1d",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories) {
  return { name, calories };
}

const useStyles = makeStyles({
  table: {
    minWidth: '100%',
  },
});











function Schedules_chat(props) { 
    console.log(props)

    const rows = [
        createData('Fajr', props.namaj_time.Fajr ),
        createData('Dhuhr', props.namaj_time.Dhuhr ),
        createData('Asr', props.namaj_time.Asr ),
        createData('Maghrib', props.namaj_time.Maghrib ),
        createData('Isha', props.namaj_time.Isha )
    ];



    const classes = useStyles()

    return (
        <div className="the_schedules_chart">
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">

                    <TableHead>
                        <TableRow>
                            <StyledTableCell> Name The Namaz</StyledTableCell>
                            <StyledTableCell align="right">Time</StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.calories}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <div className="location">
              {
                props.namaj_time.locations_city === "" || props.namaj_time.locations_division === "" || props.namaj_time.locations_country === "" ? 
                <> 
                  <LocationOnOutlinedIcon/>
                  <span> Select Your Country with zip code </span>  
                </> : 
                <> 
                  <LocationOnOutlinedIcon/>
                  <span> {props.namaj_time.locations_city } </span> ,
                  <span> {props.namaj_time.locations_division } </span> ,
                  <span> {props.namaj_time.locations_country} </span>  
                </>
              }
              
            </div>
        </div>
    )
}

export default Schedules_chat
