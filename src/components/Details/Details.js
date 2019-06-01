import React, { Component } from 'react';
import DetailsGraph from './DetailsGraph';
import './Details.css';
import api from './api';

class Details extends Component {
  coin = this.props.coin;

  state = {
    data: [],
    title: '',
    fill: ''
  };

  get30DayHistoryData(coin) {
    api.get30DayData(coin).then(histData => {
      this.setState({
        data: histData,
        title: '30 Day Price Chart',
        fill: '#00cf77'
      });
    });
  }

  get1HourHistoryData(coin) {
    api.get1HourData(coin).then(histData => {
      this.setState({
        data: histData,
        title: 'Current Hour Price Chart',
        fill: '#01d9ff'
      });
    });
  }

  get1DayHistoryData(coin) {
    api.get1DayData(coin).then(histData => {
      this.setState({
        data: histData,
        title: 'Current Day Price Chart',
        fill: '#ffaa00'
      });
    });
  }

  handleGraphChange(freq) {
    if (freq === '1d') {
      this.get1DayHistoryData(this.coin);
    } else if (freq === '1h') {
      this.get1HourHistoryData(this.coin);
    } else {
      this.get30DayHistoryData(this.coin);
    }
  }

  componentDidMount() {
    this.get30DayHistoryData(this.coin);
  }

  render() {
    return (
      <div className="Details">
        <div className="Title">
          <h1>
            {this.coin} {this.state.title}
          </h1>
        </div>
        <div className="tabs">
          <button
            type="button"
            onClick={() => this.handleGraphChange('1h')}
            style={{ backgroundColor: '#01d9ff' }}
          >
            1 hour
          </button>
          <button
            type="button"
            onClick={() => this.handleGraphChange('1d')}
            style={{ backgroundColor: '#ffaa00' }}
          >
            1 day
          </button>
          <button
            type="button"
            onClick={() => this.handleGraphChange('1m')}
            style={{ backgroundColor: '#00cf77' }}
          >
            1 month
          </button>
        </div>
        <DetailsGraph data={this.state.data} fill={this.state.fill} />
        <div className="footer" />
      </div>
    );
  }
}

export default Details;
