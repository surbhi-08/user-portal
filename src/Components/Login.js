import React, { useContext } from 'react'
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { setSignIn } from '../redux/slices/authSlices';
import { useDispatch } from 'react-redux'

export const Login = () => {

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            if (data?.email === 'admin@gmail.com' && data?.password === 'admin') {
                var user = {
                    isLoggedIn: true
                }
                dispatch(setSignIn(user));
            } else {
                toast.error("Invalid Credentials !");
            }

        } catch (e) { console.error(e); toast.error(e?.response?.data?.message); }
    };

    return (
        <>
            <Grid
                item
                xs={0}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://img.freepik.com/free-vector/realistic-style-technology-particle-background_23-2148426704.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        px: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: "center",
                        height: "100vh",
                        width: "100%"
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h6" style={{ fontweight: 700 }}>
                        <b>  Sign In</b>
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: "100%" }}>
                        <TextField
                            margin="normal"
                            required
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...register('password', { required: true })}
                        />
                        {errors.password && <p className="text-danger mb-0" style={{ fontSize: 12 }}>Password is required.</p>}
                        <Button className='btn'
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </>
    )
}
