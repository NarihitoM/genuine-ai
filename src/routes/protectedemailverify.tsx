import { Navigate } from "react-router-dom";

type Props = {
    children: React.ReactNode
}
const Protectedemailverify = ({ children }: Props) => {
    const email = localStorage.getItem("email");
    if (!email) {
        return <Navigate to="/signin" replace />
    }
    return children;
}

export default Protectedemailverify;