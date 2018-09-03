import React, { Component } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  tabsRoot: {
    borderBottom: "1px solid #e8e8e8"
  },

  tabsIndicator: {
    backgroundColor: "#1890ff"
  },

  tabRoot: {
    textTransform: "initial",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,
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
    "&:hover": {
      color: "#40a9ff",
      opacity: 1
    },
    "&$tabSelected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium
    },
    "&:focus": {
      color: "#40a9ff"
    }
  },
  tabSelected: {},

  typography: {
    padding: theme.spacing.unit * 3
  }
});

class TabFAN extends Component {
  render() {
    const { classes, value } = this.props;
    const handlechange = this.props.onHandleChange;

    return (
      <div>
        <Tabs
          value={value}
          onChange={handlechange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.tabsIndicator
          }}
        >
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="KOSPI"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="KOSDAQ"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="ETF"
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="ETN"
          />
        </Tabs>

        {value === 0 && (
          <Typography className={classes.typography}>
            Ant Design UI 1
          </Typography>
        )}
        {value === 1 && (
          <Typography className={classes.typography}>
            Ant Design UI 22
          </Typography>
        )}
        {value === 2 && (
          <Typography className={classes.typography}>
            Ant Design UI 333
          </Typography>
        )}
        {value === 3 && (
          <Typography className={classes.typography}>
            Ant Design UI 4444
          </Typography>
        )}
        {value === 4 && (
          <Typography className={classes.typography}>
            Ant Design UI 55555
          </Typography>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(TabFAN);
