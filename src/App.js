import React, { Component } from 'react'
import axios from 'axios'
import { Route } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Nav from './components/Nav/Nav'

class App extends Component {

	state = {
		loggedIn: false,
		user: null
	}

	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	logout = () => {

		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	render() {
		return (
			<div className="App">
				<Nav user={this.state.user} logout={this.logout} loggedIn={this.state.loggedIn} />
				<Route exact path="/" render={() => <Home user={this.state.user} />} />
			</div>
		)
	}
}

export default App
