import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody"; 


const CustomTableCell = withStyles(theme => ({
  head: {
    // backgroundColor: '#2d74de',
    // color: theme.palette.common.black,
    fontSize: 16, 
    paddingLeft:30,
  },
  body: {
    fontSize: 16,
    paddingLeft:30,
    color: '#848484',
    paddingTop:5,
    paddingBottom:5
  },
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

    const { data, order, orderBy,  filterText } = this.props;
    const sorting = this.props.stringSort;
    const isselected = this.props.isselected;
    const onhandleClick = this.props.onHandleClick;


    return (

      <Table >

        <colgroup>
          <col style={{width:'10%'}}/>
          <col style={{width:'10%'}}/>
          <col style={{width:'40%'}}/>
          <col style={{width:'14%'}}/>
          <col style={{width:'16%'}}/>
          <col style={{width:'10%'}}/>
      </colgroup>

        <TableHead>
          <TableRow>
            <CustomTableCell padding="none">순위</CustomTableCell>
            <CustomTableCell padding="none"/>

            {columnData.map((column,index) => {
              
              return (
                <CustomTableCell padding="none"
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

            <CustomTableCell padding="none">투자</CustomTableCell>

          </TableRow>
        </TableHead>

        <TableBody>

          {data
            .sort(sorting(order, orderBy))
            .slice(0,100)
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
                selected={isSelected}
                
              >
 
                <CustomTableCell padding="none" style={{fontSize:'15px'}}>{index + 1}</CustomTableCell>
                <CustomTableCell padding="none">-</CustomTableCell>
                <CustomTableCell padding="none">
                <a href={'https://finance.naver.com/item/main.nhn?code='+product.code} style={{color:'#848484', textDecoration:'none'}}>{product.name}</a>
                   <br />
                  
                  <span style={{color:'#A4A4A4'}}>{product.code} </span>
                </CustomTableCell>
              <CustomTableCell padding="none">{Number(product.price).toLocaleString('en')}</CustomTableCell>
                <CustomTableCell padding="none">{product.score}</CustomTableCell>
                <CustomTableCell padding="none">
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
