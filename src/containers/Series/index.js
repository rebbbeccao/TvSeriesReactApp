import React, { Component } from 'react';
import SeriesList from '../../components/SeriesList';
import Loader from '../../components/Loader';
import Intro from '../../components/Intro';

class Series extends Component {
  state = {
    series: [],
    seriesName: '',
    isFetching: false
  };

  componentDidMount() {}

  onSeriesInputChange = event => {
    this.setState({ seriesName: event.target.value, isFetching: true });
    fetch(`http://api.tvmaze.com/search/shows?q=${event.target.value}`)
      .then(response => response.json())
      .then(json => this.setState({ series: json, isFetching: false }));
    // console.log(event);
    // console.log(event.target.value);
  };

  render() {
    const { series, seriesName, isFetching } = this.state;
    return (
      <div>
        <Intro message="Here you can find all of your most loved series" />
        <div>
          <input
            value={seriesName}
            type="text"
            onChange={this.onSeriesInputChange}
          />
        </div>
        {!isFetching &&
          series.length === 0 &&
          seriesName.trim() === '' && (
            <p>Please enter Series Name into the input</p>
          )}
        {!isFetching &&
          series.length === 0 &&
          seriesName.trim() !== '' && (
            <p>No TV Series have been found with this name</p>
          )}
        {isFetching && <Loader />}
        {!isFetching && <SeriesList list={this.state.series} />}
      </div>
    );
  }
}

export default Series;
