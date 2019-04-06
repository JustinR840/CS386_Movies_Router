import React, {Component} from 'react';
import './App.css';

import {Route, Link} from 'react-router-dom';
import axios from './ConfigAxios'
import Table from './Table.js';




const Home = () => (<h2>Home</h2>);


const locations_titles = ['Theater', 'Address', 'City', 'State', 'Zip Code'];
const locations_attributes = ['theaterName', 'address', 'cityName', 'state', 'zipCode'];

const generateTheatersLinks = (props) =>
{
	const { data } = props;
	console.log(data);

	data.map((v, idx) => <li key={idx}><Link to="/">{v["theaterName"]}</Link></li>)
};

const Theaters = (props) => (
	<div>
		<h2>Theater Locations</h2>
		{<Table titles={locations_titles} attributes={locations_attributes} data={props.data !== '' ? JSON.parse(props.data) : [{}]}/>}

		<div>
			<h3>Theaters</h3>
			<ol>
				{/*{props.data !== '' ? generateTheatersLinks({data: props.data}) : generateTheatersLinks({data: [{}]})}*/}
				{props.data !== '' ? props.data.map((v, idx) => <li key={idx}><Link to="/">{v["theaterName"]}</Link></li>) : generateTheatersLinks({data: [{}]})}
			</ol>
		</div>
	</div>
);


const movies_titles = ['Title', 'Genre', 'Director', 'Description', 'smallImageURL', 'smallImageURL'];
const movies_attributes = ['movieTitle', 'genre', 'director', 'description', 'smallImageURL', 'smallImageURL']; // TODO: smallImageURL repeated twice, latter needs to be largeImageURL

const AllMovies = (props) => (
	<div>
		<h2>All Movies</h2>
		{<Table titles={movies_titles} attributes={movies_attributes} data={props.data !== '' ? JSON.parse(props.data) : [{}]}/>}
	</div>
);


const CompSci = () => (<h2>Computer Science</h2>);
const Chemistry = () => (<h2>Chemistry</h2>);
const Math = () => (<h2>Mathematics</h2>);


const Departments = ({match}) => (
	<div>
		<h2>Departments</h2>
		<ol>
			<li><Link to={`${match.url}/cs`}>Computer Science</Link></li>
			<li><Link to={`${match.url}/chemistry`}>Chemistry</Link></li>
			<li><Link to={`${match.url}/math`}>Mathematics</Link></li>
		</ol>

		<Route exact path={`${match.url}/cs`} component={CompSci}/>
		<Route exact path="/departments/chemistry" component={Chemistry}/>
		<Route exact path="/departments/math" component={Math}/>
	</div>
);

class App extends Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			movies: '',
			theaters: ''
		};
	}


	componentDidMount ()
	{
		axios.get('movies/').then(result => this.setState({movies: JSON.stringify(result.data)}));
		axios.get('theaters/').then(result => this.setState({theaters: JSON.stringify(result.data)}));
	}


	render ()
	{
		return (
			<div className="App">
				<ol>
					<li><Link to="/">Home</Link></li>
					<li><Link to="theaters">Theaters</Link></li>
					{/*<li><Link to="departments">Departments</Link></li>*/}
					<li><Link to="movies">All Movies</Link></li>
				</ol>

				<Route exact path="/" component={Home}/>
				<Route path="/theaters" render={(props) => <Theaters {...props} data={this.state.theaters}/>}/>
				<Route path="/movies" render={(props) => <AllMovies {...props} data={this.state.movies}/>}/>
			</div>
		);
	}
}

export default App;
