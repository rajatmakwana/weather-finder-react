import React from 'react';
import Titles from './component/Titles';
import Form from './component/Form'
import Weather from './component/Weather'

const API_KEY = 'd467caaaee724d83af8f45b45cc20770';

class App extends React.Component {	

	state = {
		temprature: undefined,
		city: undefined,
		country: undefined,
		humidity: undefined,
		description: undefined,
		error: undefined
	}
	
	getWeather = async (e) => {
		e.preventDefault();

		const city = e.target.city.value;
		const country= e.target.country.value;

		const api_call =  await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
		const data = await api_call.json();
		console.log(data);
		if(city && country && data.cod === 200){
			this.setState({
				temprature: data.main.temp,
				city: data.name,
				country: data.sys.country,
				humidity: data.main.humidity,
				description: data.weather[0].description,
				error: ""
			})
		} else if( city && country && data.cod === "404"){
			this.setState({
				temprature: undefined,
				city: undefined,
				country: undefined,
				humidity: undefined,
				description: undefined,
				error: data.message
			})
		} else {
			var error
			if(!city){
				error = "Please Enter City Name.";
			} else if(!country){
				error = "Please Enter Country Name";
			}
			this.setState({
				temprature: undefined,
				city: undefined,
				country: undefined,
				humidity: undefined,
				description: undefined,
				error: error
			})
		}
	}

	render() {
		return (
		<div>
			<div className="wrapper">
				<div className="main">
					<div className="container">
						<div className="row">
							<div className="col-xs-5 title-container">
								<Titles />
							</div>
							<div className="col-xs-7 form-container">
								<Form getWeather={this.getWeather}/>	
								<Weather 
									temprature={this.state.temprature}
									city={this.state.city}
									country={this.state.country}
									humidity={this.state.humidity}
									description={this.state.description}
									error={this.state.error}
								 />						
							</div>
							<p style={{"textAlign":"center", "fontSize":"20px"}}>
							Made with <span role="img" aria-label="sheep">☁️ </span> by 
							<a target="_blank" rel="noopener noreferrer" href="https://about.me/rajatmakwana">
							{' '}Rajat Makwana</a></p>
						</div>
					</div>
				</div>
			</div>
		</div>
		);
	}
}

export default App;
