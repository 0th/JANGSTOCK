import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import SearchBar from "./SearchBar";
import { ClipLoader } from "react-spinners";
import "./App.css";
import { DB_CONFIG } from "../db/config";
import firebase from "firebase";

import TableContent from "./TableContent";
import TableTop from "./TableTop";
import Title from "./Title";

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
          console.log("todos.length :" + todos.length);
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

    if (data.length === 0) {
      return (
        <div className="centerPosition">
          <ClipLoader loading={this.state.loading} /> <span>Loading...</span>
        </div>
      );
    } else {
      return (
        <div className="center">
          <Title />

          <SearchBar
            filterText={this.state.filterText}
            onFilterTextChange={this.handleFilterTextChange}
          />

          <Table>
            <TableTop
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
            />

            <TableContent
              data={data}
              order={order}
              orderBy={orderBy}
              filterText={filterText}
              onHandleClick={this.handleClick}
              stringSort={this.getSorting}
              isselected={this.isSelected}
            />
          </Table>
        </div>
      );
    }
  }
}
export default App;
