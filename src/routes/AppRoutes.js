import {
    Switch,
    Route
  } from "react-router-dom";
  import Register from '../component/Register/Register';
  import Users from '../component/ManageUsers/Users';
  import Login from '../component/Login/Login';
import PrivateRoutes from "./PrivateRoutes";
const AppRoutes = (props) => {


const Products = () => {
        return (
            <span>Products</span>
        )
}

    return (
        <>
            <Switch>
                {/* <Route path="/product">
                    product
                </Route> */}
                <PrivateRoutes path="/users" component={Users}/>

                <PrivateRoutes path="/products" component={Products}/>



                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                {/* <Route path="/users">
                    <Users />
                </Route> */}
                <Route path="/" exact>
                    HOme
                </Route>
                <Route path='*'>
                    Not Found
                </Route>
            </Switch>
        </>
    )
}
export default AppRoutes;