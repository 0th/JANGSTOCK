import React, { Component, Fragment } from "react";
import SearchBar from "./SearchBar";
import { ClipLoader } from "react-spinners";
import "./App.css";
import { withStyles } from '@material-ui/core/styles';
import { DB_CONFIG } from "../db/config";
import firebase from "firebase";
import RankTable from "./RankTable";
import TitleBar from "./TitleBar";

import CircularProgress from '@material-ui/core/CircularProgress';



const styles = theme => ({



  progress: {
    margin: theme.spacing.unit *10,
    alignItems:'center',
  },


  bgLoading:{
    // backgroundColor:'red',
    position: 'absolute',  
    top: '30%',
    left: '40%',
    zIndex: 100,
    flexDirection:'column',

  },

  textPosition:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    fontSize:'1.4em',
  }

});




class App extends Component {
  
  
  state = {
    order: "desc",
    orderBy: "score",
    loading: true,
    data: [],
    selected: [],
    filterText: ""
  };

  getSorting(order, orderBy) {
    return order === "desc"
      ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
      : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    this.setState({
      selected: newSelected
    });
  };

  handleFilterTextChange = filterText => {
    this.setState({
      filterText: filterText
    });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";
    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }
    this.setState({ order, orderBy });
  };

  componentDidMount() {
    this.app = firebase.initializeApp(DB_CONFIG);
    const rootRef = this.app
      .database()
      .ref()
      .child("Stock/Rank");
    rootRef.on(
      "value",
      snapshot => {
        const todos = [];
        snapshot.forEach(data => {
          const todo = {
            name: data.val().Name,
            price: data.val().Price,
            score: data.val().Score,
            status: data.val().Status,
            code: data.val().Code,
            time: data.val().Update
          };
          todos.push(todo);
        });
        this.setState({ data: todos });
      },
      error => {
        console.log(error);
      }
    );
  }

  render() {

    const { data, order, orderBy, filterText } = this.state;
    const {classes} = this.props;

    if (data.length === 0) { 
      return (
          <div className={classes.bgLoading}>
              <CircularProgress className={classes.progress} size={90} thickness={2}/>
              <br/>
              <span className={classes.textPosition}>잠시만 기다려 주시기 바랍니다.</span>
          </div>
      );

    } else { 
      return (


      
        <div className="center">
            <TitleBar 
            data={data}
            />
            <SearchBar
              filterText={this.state.filterText}
              onFilterTextChange={this.handleFilterTextChange}
            />
            <RankTable
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              data={data}
              filterText={filterText}
              onHandleClick={this.handleClick}
              stringSort={this.getSorting}
              isselected={this.isSelected}
            />
        </div>





        
      );
    }
  }
} 
export default withStyles(styles)(App);
