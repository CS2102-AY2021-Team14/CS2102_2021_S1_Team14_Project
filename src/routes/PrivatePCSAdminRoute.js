import React, { useState, useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";

import { UserContext } from "../utils/UserProvider";

import ROUTES from "./Routes";

import {
  PcsAdminHome,
  PcsAdminCareTaker,
  PcsAdminPetInfo,
  PcsAdminOverview,
} from "../pages/pcsadmin";
import PcsAdminEmployeeOfMonth from "../pages/pcsadmin/PcsAdminEmployeeOfMonth";

const PrivatePCSAdminRoute = props => {
  const { username, authToken, roles } = useContext(UserContext);
  // ^ use these to determine whether logged in or not and what role (roles is an array)
  // roles can be an array containing these stuff ["Pet Owner", "Full-time Care Taker", "Part-time Care Taker", "PCS Admin"]

  const [auth, setAuth] = useState(null);
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    if (username && authToken) {
      setAuth({ username, authToken });
    }
  }, [username, authToken]);

  useEffect(() => {
    setUserRoles(roles);
  }, [roles]);

  const isAuthenticated = () => {
    return auth != null;
  };

  const isPcsAdmin = () => {
    return userRoles.includes("PCS Admin");
  };

  return (
    <Route
      {...props}
      render={props => {
        if (isAuthenticated() && isPcsAdmin()) {
          return (
            <Switch>
              <Route exact path={ROUTES.ADMIN_HOME}>
                <PcsAdminHome />
              </Route>
              <Route exact path={ROUTES.ADMIN_OVERVIEW}>
                <PcsAdminOverview />
              </Route>
              <Route exact path={ROUTES.ADMIN_PET_INFO}>
                <PcsAdminPetInfo />
              </Route>
              <Route exact path={ROUTES.ADMIN_CARE_TAKER}>
                <PcsAdminCareTaker />
              </Route>
              <Route exact path={ROUTES.ADMIN_EMPLOYEE_OF_MONTH}>
                <PcsAdminEmployeeOfMonth />
              </Route>
            </Switch>
          );
        } else {
          return <div>You are unauthorized!</div>; // TODO: Have a nice looking unauthorized page
        }
      }}
    />
  );
};

export default PrivatePCSAdminRoute;
