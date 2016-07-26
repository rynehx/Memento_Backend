//React
var React = require('react');
//Constants

var Const = require('./constants.js');



PDK.init({ appId: Const.AppId, cookie: true });

var App = React.createClass({
  getInitialState: function () {
    return { user: undefined, pins: [], boards: [], image: null, crop: null, link: "", description: "" };
  },


  componentDidMount: function(){
    window.addEventListener('message', this._recieveMessage);

    PDK.me( function(me){
      this.setState({user: me.data});
    }.bind(this));


    PDK.me('boards', function(boards){
      this.setState({boards: boards.data});
    }.bind(this));

    // PDK.me('pins', function(boards){
    //   this.setState({pins: boards.data});
    // }.bind(this));

    var main = document.getElementById("main");
    main.style["height"] = window.innerHeight + "px";
    window.addEventListener('resize', function(e){
      main.style["height"] = e.currentTarget.innerHeight + "px";
    });
  },

  _recieveMessage: function(msg){
    console.log(msg);
    this.setState({image: msg.data.data, crop: msg.data.crop});
    var base_image = new Image();
    base_image.src = msg.data.data;



    var canvas = document.createElement("canvas");
    canvas.width =  ( parseInt(msg.data.crop.width) / msg.data.crop.windowWidth) * (base_image.width);
    canvas.height = (parseInt(msg.data.crop.height) / msg.data.crop.windowHeight) * (base_image.height);



    canvas.getContext('2d').drawImage(base_image,
      0-parseInt((parseInt(msg.data.crop.left) / msg.data.crop.windowWidth)*base_image.width),
      0-parseInt((parseInt(msg.data.crop.top) / msg.data.crop.windowHeight)*base_image.height)
    );
    //document.getElementsByClassName('content-right')[0].appendChild(canvas);
    var croped = canvas.toDataURL("image/jpeg", 1.0);
    console.log(croped.length);
    this.setState({image: croped});
    document.getElementById('image').src = croped;

  },

  _login: function(){
    PDK.login({ scope : Const.PIN_SCOPE },  function(res){

      if(res.session.accessToken){
        PDK.me( function(me){
          this.setState({user: me.data});
        }.bind(this));

        PDK.me('boards', function(boards){
          this.setState({boards: boards.data});
        }.bind(this));
      }




   }.bind(this));
  },


  _pin: function(board){

    if(this.state.image){
      console.log(board.id, this.state.description, this.state.link, this.state.image)
      PDK.request('/pins/',
       'POST',
       {
          board: board.id,
          note: this.state.description,
          link: this.state.link,
          image_base64: this.state.image
              },
        function(e){
          console.log(e);
        });
    }
  },



  _logout: function(){
    PDK.logout(function(){
      this.setState({boards: [], user: undefined});
    }.bind(this));
  },

  showBoards: function(){
    if(this.state.user){
      return this.state.boards.map(function(board){
        return <li key = {board.id} className = "board-item" onClick = {function(){
            this._pin(board);
          }.bind(this)}>
          <div className = "board-name">{board.name}</div>
          <div className = "pin-it">Save</div>
        </li>;
      }.bind(this));
    }else{
      return <div/>;
    }
  },

  renderImage: function(){

  },

  setValue: function(e){
    var key = e.target.placeholder;
    var value = e.target.value;
    this.setState({ key : value });
  },

  render: function(){

    return (

			<div id="main" >


				<div className = "contents">
          <div className = "content-left">
            <div className = "image-container">
              <img id = "image" ></img>
            </div>
            <div className = "description-container">

              <input onChange = {this.setValue} placeholder = "description"></input>

              <input onChange = {this.setValue} placeholder = "link"></input>

            </div>
          </div>


          <div className = "content-right">

            <ul className = "board-list">
              {this.showBoards()}
            </ul>
          </div>



				</div>
        <div className = "button-container">
          <div className = "button login" onClick = {this._login}>Log In</div>

          <div className = "button view" onClick = {this._logout}>Logout</div>
        </div>

        <div className = "background"></div>
			</div>
    );
  }
});

module.exports = App;
