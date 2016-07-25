//React
var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router');


//component
var Index = require('./index.jsx');





//DOM listener
document.addEventListener('DOMContentLoaded',function(){



  var root = document.getElementById('content');

  ReactDOM.render(
    <Index />,
    root
  );
});
