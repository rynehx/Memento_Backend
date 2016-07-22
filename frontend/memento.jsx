//React
var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router');


//component
var Index = require('./index.jsx');

window.addEventListener('message', function(msg) {
  console.log("hi");
  console.log(msg);
});

document.addEventListener("load", function() {
    console.log("loaded");

  });



//DOM listener
document.addEventListener('DOMContentLoaded',function(){

  var root = document.getElementById('content');

  ReactDOM.render(
    <Index />,
    root
  );
});
