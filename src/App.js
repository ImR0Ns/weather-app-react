import logo from './logo.svg';
import './App.css';
import React from "react";




class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      submit: '',
      dataW: [],
      city: ''
    }
    this.getInp = this.getInp.bind(this)
    this.setSub = this.setSub.bind(this)
  }

  getInp(event){
    this.setState({
      input: event.target.value
    })
  }
  setSub() {
    this.setState({
      submit: this.state.input
    })
  }

  componentDidMount() {
    fetch('https://www.metaweather.com/api/location/44418/')
        .then((result)=>result.json())
        .then((data)=>{
          console.log(data)
            this.setState({
              dataW: data.consolidated_weather,
              city: data.title
            })
        })

  }
  componentDidUpdate(prevProps, prevState) {
    if(prevState.submit != this.state.submit) { 
     /*  console.log('https://www.metaweather.com/api/location/'+ this.state.submit +'/') */
      fetch('https://www.metaweather.com/api/location/'+ this.state.submit +'/')
        .then((result)=>result.json())
        .then((data)=>{
            this.setState({
              dataW: data.consolidated_weather,
              city: data.title
            })
        }).catch((err)=>{
          if(err) { window.location.reload(); }
        })
    }
  }

  render(){
    
    var resForCities = this.state.dataW.map(el =>{
            
            const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            var check_day = el.applicable_date.split('-')
            var create_date = new Date(check_day[1] +'/'+check_day[2]+'/'+check_day[0])
            var final_res = weekday[create_date.getDay()]
            
            return (<div>
              <div className='container'>
              <h2>{el.applicable_date}</h2>
              <img className='icon_images' src={"https://www.metaweather.com/static/img/weather/"+el.weather_state_abbr+".svg"} alt="da" />
              <h3>Current temperature: {el.the_temp.toFixed(2)} °C</h3>
              <h3>Maximum temperature: {el.max_temp.toFixed(2)} °C</h3>
              <h3>Minimum temperature: {el.min_temp.toFixed(2)} °C</h3>
            </div><h3 className='for_days'>{final_res}</h3>
            </div>)
          })
    
    return (
    <div>
      <div className='for_check'>
        <h1>Search country</h1>
        <a href="https://www.findmecity.com/" target="_blank">Find here id</a><br />
        <input type="text" onChange={this.getInp} placeholder="woeid id" /> 
        <button onClick={this.setSub}>Search</button>
      </div>
      <h1>For {this.state.city}</h1>
      <div className='to_dis'> {resForCities} </div>
    </div>)
  }

}

export default App;
