var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require('WeatherMessage');
var openWeatherMap = require('openWeatherMap');

var Weather = React.createClass({
  getInitialState: function() {
    return {
      isLoading: false
    }
  },
  handleSearch: function(location) {
    this.setState({isLoading: true});
    var that = this;
    openWeatherMap.getTemp(location).then(function(temp) {
      that.setState({
        location: location,
        temp: temp,
        isLoading: false
      });
    }, function(errorMessage) {
      this.setState({isLoading: false});
      alert(errorMessage);
    });
  },
  render: function() {
    var {isLoading, location, temp} = this.state;

    function renderMessage() {
        if (isLoading) {
          return <h3>Loading...</h3>;
        } else if (location && temp) {
          return <WeatherMessage location={location} temp={temp} />;
        }
    }
    return (
      <div>
        <h3>Get Weather</h3>
        <WeatherForm onSearch={this.handleSearch} />
        {renderMessage()}
      </div>
    )
  }
});

module.exports = Weather;
