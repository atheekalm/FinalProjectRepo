import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Route } from "react-router-dom";
import Home from "../../features/Dashbord/Home";
import Login from "../../features/Account/Login";
import Register from "../../features/Account/Register";
import { useAppDispatch } from "../../features/test_redux/configureStore";
import { useEffect } from "react";
import { fetchCurrentUser } from "../../features/Account/accountSlice";
import ServiceCardDetails from "../../features/Services/ServiceCardDetails";
import CreateProfile from "../../features/LoggedUser/CreateProfile";
import Messages from "../../features/Chat/Messsages";
import EditProfile from "../../features/LoggedUser/EditProfile";
import { createTheme, ThemeProvider } from "@mui/material";




export default function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  })

  const theme = createTheme({
    palette: {
      background:{
        default: '#eaeaea'
      }
    }
  });


  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer position="top-right" hideProgressBar />
        <Route exact path='/' component={Home} />
        <Route exact path='/Services' component={Home} />
        <Route exact path='/Login' component={Login} />
        <Route exact path='/Register' component={Register} />
        <Route exact path='/EditProfile' component={EditProfile} />
        <Route exact path='/Service/:id' component={ServiceCardDetails} />
        <Route exact path='/CreateProfile' component={CreateProfile} />
        <Route exact path='/Messages' component={Messages} />
      </ThemeProvider>
    </>
  );
}