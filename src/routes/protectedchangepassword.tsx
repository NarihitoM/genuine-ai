import type React from "react";
import { Navigate } from "react-router-dom";

type Props = {
    children : React.ReactNode;
}
const Protectedchangepassword = ({children} : Props) =>
{
    const isopen = localStorage.getItem("isopen");
    if(!isopen)
    {
        return <Navigate to= "/passwordverify" replace/>
    }
    return children;
}

export default Protectedchangepassword;