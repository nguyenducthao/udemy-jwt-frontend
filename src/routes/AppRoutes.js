import { Switch, Route } from "react-router-dom";
import Login from "../components/Login/Login";
import Users from "../components/ManageUsers/Users";
import Register from "../components/Register/Register";
import Role from "../components/Role/Role";
import GroupRole from '../components/GroupRole/GroupRole'
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = (props) => {
    return (
        <>
            <Switch>
                {/* <Route path="/project">
                    project
                </Route>
                <Route path="/users">
                    <Users />
                </Route> */}
                <PrivateRoutes path='/users' component={Users} />
                <PrivateRoutes path='/roles' component={Role} />
                <PrivateRoutes path='/group-role' component={GroupRole} />
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/" exact>
                    home
                </Route>
                <Route path="*">
                    404 not found
                </Route>
            </Switch>
        </>
    )
}
export default AppRoutes