import React from 'react';
import PropTypes from 'prop-types';

function ListTicker({ tickers, deleteTicker }) {
  return (
    <ul>
      {tickers && tickers.length > 0 ? (
        tickers.map((info) => (
          <li
            key={info._id}
            onClick={() => deleteTicker(info._id)}
            aria-hidden="true"
          >
            <span>
              <span id="watching">
                Watching:
              </span>
              <span id="ticker-name">
                {info.ticker.toUpperCase()}
              </span>
              <span id="for">
                for
              </span>
              <span id="ticker-price">
                {` $${info.price}`}
              </span>
              <span id="selection">
                {'or '}
                {info.selection}
              </span>
            </span>
          </li>
        ))
      ) : (
        <li>No alert(s) made</li>
      )}
    </ul>
  );
}
export default ListTicker;

ListTicker.propTypes = {
  tickers: PropTypes.array.isRequired,
  deleteTicker: PropTypes.func.isRequired,
};
