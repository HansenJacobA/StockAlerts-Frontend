/* eslint-disable no-undef */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-alert */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const axios = require('axios');

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: '',
      price: '',
      selection: 'above',
      user: '',
    };
    this.addTicker = this.addTicker.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
  }

  handleChange(e) {
    const { name } = e.target;
    this.setState({
      [name]: e.target.value,
    });
  }

  handleSelection(event) {
    this.setState({
      selection: event.target.value,
    });
  }

  addTicker() {
    const { getTickers, tickers } = this.props;
    if (tickers.length >= 5) {
      alert('No more than 5 alerts at a time.');
    } else {
      const input = this.state;
      axios.post('/api/tickers/', input)
        .then((result) => {
          if (result.data.error) {
            alert(result.data.error);
          } else {
            getTickers();
            this.setState({
              ticker: '',
              price: '',
              selection: 'above',
              user: '',
            });
          }
        })
        .catch((err) => console.log(err));
    }
  }

  render() {
    const { selection } = this.state;
    return (
      <div>
        <input
          type="text"
          name="ticker"
          onChange={this.handleChange}
          placeholder="ticker"
        />
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
          placeholder="price"
        />
        <br />
        <br />
        <select id="dropdown" value={selection} onChange={this.handleSelection}>
          <option default value="above" type="button">Alert Above</option>
          <option value="below" type="button">Alert Below</option>
        </select>
        <br />
        <br />
        <button onClick={this.addTicker} type="button">Add Alert</button>
      </div>
    );
  }
}

export default Input;

Input.propTypes = {
  getTickers: PropTypes.func.isRequired,
  tickers: PropTypes.array.isRequired,
};
