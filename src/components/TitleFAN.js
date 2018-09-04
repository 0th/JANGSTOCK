import React, { Component  } from "react";
import { withStyles } from '@material-ui/core/styles';



const styles = theme => ({

  titleBar: {

    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    color:'black',
    fontSize: '20px',
    // backgroundColor:'red',


  },

  timeBar:{
    // backgroundColor:'red',
    position: 'absolute',  
    top: '30%',
    left: '40%',
    zIndex: 100,
    backgroundColor:'red',

   
  }

});


class TitleBar extends Component {
  
  render() {

    const { data } = this.props; 
    return (
      <div className="titlebar">
        <h1>ZUFAN</h1>
        <h6>업데이트: {data[0].time}</h6>
      </div>
    );
  }
}


export default withStyles(styles)(TitleBar);
