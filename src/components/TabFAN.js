import React, { Component } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import "./App.css";

import { withStyles } from "@material-ui/core/styles";
import RankTable from "./TableFAN";

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
      '"Helvetica Neue"',
      "Arial",
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
    padding: theme.spacing.unit * 5
  }
});

class TabFAN extends Component {
  render() {
    const {
      classes,
      value,
      order,
      orderBy,
      data,
      filterText,
      selectedCheckbox
    } = this.props;
    const onRequestSort = this.props.onRequestSort;
    const stringSort = this.props.stringSort;
    const isselected = this.props.isselected;
    const handlechange = this.props.onHandleChange;
    const onHandleChecked = this.props.onHandleChecked;
    const onHandleClick = this.props.onHandleClick;

    return (
      <div>

        <Tabs style={{width:'100%'}} 
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
            label={<span style={{fontSize:'16px', fontWeight:'bold'}}>전체</span>}
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={<span style={{fontSize:'16px', fontWeight:'bold'}}>코스피</span>}
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={<span style={{fontSize:'16px', fontWeight:'bold'}}>코스닥</span>}
          />
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={<span style={{fontSize:'16px', fontWeight:'bold'}}>ETF</span>}
          />

          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={<span style={{fontSize:'16px', fontWeight:'bold'}}>ETN</span>}
          />
        </Tabs>

        
        {value === 0 && (
          <RankTable
            order={order}
            orderBy={orderBy}
            onRequestSort={onRequestSort}
            data={data}
            filterText={filterText}
            onHandleClick={onHandleClick}
            stringSort={stringSort}
            isselected={isselected}
            selectedCheckbox={selectedCheckbox}
            onHandleChecked={onHandleChecked}
          />
        
        )}
        {value === 1 && (
          <Typography className={classes.typography}>
          <span className="test">서비스 준비중입니다.</span>
          </Typography>
        )}
        {value === 2 && (
          <Typography className={classes.typography}>
          <span className="test">서비스 준비중입니다.</span>
          </Typography>
        )}
        {value === 3 && (
          <Typography className={classes.typography}>
          <span className="test">서비스 준비중입니다.</span>
          </Typography>
        )}
        {value === 4 && (
          <Typography className={classes.typography}>
          <span className="test">서비스 준비중입니다.</span>
          </Typography>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(TabFAN);
