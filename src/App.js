/* eslint-disable react-hooks/exhaustive-deps */
import React , {useState , useEffect} from 'react';
import Schedules  from './components/Schedules_chat';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'; 
import Button from '@material-ui/core/Button';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';

import './App.css'


const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option) => option.country_list.country,
});


function App() {

  const [ inputValue , setInputValue ] = useState({
    state:'',
    zip_code: ''
  });

  const [ namaj_time , setNamaj_time ] = useState({
    Fajr: "--",
    Dhuhr : "--",
    Asr : "--",
    Maghrib: "--",
    Isha : "--",
    locations_city: "",
    locations_division: "", 
    locations_country: "",
  });

  const [ match , setMatch ] = useState(true)

  const submit_btn = () =>{

    console.log(inputValue)
    
    setNamaj_time({
      Fajr: "--",
      Dhuhr : "--",
      Asr : "--",
      Maghrib: "--",
      Isha : "--",
      locations_city: "",
      locations_division: "", 
      locations_country: "",
    });
    setMatch(true);

    if( inputValue.state !=='' && inputValue.zip_code !=='' && inputValue.state !== null ){ 
      fetch(`http://api.aladhan.com/v1/timingsByCity?city=${inputValue.zip_code}&country=${inputValue.state.country_list.country}`)
        .then(response => response.json())
        .then(res=> res.code == 200 ? 
              setNamaj_time({
                Fajr: res.data.timings.Fajr,
                Dhuhr : res.data.timings.Dhuhr,
                Asr : res.data.timings.Asr,
                Maghrib: res.data.timings.Maghrib,
                Isha : res.data.timings.Isha,
                locations_city: "",
                locations_division: "", 
                locations_country: "",
              })
         : console.log(res) );
    }else{
      console.log("ok")
    };
  };

  const country_array = [];

  useEffect(()=>{
    fetch('https://api.first.org/data/v1/countries?limit=300')
      .then(response => response.json())
      .then(countriesData => 
        Object.keys(countriesData.data).forEach(code => { 
          const country_list = countriesData.data[code] 
          const country_info = {code , country_list}
          country_array.push(country_info)
        }))
    
  },[country_array]);
  



  return (
    <>
      <h1 className="header"> Get Salath Schedules By Searching Location </h1>


      <Container maxWidth="md">
          <div className="input_field">
            <Grid style={{ "display" : "flex" , "marginBottom" : "30px" }} justify="space-around" alignItems="center">
                <Autocomplete
                  onChange={(event, value) => setInputValue({ ...inputValue, state:value }) }
                  id="country_name"
                  className="selects_field"
                  options={country_array}
                  getOptionLabel={(option) => option.country_list.country}
                  filterOptions={filterOptions} 
                  renderInput={(params) => <TextField {...params} label="Country Name" variant="outlined" />}
                />

                <TextField 
                  className="selects_field" 
                  id="outlined-basic" 
                  label="Zip Code" 
                  variant="outlined"
                  onChange={(e) => setInputValue({ ...inputValue, zip_code:e.target.value })}
                />
            </Grid>
          </div>

          <Grid style={{ "display" : "flex" }} justify="space-around" alignItems="center">
            <Button onClick={submit_btn} className="search_btn" > Search Now </Button>
          </Grid>

          { match ? '' : 
            <p className="warning"> <WarningRoundedIcon/> The country and zip code are not match </p>
          }

          <Schedules namaj_time={namaj_time}/>

      </Container>
    </>
  )
}

export default App;