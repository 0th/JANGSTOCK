import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";

import "./TableTop.css";

const CustomTableCell = withStyles(theme => ({
  head: {
    fontSize: 14
  }
}))(TableCell);

const columnData = [
  { id: "name", label: "종목명" },
  { id: "price", label: "현재가" },
  { id: "score", label: "점수" }
];

class TableTop extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;
    return (
      <TableHead className="table_head">
        <TableRow>
          <CustomTableCell />
          <CustomTableCell className="num">번호</CustomTableCell>
          {columnData.map(column => {
            return (
              <CustomTableCell
                key={column.id}
                sortDirection={orderBy === column.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={order}
                  onClick={this.createSortHandler(column.id)}
                >
                  {column.label}
                </TableSortLabel>
              </CustomTableCell>
            );
          }, this)}
          <CustomTableCell>상태</CustomTableCell>
        </TableRow>
      </TableHead>
    );
  }
}

TableTop.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};

export default TableTop;
