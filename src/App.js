import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faQuoteLeft, faSpinner, faClipboard } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery';
library.add(fab, faQuoteLeft, faSpinner, faClipboard);


function App() {
  //INITIALIZE VARIABLES
  const [copy,setcopy] = useState("");
  var i = -1;
  const quoteRef = useRef(null);
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

  //RANDOM QUOTE API
  function randomQuote() {
    $.ajax({
        url: "https://api.forismatic.com/api/1.0/?",
        dataType: "jsonp",
        data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
        //BACKGROUND CYCLING
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
          setcopy("");
        },
        //SHOW QUOTE
        success: function (quoteData) {
            if (quoteData.quoteAuthor === '') {
                quoteData.quoteAuthor = 'Unknown';
            };
            $("#API").html(" " + quoteData.quoteText);
            $("#API2").html(quoteData.quoteAuthor);
            $("#twitterBtn").attr("href", 'https://twitter.com/intent/tweet?text=' + `"${quoteData.quoteText}"
                                                                                      - ${quoteData.quoteAuthor}`);
            //COPY QUOTE
            $("#fb").click(function(){
            $("#invis").val(`${quoteData.quoteText}
                                                        - ${quoteData.quoteAuthor}`);
              quoteRef.current.select();
              document.execCommand('copy');
              setcopy("Copied to Clipboard!");
            });
        },

        //BACKGROUND CYCLING
        complete: function(){
            i += 1;
          document.getElementById('display').style.backgroundImage = backgroundList[i];
          document.getElementById('display').style.opacity = "1";
        }
    });
};

//EXECUTE API ON LOAD
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

    <div id="a" className="authors">
    <h3>-<span id="API2"></span></h3>
    </div>

    <div className="brands">
    <a id="twitterBtn" href='# ' target="_blank">
    <FontAwesomeIcon id="twt" icon={['fab', 'twitter']} />
    </a>
    <FontAwesomeIcon  id="fb" icon="clipboard"/><span id="copy">{copy}</span>
    </div>

    <div id="s"><button id="new" onClick={randomQuote}>New Quote!</button></div>

    </div>
    </div>

    <form>
        <textarea
          id="invis"
          ref={quoteRef}
          value=""
        />
    </form>

    </div>
  );
}

export default App;
