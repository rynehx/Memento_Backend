//React
var React = require('react');
//Constants

var Const = require('./constants.js');


PDK.init({ appId: Const.AppId, cookie: true });




window.addEventListener('message', function(msg) {
  // Check to make sure that this message came from the correct domain.
  console.log(msg);
});



var App = React.createClass({
  getInitialState: function () {
    return { user: undefined, pins: [], boards: [] };
  },


  componentDidMount: function(){

    PDK.me( function(me){
      this.setState({user: me.data});
    }.bind(this));


    PDK.me('boards', function(boards){
      this.setState({boards: boards.data});
    }.bind(this));

    PDK.me('pins', function(boards){
      this.setState({pins: boards.data});
    }.bind(this));


  },

  _login: function(){
    PDK.login({ scope : Const.PIN_SCOPE },  function(s){
   });
  },

  _getSession: function(s){
    console.log(PDK.getSession());

  },

  _pin: function(){

		PDK.request('/pins/',
		 'POST',
		 {
        board: 104427353798834220,
        note: "this is my song",
        link: "www.bravaudio.com",

      	},
			function(e){
	      console.log(e);
	    });

  },

  _boards: function(){
      PDK.me('boards', { fields: Const.BOARD_FIELDS }, function(s){
        console.log(s);
      });
  },

  _converter: function(){
		var ccanvas = document.getElementById("canvas");
		var ctx = ccanvas.getContext("2d");
		ctx.canvas.width  = 400;
		ctx.canvas.height = 200;

			ctx.arc(Math.random()*200+100, 100, 50, 0, 2*Math.PI);
			ctx.fillStyle = 'red';
			ctx.fill();
  },

  _pins: function(){
      PDK.me('pins', { fields: Const.PIN_FIELDS }, function(s){
        console.log(s);
      });
  },

  _logout: function(){
    PDK.logout();
  },

  showBoards: function(){
    if(this.state.user){
      return this.state.boards.map(function(board){
        return <li key = {board.id} className = "board-item">
          {board.name}
        </li>;
      });
    }else{
      return <div/>;
    }
  },

  render: function(){
    return (

			<div className = "main">


				<div className = "contents">
          <div className = "content-left">
            	<canvas id = "canvas"></canvas>
          </div>

          <div className = "content-right">
            <ul className = "board-list">
              {this.showBoards()}
            </ul>
          </div>

          <div className = "button-container">
            <div className = "button login" onClick = {this._login}>Log In</div>
            <div className = "button view" onClick = {this._getSession}>Get Session</div>
            <div className = "button view" onClick = {this._pin}>Pin shark</div>
            <div className = "button view" onClick = {this._converter}>converter</div>
            <div className = "button view" onClick = {this._pins}>pins</div>
            <div className = "button view" onClick = {this._boards}>boards</div>
            <div className = "button view" onClick = {this._logout}>Logout</div>
          </div>

				</div>

        <div className = "background"></div>
			</div>
    );
  }
});

module.exports = App;
