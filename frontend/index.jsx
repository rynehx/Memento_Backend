//React
var React = require('react');
//Constants

var Const = require('./constants.js');






PDK.init({ appId: Const.AppId, cookie: true });

var App = React.createClass({
  getInitialState: function () {
    return { user: undefined, pins: [], boards: [], image: null, crop: null };
  },


  componentDidMount: function(){
    window.addEventListener('message', this._recieveMessage);

    PDK.me( function(me){
      this.setState({user: me.data});
    }.bind(this));


    PDK.me('boards', function(boards){
      this.setState({boards: boards.data});
    }.bind(this));

    PDK.me('pins', function(boards){
      this.setState({pins: boards.data});
    }.bind(this));

    var main = document.getElementById("main");
    main.style["height"] = window.innerHeight + "px";
    window.addEventListener('resize', function(e){
      main.style["height"] = e.currentTarget.innerHeight + "px";
    });
  },

  _recieveMessage: function(msg){
    var base_image = new Image();
    base_image.src = msg.data;
    this.setState({image: msg.data, crop: msg.crop});
    var canvas = document.getElementById('canvas');
    canvas.getContext('2d').drawImage(base_image, -msg.crop.left, -msg.crop.top);
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

			<div id="main" >


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
