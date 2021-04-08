/* eslint-disable react-hooks/exhaustive-deps */
import React , {useState , useEffect} from 'react';
import Schedules  from './components/Schedules_chat';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'; 
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert, AlertTitle } from '@material-ui/lab';

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

  const [ loader , setLoader ] = useState(false);
  const [ noResponse , setNoResponse ] = useState(false);

  const [ namaj_time , setNamaj_time ] = useState({
    Fajr: "--",
    Dhuhr : "--",
    Asr : "--",
    Maghrib: "--",
    Isha : "--", 
    latitude: "--",
    longitude: "--",
  });


  const submit_btn = () =>{

    if( inputValue.state !=='' && inputValue.zip_code !=='' && inputValue.state !== null ){ 
      setLoader(true);

      fetch(`http://api.aladhan.com/v1/timingsByCity?city=${inputValue.zip_code}&country=${inputValue.state.country_list.country}`)
        .then(response => response.json())
        .then(res=> res.code === 200 ? 
              setNamaj_time({ 
                Fajr: res.data.timings.Fajr,
                Dhuhr : res.data.timings.Dhuhr,
                Asr : res.data.timings.Asr,
                Maghrib: res.data.timings.Maghrib,
                Isha : res.data.timings.Isha,
                latitude: res.data.meta.latitude,
                longitude: res.data.meta.longitude
              })
         :  setNoResponse(true) )
        .then(()=> setLoader(false));

      
      // fetch(`https://api.worldpostallocations.com/pincode?postalcode=${inputValue.zip_code}&countrycode=${inputValue.state.code}`)
      // .then(response => response.json())
      // .then( res => 
      //   console.log(res)
      //   // setLocation({ 
      //   //   locations_city: res.result[0].postalLocation,
      //   //   locations_division: res.result[0].state, 
      //   //   locations_country: inputValue.state.country_list.country, 
      //   // })
      // ); 
    }

    
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
          <Grid container spacing={2} className="input_field">
            <Grid item xs={12} sm={6} >
                <Autocomplete
                  onChange={(event, value) => setInputValue({ ...inputValue, state:value }) }
                  id="country_name"
                  className="selects_field"
                  options={country_array}
                  getOptionLabel={(option) => option.country_list.country}
                  getOptionSelected={(option) => option.country_list.country}
                  filterOptions={filterOptions} 
                  renderInput={(params) => <TextField {...params} label="Country Name" variant="outlined" />}
                />
            </Grid>

            <Grid item xs={12} sm={6} >
                <TextField 
                  className="selects_field" 
                  id="outlined-basic" 
                  label="Zip Code" 
                  variant="outlined"
                  onChange={(e) => setInputValue({ ...inputValue, zip_code:e.target.value })}
                />
            </Grid>
          </Grid>



          <Grid item container  style={{ "display" : "flex", "position": "relative" }} justify="space-around" alignItems="center">

            { 
              loader ?  <div className="loading">
                          <CircularProgress className="loader" />
                        </div>
                        : ''  
            }
            
            <Button onClick={submit_btn} className="search_btn" > Search Now </Button>
          </Grid>



          { 
            noResponse ?  <Alert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            The country or zip code does not match
                          </Alert> 
                        : '' 
          }
          <Schedules namaj_time={namaj_time} loader={loader}/>

      </Container>
    </>
  )
}

export default App;