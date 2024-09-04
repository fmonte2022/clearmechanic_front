
import { isEmpty } from 'lodash';
import {
  IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter, 
    TableHead, 
    TablePagination, 
    TableRow,
    Tooltip,
} from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import classNames from "classnames";

import './styles.css';
import { CustomTableProps } from "./interfaces";

const CustomTable = ({
    page,
    rowsPerPage,
    rowsPerPageOptions,
    columns,
    items,
    totalItems,
    withPagination,
    handleChangePage,
    handleChangeRowsPerPage,
}: CustomTableProps) => {

  const tooltipInfo = (info: string) => {
    return (
      <Tooltip title={<div dangerouslySetInnerHTML={{  __html: info }}></div>}>
        <IconButton>
          <HelpOutlineIcon fontSize='small' />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="custom table">
        <TableHead>
            <TableRow>
                {columns.map((column) => (
                    <TableCell sx={{ minWidth: column.minWidth, fontWeight: "bold" }} key={column.id} component="th" scope="row" align={column.align}>
                        {column.label} {column.info ? tooltipInfo(column.info) : null}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row: any, index: number) => (
            <TableRow key={`row_${index}1`}>
                {columns.map((column) => (
                    <TableCell sx={{ minWidth: column.minWidth }} key={`row_${index}_column_${column.id}`} component="th" scope="row" align={column.align}>
                       <span className={classNames(column.showAlert && `customTable__cellValue_${column.showAlert(row)}`)}>
                          {column.format
                            ? column.format(row[column.id])
                            : row[column.id] || '-'}
                       </span>
                    </TableCell>
                ))}
            </TableRow>
          ))}
          {isEmpty(items) && (
            <TableRow sx={{ height: 60 }}>
              <TableCell colSpan={columns.length} />
            </TableRow>
          )}
        </TableBody>
        {withPagination && (
            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={rowsPerPageOptions || [5, 10, 15]}
                        colSpan={columns.length}
                        count={totalItems}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        slotProps={{
                            select: {
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            },
                        }}
                        sx={{
                          "& .MuiTablePagination-select": {
                            textAlign: "center !important"
                          }
                        }}
                        onPageChange={(_event, page) => handleChangePage && handleChangePage(page)}
                        onRowsPerPageChange={(event) => handleChangeRowsPerPage && handleChangeRowsPerPage(+event.target.value)}
                    />
                </TableRow>
            </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
}

export default CustomTable;