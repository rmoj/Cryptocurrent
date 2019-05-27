import React from 'react'

const Home = props => {
	return (
		<div className="Home">
			<p>Current User:</p>
			<code>
				{JSON.stringify(props)}
			</code>
		</div>
	)
}

export default Home
