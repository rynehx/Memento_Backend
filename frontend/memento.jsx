//React
var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router');


//component
var Index = require('./index.jsx');



window.addEventListener("load", function() {
    console.log("loaded");

  });


    console.log("memento.jsx");

//DOM listener
document.addEventListener('DOMContentLoaded',function(){
  window.addEventListener('message', function(msg) {
    console.log("hi");
    console.log(msg);
  },false);
  var root = document.getElementById('content');

  ReactDOM.render(
    <Index />,
    root
  );
});
