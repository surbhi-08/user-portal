import { Box, Button, Checkbox, FormControlLabel, FormLabel, Grid, IconButton, ListItemText, MenuItem, OutlinedInput, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { selectUser, setUser, updateUser } from '../redux/slices/authSlices';
import { useDispatch, useSelector } from 'react-redux';

{/* add edit  */ }
export const AddUser = () => {

    const { state } = useLocation();
    const [selectedRow, setSelectedRow] = React.useState(state?.data);
    const initialValues = {
        name: selectedRow?.name ? selectedRow?.name : '',
        email: selectedRow?.email ? selectedRow?.email : '',
        gender: selectedRow?.gender ? selectedRow?.gender : '',
    }
    const {
        register,
        handleSubmit, setValue, reset,
        formState: { errors },
    } = useForm({ defaultValues: initialValues });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Data = useSelector(selectUser);

    const onSubmit = async (data) => {
        if (selectedRow) {
            data.id = selectedRow?.id;
            data.status = selectedRow?.status;
            dispatch(updateUser(data));
            toast.success("update Data successfully")
            navigate('/home');
            setSelectedRow(null);
        }
        else {
            data.status = true;
            data.id = Data?.length + 1;
            dispatch(setUser(data));
            toast.success("Add Data successfully")
            navigate('/home');
        }
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: "center",
                    height: "100vh",
                    width: "100%"
                }}
            >
                <Box>
                    <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} my={3}>
                        <h3>{selectedRow ? "Edit Note" : "Add Note"}</h3>
                        <Button className='btn'
                            variant="contained"
                            onClick={() => { navigate('/home'); }}
                        >Back
                        </Button>
                    </Box>

                    <Box style={{ minWidth: 550 }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        label="Name"
                                        name="name"
                                        {...register('name', { required: true })}
                                    />
                                    {errors.name && <Typography className="text-danger mb-0" style={{ fontSize: 12 }}>Name is required.</Typography>}
                                </Grid>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        {...register('email', {
                                            required: true,
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                    />
                                    {errors?.email && errors.email?.type === "pattern" && <p className='text-danger mb-0' style={{ fontSize: 12 }}>{errors.email?.message}</p>}
                                    {errors?.email && errors.email?.type === "required" && <p className='text-danger mb-0' style={{ fontSize: 12 }}>Email is required</p>}
                                </Grid>
                                <Grid item xl={12} lg={12} md={12} sm={12} xs={12} my={2}>
                                    <FormLabel id="gender">Gender</FormLabel>
                                    <RadioGroup row defaultValue={selectedRow?.gender ? selectedRow?.gender : ''}
                                        name="gender"

                                    >
                                        <FormControlLabel value="Female" control={<Radio    {...register('gender', { required: true })} />} label="Female" />
                                        <FormControlLabel value="Male" control={<Radio   {...register('gender', { required: true })} />} label="Male" />
                                        <FormControlLabel value="Other" control={<Radio   {...register('gender', { required: true })} />} label="Other" />
                                    </RadioGroup>

                                    {errors.gender && <Typography className="text-danger mb-0" style={{ fontSize: 12 }}> Gender is required.</Typography>}
                                </Grid>

                            </Grid>
                            <Button className='btn'
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                {selectedRow ? "Update" : "Add"}
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Box>

        </React.Fragment >
    )
};


