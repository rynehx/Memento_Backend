//React
var React = require('react');
//Constants

var Const = require('./constants.js');


PDK.init({ appId: Const.AppId, cookie: true });






function fbUpload(token,canvas){
  //token is pinterest access token
  //canvas is the canvas element to be uploaded, it will be converted to blob

		var dataURL = canvas.toDataURL('image/jpeg', 1.0);
	  var blob = dataURItoBlob(dataURL);
	  var formData = new FormData();
	  formData.append('access_token', token);
	  formData.append('source', blob);

	  var xhr = new XMLHttpRequest();
	  xhr.open( 'POST', 'https://api.pinterest.com/v1/pins/', true );
	  xhr.onload = xhr.onerror = function() {
	    console.log( xhr.responseText );
  	};
  	xhr.send( formData );
	}

function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) { ia[i] = byteString.charCodeAt(i); }
  return new Blob([ab], { type: 'image/jpeg' });
}


var App = React.createClass({
  getInitialState: function () {
    return { posts: [] };
  },

  _login: function(){
    PDK.login({ scope : Const.PIN_SCOPE },  function(s){
     console.log(s);
   });
  },

  _getSession: function(s){
    console.log(PDK.getSession());

  },

  _pin: function(){
    // PDK.request('/pins/', 'POST', {
    //         board: 104427353798834220,
    //         note: "this is my song",
    //         link: "www.bravaudio.com",
    //         image: ""
    //     }, function(e){
    //       console.log(e)
    //     });

				var tokenn = "";

				var ccanvas = document.getElementById("canvas");
				var ctx = ccanvas.getContext("2d");
				var uploadButton = document.getElementById("upload");
				var img = new Image();

				img.crossOrigin = 'Anonymous';
				img.src = "http://lorempixel.com/300/300/cats/";
				img.onload = function(){ ctx.drawImage(img, 0, 0); };


					fbUpload(tokenn,ccanvas);






  },

  _boards: function(){
      PDK.me('boards', { fields: Const.BOARD_FIELDS }, function(s){
        console.log(s);
      });
  },

  _converter: function(){
    var bob = multipartFormData("data:image/gif;base64,R0lGODlhCwAOAMQfAP////7+/vj4+Hh4eHd3d/v7+/Dw8HV1dfLy8ubm5vX19e3t7fr 6+nl5edra2nZ2dnx8fMHBwYODg/b29np6eujo6JGRkeHh4eTk5LCwsN3d3dfX 13Jycp2dnevr6////yH5BAEAAB8ALAAAAAALAA4AAAVq4NFw1DNAX/o9imAsB tKpxKRd1+YEWUoIiUoiEWEAApIDMLGoRCyWiKThenkwDgeGMiggDLEXQkDoTh CKNLpQDgjeAsY7MHgECgx8YR8oHwNHfwADBACGh4EDA4iGAYAEBAcQIg0DkgcEIQA7");
    console.log(bob);
  },

  _pins: function(){
      PDK.me('pins', { fields: Const.PIN_FIELDS }, function(s){
        console.log(s);
      });
  },

  _logout: function(){
    PDK.logout();
  },

  render: function(){
    return (
      <div className = "background">
        Hello, Hello, Baby I can't hear a thing.
				<canvas id = "canvas"></canvas>
        <div className = "button login" onClick = {this._login}>Log In</div>
        <div className = "button view" onClick = {this._getSession}>Get Session</div>
        <div className = "button view" onClick = {this._pin}>Pin shark</div>
        <div className = "button view" onClick = {this._converter}>converter</div>
        <div className = "button view" onClick = {this._pins}>pins</div>
        <div className = "button view" onClick = {this._boards}>boards</div>
        <div className = "button view" onClick = {this._logout}>Logout</div>

      </div>
    );
  }
});

module.exports = App;
