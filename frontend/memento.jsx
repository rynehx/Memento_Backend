//React
var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router');


//component
var Index = require('./index.jsx');



//DOM listener
document.addEventListener('DOMContentLoaded',function(){
    console.log("memento.jsx");
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
