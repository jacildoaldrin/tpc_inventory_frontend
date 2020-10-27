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
    const [select, setSelect] = React.useState('----');
    const { viewDetails, goBack } = useNavigation();
    const uniqueLocations = [...new Set(storage.filter(item=>(item.total_items > 0)).map(item=>item.location))]

    const handleChangePage = (newPage) => {
        setPage(newPage);
    }

    const onChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value);
        setPage(0);
        console.log(storage)
        console.log(uniqueLocations)
    };

    const classes = useStyles();

    return (
        <Paper>
            <Grid container alignItems="center" justify="space-between" className={classes.titleContainer}>
                <ButtonBase onClick={goBack}><ChevronLeft className={classes.chevron} />
                    <Typography variant="h5" className={classes.title}>Storage</Typography>
                </ButtonBase>
                <TextField 
                    select
                    value={select}
                    onChange={(e)=>setSelect(e.target.value)}>
                    <MenuItem value="----">
                        ----
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
                            <TableCell>Location</TableCell>
                            <TableCell>Bin</TableCell>
                            <TableCell>Total Items</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {storage?.filter(sto => {
                                if(select === '----') return true
                                else  return sto.location === select
                            }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(row => {
                            if (row.total_items > 0)
                            return <TableRow
                                onClick={()=>viewDetails(`storages/storage-details/${row.id}`)}
                                key={row.id}>
                                    <TableCell align="left">{row.location}</TableCell>
                                    <TableCell align="left">{row.bin}</TableCell>
                                    <TableCell align="left">{row.total_items}</TableCell>
                                    <TableCell align="center"><MoreVert /></TableCell>
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
                    count={storage.length}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                />
        </Paper>
    )
}

export default StorageTable
