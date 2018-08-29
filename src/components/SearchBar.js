
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './SearchBar.css';
 

// 검색창 생성
class SearchBar extends Component {
    constructor(props) {
      super(props);
      this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }
  
    handleFilterTextChange(event) {
      this.props.onFilterTextChange(event.target.value);
    }
  
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

  export default SearchBar;