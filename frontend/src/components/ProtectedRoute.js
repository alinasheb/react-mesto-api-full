import React from 'react';
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {
    return (
      <Route>
        {
          () => props.loginIn ? <Component {...props} /> : <Redirect to="/sing-in" />
        }
      </Route>
  );
};
  
  export default ProtectedRoute;