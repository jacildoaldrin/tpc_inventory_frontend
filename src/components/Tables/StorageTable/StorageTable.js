import { Grid, InputAdornment, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@material-ui/core';
import { useStorage } from 'contexts/StorageContext';
import { Search, MoreVert } from '@material-ui/icons'
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
    }
}))


function StorageTable() {
    const { storage } = useStorage();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (newPage) => {
        setPage(newPage);
    }

    const onChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value);
        setPage(0);
    };

    const classes = useStyles();

    return (
        <TableContainer component={Paper} className="container">
            <Grid container alignItems="center" justify="space-between" className={classes.titleContainer}>
                <Typography variant="h5" className={classes.title}>Storage</Typography>
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
                        return <TableRow key={row.id}>
                            <TableCell align="left">{row.location}</TableCell>
                            <TableCell align="left">{row.bin}</TableCell>
                            <TableCell align="left">{row.items? row.items : null}</TableCell>
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
    )
}

export default StorageTable
