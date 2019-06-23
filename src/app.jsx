import React, { Component } from 'react';
import axios from 'axios';
import TopSpot from './topspot';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topspots: [],
      userLoc: ''
    };
  }

  componentWillMount() {
    axios
      .get('https://origin-top-spots-api.herokuapp.com/api/topspots')
      .then(response => response.data)
      .then(topspots => this.setState({ topspots }));
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        userLoc: { latitude: position.coords.latitude, longitude: position.coords.longitude }
      });
    });
  }
  
  render() {
    return (
      <div className='container-fluid' style={{ background: '#ff08a0', background: '-webkit-radial-gradient(#ffffff,#ffffff,#ffffff,#ffffff,#ffffff,#ffffff,#ffffff,#f7c8d8,#f7c8d8,#a6caea,#55cdfc)', background: 'radial-gradient(#ffffff,#ffffff,#ffffff,#ffffff,#ffffff,#ffffff,#ffffff,#f7c8d8,#f7c8d8,#a6caea,#55cdfc)' }}>
        <div style={{ borderRadius: '6px', background: '#ff08a0', background: '-webkit-linear-gradient(to bottom, #55cdfc,#f7a8b8,#ffffff,#f7a8b8,#55cdfc)', background: 'linear-gradient(to bottom, #55cdfc,#f7a8b8,#ffffff,#f7a8b8,#55cdfc)' }}>
          <div className='row'>
            <div className='col-sm-12'>
              <div className='well well-lg'>
                <h1>San Diego Top Spots</h1>
                <p className='lead'>A list of the top 30 places to see in San Diego, California.</p>
              </div>
            </div>
          </div>
          {this.state.topspots.map(topspot => (
            <TopSpot
              key={topspot.id}
              name={topspot.name}
              description={topspot.description}
              location={topspot.location}
              userLoc={this.state.userLoc} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
