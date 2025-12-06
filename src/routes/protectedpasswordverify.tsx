import { Navigate } from "react-router-dom";

type Props = {
    children: React.ReactNode
}

const Protectedpasswordverify = ({ children }: Props) => {
    const pwemail = localStorage.getItem("pwemail");
    if (!pwemail) {
        return <Navigate to="/login" replace/> 
    }
    return children;
}

export default Protectedpasswordverify;