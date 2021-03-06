import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({});

// 검색창 생성
class SearchBar extends Component {
  handleFilterTextChange = event => {
    this.props.onFilterTextChange(event.target.value);
  };

  render() {
    return (
      <div className="searchbar">
        <TextField style={{width:"100%"}}
          label={
            <span style={{ fontWeight:'normal',color:'white', fontSize: "16px" }}>
              종목명 / 코드 검색
            </span>
          }
          // placeholder="검색"
          onChange={this.handleFilterTextChange}
          
          InputProps={{
            fullWidth:true,
            disableUnderline: true,
            // multiline:false
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SearchBar);
