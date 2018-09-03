import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Checkbox from "@material-ui/core/Checkbox";


const CustomTableCell = withStyles(theme => ({
  head: {
    // backgroundColor: '#2d74de',
    color: theme.palette.common.black,
    fontSize: 13,

  },
  // body: {
  //   fontSize: 20,
  // },
}))(TableCell);


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});



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

    const { data, order, orderBy,  filterText } = this.props;
    const sorting = this.props.stringSort;
    const isselected = this.props.isselected;
    const onhandleClick = this.props.onHandleClick;

    return (
      <Table style={{width:'800px'}} >

        <colgroup>

          <col style={{width:'2.5%'}}/>
          <col style={{width:'15%'}}/>
          <col style={{width:'2.5%'}}/>
          <col style={{width:'30%'}}/>
          <col style={{width:'20%'}}/>
          <col style={{width:'20%'}}/>
          <col style={{width:'10%'}}/>

        </colgroup>

        <TableHead >

          <TableRow >
          
            <CustomTableCell/>
            <CustomTableCell>순위</CustomTableCell>
            <CustomTableCell/>

            {columnData.map((column,index) => {
              
              return (
                <CustomTableCell
                  key={column.id}
                  sortDirection={orderBy === column.id ? order : false}
                  // {num=num+1}
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

            <CustomTableCell>투자</CustomTableCell>

          </TableRow>
        </TableHead>

        <TableBody>
          {data
            .sort(sorting(order, orderBy))
            .slice(0,20)
            .map((product, index) => {
            // indexOf가 -1이라는것은, 문자열이 존재하지 않는다.
            if (product.name.indexOf(filterText) === -1) {
              return;
            }

            const isSelected = isselected(product.code);
            
            return (
              <TableRow
                key={index + 1}
                onClick={event => onhandleClick(event, product.code)}
                hover
                role="checkbox"
                selected={isSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={isSelected} />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>-</TableCell>
                <TableCell>
                  {product.name}
                  <br />
                  {product.code}
                </TableCell>
              <TableCell>{Number(product.price).toLocaleString('en')}</TableCell>
                <TableCell>{product.score}</TableCell>
                <TableCell>
                  {product.status === "good"
                    ? "좋음"
                    : product.status === "normal"
                      ? "보통"
                      : product.status === "bad"
                        ? "나쁨"
                        : "위험"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

TableTop.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired
};

export default TableTop;
