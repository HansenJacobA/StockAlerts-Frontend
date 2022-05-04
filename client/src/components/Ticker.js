/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
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
    this.getPulse = this.getPulse.bind(this);
  }

  componentDidMount() {
    this.getTickers();
    this.getPulse();
  }

  getPulse() {
    const id = setInterval(() => {
      axios.get('/api/pulse')
        .then((res) => {
          if (res.data.alert) {
            alert(res.data.message);
            axios.post('/api/resetpulse')
              .then()
              .catch((err) => { console.log(err); });
            clearInterval(id);
            this.getTickers();
            this.getPulse();
          }
        })
        .catch((err) => console.log(err));
    }, 5000);
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
        <Input getTickers={this.getTickers} tickers={tickers} />
        <ListTicker tickers={tickers} deleteTicker={this.deleteTicker} />
      </div>
    );
  }
}

export default Ticker;
