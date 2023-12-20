import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Main } from './Components/Main';
import { Login } from './Components/Login';
import { AddUser } from './Components/addUser';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Grid } from '@mui/material';
import red from '@mui/material/colors/deepPurple';
import grey from '@mui/material/colors/grey';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from './redux/slices/authSlices';


const defaultTheme = createTheme({
  palette: {
    primary: red,
    secondary: grey
  },
});

function App() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <ThemeProvider theme={defaultTheme}>
      <ToastContainer position="top-right" autoClose={5000} />
      <CssBaseline />
      {isLoggedIn ?
        <Routes>
          <Route path='/home' element={<Main />} />
          <Route path='/addUser' element={<AddUser />} />
          <Route path='/*' element={<Navigate to="/home" replace />} />
        </Routes>
        :
        <Grid container sx={{ background: "#f7f7f8", height: "100vh" }}>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/*' element={<Navigate to="/" replace />} />
          </Routes>
        </Grid>
      }
    </ThemeProvider>
  );
}

export default App;
