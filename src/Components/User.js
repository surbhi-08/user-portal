import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, InputBase, ListItemIcon, ListItemText, Menu, MenuItem, Pagination, Paper, Slide, Switch, TableContainer, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { removeUser, selectUser, updateUser } from '../redux/slices/authSlices';
import { useDispatch, useSelector } from 'react-redux';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function Notes() {

    const Data = useSelector(selectUser);
    const [userData, setUserData] = React.useState(Data);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openModal, setModalOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = React.useState(null);
    const [filter, setFilter] = React.useState({ title: "", created_at: "ASC" })
    console.log(Data);
    React.useEffect(() => {
        setUserData(Data)
    }, [Data])


    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const deleteNote = async () => {
        dispatch(removeUser(selectedRow));
        toast.success("User Delete successfully")
        setModalOpen(false);
        setSelectedRow(null);
    }

    return (
        <>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={3} mt={1}>
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, }}
                >
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        sx={{ ml: 1, flex: 1, }}
                        placeholder="Search Note"
                        inputProps={{ 'aria-label': 'search google maps' }}
                        onChange={(e) => { setFilter({ ...filter, title: e.target.value }) }}
                    />
                </Paper>
                <div>
                    <Button className='btn'
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={() => { navigate('/addUser'); }}
                    >
                        Add User
                    </Button>
                </div>
            </Box>
            <TableContainer >
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell >Email</StyledTableCell>
                            <StyledTableCell >Gender</StyledTableCell>
                            <StyledTableCell >Status </StyledTableCell>
                            <StyledTableCell ></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    {userData?.length === 0 ?
                        <TableBody>
                            <StyledTableRow >
                                <StyledTableCell style={{ textAlign: "center" }} colSpan={6}>No Notes Found</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                        :
                        <TableBody>
                            {userData.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row?.name}
                                    </StyledTableCell>
                                    <StyledTableCell >{row?.email}</StyledTableCell>
                                    <StyledTableCell >{row?.gender}</StyledTableCell>
                                    <StyledTableCell >
                                        <Switch checked={row?.status} onChange={(event) => {
                                            var data = {
                                                id: row?.id,
                                                name: row?.name,
                                                email: row?.email,
                                                status: event.target.checked,
                                                gender: row?.gender
                                            };
                                            dispatch(updateUser(data));
                                            toast.success("Status update successfully")

                                        }} />
                                    </StyledTableCell>
                                    <StyledTableCell align='right'>
                                        <IconButton
                                            aria-controls="action-menu"
                                            aria-haspopup="true"
                                            onClick={(event) => {
                                                setAnchorEl(event.currentTarget);
                                                setSelectedRow(row)

                                            }}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id="action-menu"
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleMenuClose}
                                        >
                                            <MenuItem onClick={() => {
                                                setAnchorEl(null);
                                                setSelectedRow(row)
                                                navigate('/addUser',
                                                    {
                                                        state: {
                                                            data: selectedRow
                                                        }
                                                    })


                                            }}>
                                                <ListItemIcon>
                                                    <BorderColorIcon style={{ fontSize: 18 }} />
                                                </ListItemIcon>
                                                <ListItemText primary="Edit" style={{ fontSize: 14 }} />
                                            </MenuItem>
                                            <MenuItem onClick={() => {
                                                setModalOpen(true)
                                                setAnchorEl(null);
                                                setSelectedRow(row)
                                            }}>
                                                <ListItemIcon>
                                                    <DeleteIcon style={{ fontSize: 18 }} />
                                                </ListItemIcon>
                                                <ListItemText primary="Delete" style={{ fontSize: 14 }} />
                                            </MenuItem>
                                        </Menu>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>}
                </Table>
            </TableContainer >

            {/* delete modal */}
            <Dialog className='addNoteDialog'
                open={openModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setModalOpen(false)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Alert"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure want to delete this note ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModalOpen(false)}>No</Button>
                    <Button onClick={() => deleteNote()}>Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}