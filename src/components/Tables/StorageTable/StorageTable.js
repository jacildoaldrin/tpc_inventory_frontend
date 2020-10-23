import { ButtonBase, Grid, InputAdornment, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@material-ui/core';
import { useStorage } from 'contexts/StorageContext';
import { Search, MoreVert, ChevronLeft } from '@material-ui/icons';
import { useNavigation } from "contexts/NavigationContext";
import React from 'react';

const useStyles = makeStyles(theme => ({
    title: {
        display: "inline",
        marginRight: "8px"
    },
    searchbar: {
        display: "inline",
    },
    titleContainer: {
        marginTop: "10px"
    },
    paginationContainer: {
        overflow: "hidden"
    },
    chevron: {
      fontSize: "10vh",
    },
}))


function StorageTable() {
    const { storage } = useStorage();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { viewDetails, goBack } = useNavigation();

    const handleChangePage = (newPage) => {
        setPage(newPage);
    }

    const onChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value);
        setPage(0);
    };

    const classes = useStyles();

    return (
        <>
            
            <TableContainer component={Paper} className="container">
                <Grid container alignItems="center" justify="space-between" className={classes.titleContainer}>
                    <ButtonBase onClick={goBack}><ChevronLeft className={classes.chevron} /><Typography variant="h5" className={classes.title}>Storage</Typography></ButtonBase>
                    <TextField
                        // fullWidth={true}
                        className={classes.searchbar}
                        margin="dense"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                  <Search style={{ color: "rgba(0, 0, 0, 0.4)" }} />
                                </InputAdornment>
                            ),
                        }} />
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Location</TableCell>
                            <TableCell>Bin</TableCell>
                            <TableCell>Total Items</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {storage?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(row => {
                            return <TableRow
                                onClick={()=>viewDetails(`storages/storage-details/${row.id}`)}
                                key={row.id}>
                                    <TableCell align="left">{row.location}</TableCell>
                                    <TableCell align="left">{row.bin}</TableCell>
                                    <TableCell align="left">{row.total_items}</TableCell>
                                    <TableCell align="center"><MoreVert /></TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
                <TablePagination 
                    className={classes.paginationContainer}
                    component="div"
                    rowsPerPageOptions={[5,10,15]}
                    rowsPerPage={rowsPerPage}
                    count={storage.length}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                />
            </TableContainer>
        </>
    )
}

export default StorageTable