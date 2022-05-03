import React, { Component } from 'react';
import Input from './Input';
import ListTicker from './ListTicker';

const axios = require('axios');

class Ticker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickers: [],
    };
    this.getTickers = this.getTickers.bind(this);
    this.deleteTicker = this.deleteTicker.bind(this);
  }

  componentDidMount() {
    this.getTickers();
  }

  getTickers() {
    axios.get('/api/tickers')
      .then((res) => {
        if (res.data) {
          this.setState({
            tickers: res.data,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  deleteTicker(id) {
    axios.delete(`/api/tickers/${id}`)
      .then((res) => {
        if (res.data) {
          this.getTickers();
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { tickers } = this.state;
    return (
      <div id="main">
        <h1>Ticker Alerts</h1>
        <h4>Set and forget</h4>
        <Input getTickers={this.getTickers} />
        <ListTicker tickers={tickers} deleteTicker={this.deleteTicker} />
      </div>
    );
  }
}

export default Ticker;
