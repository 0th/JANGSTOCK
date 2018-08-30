import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./SearchBar.css";

const styles = theme => ({
  search_field: {
    borderRadius: 3,
    height: 150,
    width: "100%",
    fontSize: 50
  },

  textField: {
    fontSize: 50 //works!
  }
});

// 검색창 생성
class SearchBar extends Component {
  handleFilterTextChange = event => {
    this.props.onFilterTextChange(event.target.value);
  };

  render() { 

    return (
      <TextField
        label="종목명/코드 검색"
        placeholder="종목명/코드 검색"
        className="search_field"
        onChange={this.handleFilterTextChange}
      />
    );
  }
}

export default withStyles(styles)(SearchBar);
