import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";

const CustomTableCell = withStyles(theme => ({
  body: {
    fontSize: 15
  }
}))(TableCell);

class TableContent extends Component {
  render() {
    const { data, order, orderBy, filterText } = this.props;

    const sorting = this.props.stringSort;
    const isselected = this.props.isselected;
    const onhandleClick = this.props.onHandleClick;

    return (
      <TableBody>
        {data.sort(sorting(order, orderBy)).map((product, index) => {
          // indexOf가 -1이라는것은, 문자열이 존재하지 않는다.
          if (product.name.indexOf(filterText) === -1) {
            return;
          }

          const isSelected = isselected(product.code);
          return (
            <TableRow key={index + 1}>
              <CustomTableCell padding="checkbox">
                <Checkbox
                  checked={isSelected}
                  onClick={event => onhandleClick(event, product.code)}
                />
              </CustomTableCell>
              <CustomTableCell>{index + 1}</CustomTableCell>
              <CustomTableCell>
                {product.name}
                <br />
                {product.code}
              </CustomTableCell>
              <CustomTableCell>{product.price}</CustomTableCell>
              <CustomTableCell>{product.score}</CustomTableCell>
              <CustomTableCell>
                {product.status === "good"
                  ? "좋음"
                  : product.status === "normal"
                    ? "보통"
                    : product.status === "bad"
                      ? "나쁨"
                      : "위험"}
              </CustomTableCell>
            </TableRow>
          );
        })}
      </TableBody>
    );
  }
}

export default TableContent;
