import React, { Component, Fragment } from "react";
import {
  withStyles, 
  createMuiTheme
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

// const styles = theme => ({

//   searchField: {
//     borderRadius: 3,
//     height: 150,
//     // width: "100%",
//     fontSize: 50
//   },

//   textField: {
//     fontSize: 50 //works!
//   }
// });

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  cssLabel: {
    "&$cssFocused": {
      color: purple[500]
    }
  },
  cssFocused: {},
  cssUnderline: {
    "&:after": {
      borderBottomColor: purple[500]
    }
  },
  bootstrapRoot: {
    padding: 0,
    "label + &": {
      marginTop: theme.spacing.unit * 3
    }
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 12px",
    width: "calc(100% - 24px)",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  },
  bootstrapFormLabel: {
    fontSize: 18
  }
});

const theme = createMuiTheme({
  palette: {
    primary: green
  }
});

// 검색창 생성
class SearchBar extends Component {
  handleFilterTextChange = event => {
    this.props.onFilterTextChange(event.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.searchField}>
        <TextField
          label="종목명/코드 검색"
          placeholder="종목명/코드 검색"
          className="search_field"
          onChange={this.handleFilterTextChange}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SearchBar);
