import React from "react";
import { Navigate } from "react-router-dom";

type prop = {
    children : React.ReactNode;
}
const Protectedroute = ({  children  } : prop) => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" replace />
    }
    return children;
}

export default Protectedroute;