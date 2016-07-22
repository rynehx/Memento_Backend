//React
var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router');


//component
var Index = require('./index.jsx');





//DOM listener
document.addEventListener('DOMContentLoaded',function(){


  var  receiveMessage = function(msg) {
    // Check to make sure that this message came from the correct domain.
    console.log(msg);

    var img = document.getElementById('image');
    img.src = msg.data.data;

  };


  window.addEventListener('message', receiveMessage);


  var root = document.getElementById('content');

  ReactDOM.render(
    <Index />,
    root
  );
});
