import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faQuoteLeft);

function App() {
  return (
    <div>
    <div className="display">
    <div className="quotearea">

    <div className="quotes">
    <h3><FontAwesomeIcon icon="quote-left" /> Every strike brings me closer to the next home run.</h3>
    </div>

    <div className="authors">
    <h3>-Babe Ruth</h3>
    </div>

    <div className="brands">
    <FontAwesomeIcon id="twt" icon={['fab', 'twitter']} />
    <FontAwesomeIcon id="fb" icon={['fab', 'facebook']} />
    </div>

    <div id="s"><button id="new">New Quote!</button></div>

    </div>
    </div>
    </div>
  );
}

export default App;
