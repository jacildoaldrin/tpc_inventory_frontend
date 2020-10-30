import { ButtonBase, Grid, InputAdornment, makeStyles, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@material-ui/core';
import { useStorage } from 'contexts/StorageContext';
import { Search, MoreVert, ChevronLeft } from '@material-ui/icons';
import { useNavigation } from "contexts/NavigationContext";
import React, { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
    title: {
        display: "inline",
        marginRight: "8px"
    },
    selectFilter: {
        marginRight: "16px",
        width: "120px"
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
    header: {
        fontWeight: "bold",
    },
    // tableSize: {
    //     maxWidth: "1000px",
    //     alignItems: "center",
    //     justify: "center",
    //     direction: "column"
    // }
}))


function StorageTable() {
    const { storage } = useStorage();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [select, setSelect] = React.useState('----');
    const { viewDetails, goBack } = useNavigation();
    const uniqueLocations = [...new Set(storage.filter(item=>(item.total_items > 0)).map(item=>item.location))]

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const onChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value);
        setPage(0);
        console.log(storage)
        console.log(uniqueLocations)
    };

    const classes = useStyles();

    const result = storage?.filter(sto => {
        if(select === '----') return true
        else  return sto.location === select
    }).filter(item=>(item.total_items > 0))

    return (
        <Paper className={classes.tableSize}>
            <Grid container alignItems="center" justify="space-between" className={classes.titleContainer}>
                <ButtonBase onClick={goBack}><ChevronLeft className={classes.chevron} />
                    <Typography variant="h5" className={classes.title}>Storage</Typography>
                </ButtonBase>
                <TextField 
                    select
                    className={classes.selectFilter}
                    value={select}
                    onChange={(e)=> {
                        if(page !== 0) setPage(0);
                        setSelect(e.target.value)
                    }}>
                    <MenuItem value="----">
                        --all--
                    </MenuItem>
                    {uniqueLocations?.map((row) => (
                    <MenuItem key={row} value={row}>
                        {row}
                    </MenuItem>))}
                </TextField>
                </Grid>
            <TableContainer className="container">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.header} align="center">Location</TableCell>
                            <TableCell className={classes.header} align="center">Bin</TableCell>
                            <TableCell className={classes.header} align="center">Total Items</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(row => {
                            if (row.total_items > 0)
                            return <TableRow
                                onClick={()=>viewDetails(`storages/storage-details/${row.id}`)}
                                key={row.id}>
                                    <TableCell align="center">{row.location}</TableCell>
                                    <TableCell align="center">{row.bin}</TableCell>
                                    <TableCell align="center">{row.total_items}</TableCell> 
                            </TableRow>
                            else return null
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination 
                    className={classes.paginationContainer}
                    component="div"
                    rowsPerPageOptions={[5,10,15]}
                    rowsPerPage={rowsPerPage}
                    count={result.length}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                />
        </Paper>
    )
}

export default StorageTable
