import React, { Component, Fragment } from "react";
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
    const {classes} = this.props;

    return (
      <div className={classes.titleBar}>
        <h1>ZUFAN</h1>
        <h4>주판을 두드리고 주식투자</h4>
        <br/>
        <h6>Update: {data[0].time}</h6>
      </div>
    );
  }
}


export default withStyles(styles)(TitleBar);
