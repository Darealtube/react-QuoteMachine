import React, { useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft, faSpinner } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery';
library.add(fab, faQuoteLeft, faSpinner);


function App() {
  var i = -1;
  var backgroundList = [
    "linear-gradient(85deg, #17255A, #CE6550)",
    "linear-gradient(85deg, #2a9d8f, #e76f51)",
    "linear-gradient(85deg, #a8dadc, #1d3557)",
    "linear-gradient(85deg, #ffb4a2, #b5838d)",
    "linear-gradient(85deg, #003049, #d62828)",
    "linear-gradient(85deg, #ffb5a7, #fec89a)",
    "linear-gradient(85deg, #ef476f, #118ab2)",
    "linear-gradient(85deg, #7400b8, #4ea8de)",
    "linear-gradient(85deg, #14213d, #e5e5e5)",
    "linear-gradient(85deg, #606c38, #bc6c25)",
    "linear-gradient(85deg, #007f5f, #dddf00)"
  ];

  function randomQuote() {
    $.ajax({
        url: "https://api.forismatic.com/api/1.0/?",
        dataType: "jsonp",
        data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
        beforeSend: function(){
          if(i === 10){
            i = -1;
          }
          document.getElementById('display').style.backgroundImage = backgroundList[i];
          document.getElementById('display').style.position = "absolute";
          document.getElementById('display').style.top = "0";
          document.getElementById('display').style.right = "0";
          document.getElementById('display').style.bottom = "0";
          document.getElementById('display').style.left = "0";
          document.getElementById('display').style.zIndex = "-1";
          document.getElementById('display').style.transition = "opacity 2s linear";
          document.getElementById('display').style.opacity = "0";
        },
        success: function (quoteData) {
            if (quoteData.quoteAuthor === '') {
                quoteData.quoteAuthor = 'Unknown';
            };
            $("#API").html(" " + quoteData.quoteText);
            $("#API2").html(quoteData.quoteAuthor);
        },
        complete: function(){
            i += 1;
          document.getElementById('display').style.backgroundImage = backgroundList[i];
          document.getElementById('display').style.opacity = "1";
        }
    });
};

useEffect(()=>{
  randomQuote();
},[]);

  return (
    <div>
    <div id="display" className="display">
    <div className="quotearea">

    <div className="quotes">
    <h3><FontAwesomeIcon icon="quote-left" /><span id="API"></span></h3>
    </div>

    <div className="authors">
    <h3>-<span id="API2"></span></h3>
    </div>

    <div className="brands">
    <FontAwesomeIcon id="twt" icon={['fab', 'twitter']} />
    <FontAwesomeIcon id="fb" icon={['fab', 'facebook']} />
    </div>

    <div id="s"><button id="new" onClick={randomQuote}>New Quote!</button></div>

    </div>
    </div>
    </div>
  );
}

export default App;
