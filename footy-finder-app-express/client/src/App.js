import React from 'react';
import './App.css';
import axios from 'axios'
import ReactDOM from 'react-dom';

class App extends React.Component {
	state = {
    name: '',
		address: '',
		latitude: '',
		longitude: '',
    image: '',
		parks: []
	};

	//This function changes the state of the objects listen above
	handleChange = event => {
		this.setState({
			//the square brackets dynamically updates the objects property
			[event.target.id]: event.target.value
		});
	};

	//This function is what executes when we hit submit
	handleSubmit = event => {
		event.preventDefault();
		axios.post('/parks', this.state).then(response => {
			this.setState({
        parks: response.data,
        name: '',
        address: '',
        latitude: '',
        longitude: '',
        image: ''
			});
		});
	};

	deletePark = event => {
		axios.delete('/parks/' + event.target.value).then(response => {
			this.setState({
				parks: response.data
			});
		});
	};

	updatePark = event => {
		event.preventDefault();
		const id = event.target.id;
		axios.put('/parks/' + id, this.state).then(response => {
			this.setState({
				products: response.data,
				item: '',
				price: '',
				quantity: '',
				image: ''
			});
		});
    };

	//this function renders the info from the database onto the webpage on load
	componentDidMount = () => {
		axios.get('/parks').then(response => {
			this.setState({
				parks: response.data
			});
		});
    };

	render = () => {
		return (
			<div className ="container">
				<div>
					<h2>Parks</h2>
					<div className='new-park-form'>
						<form onSubmit={this.handleSubmit}>
							<div>
								<label htmlFor='name'>
									Name
								</label>
								<input
									type='text'
									id='name'
									onChange={this.handleChange}
									value={this.state.name}
								/>
							</div>

							<div>
								<label htmlFor='address'>
									Address
								</label>
								<input
									type='text'
									id='address'
									onChange={this.handleChange}
									value={this.state.address}
								/>
							</div>

							<div>
								<label htmlFor='latitude'>
									Latitude
								</label>
								<input
									type='text'
									id='latitude'
									onChange={this.handleChange}
									value={this.state.latitude}
								/>
							</div>

              <div>
								<label htmlFor='longitude'>
									Longitude
								</label>
								<input
									type='text'
									id='longitude'
									onChange={this.handleChange}
									value={this.state.longitude}
								/>
							</div>

							<div>
								<label htmlFor='image'>
									Image
								</label>
								<input
									type='text'
									id='image'
									onChange={this.handleChange}
									value={this.state.image}
								/>
							</div>

							<input
								type='submit'
								value='Add a Park'
							/>
						</form>
					</div>
				</div>
				<div className='parkContainer'>
					{this.state.parks.map(park => {
						return (
							<div className='parkCard' key={park._id}>
								{park.name} <br />
                                Address: {park.address} <br />
								<img src={park.image} alt={park.name} /> <br />
								<details>
									<summary>Update this Park</summary>
									<form id={park._id} onSubmit={this.updatePark}>

										<label htmlFor='name'>Name</label>
										<br />
										<input type='text' id='name' onChange={this.handleChange} />
										<br />

										<label htmlFor='address'>Address</label>
										<br />
										<input
											type='text'
											id='address'
											onChange={this.handleChange}
										/>
										<br />

										<label htmlFor='latitude'>Latitude</label>
										<br />
										<input type='text' id='latitude' onChange={this.handleChange} />
										<br />

                    <label htmlFor='longitude'>Longitude</label>
										<br />
										<input type='text' id='longitude' onChange={this.handleChange} />
										<br />

										<label htmlFor='image'>Image</label>
										<br />
										<input
											type='text'
											id='image'
											onChange={this.handleChange}
										/>
										<br />
										<input
											className='submit'
											type='submit'
											value='Update Park'
										/>
									</form>
                                    <button value={park._id} onClick={this.deletePark}>
									Delete Park
								</button>
								</details>
							</div>
						);
					})}
				</div>
			</div>
		);
	};
}

// ReactDOM.render(<App></App>, document.querySelector('main'));

export default App
