import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { type decodedtoken } from "./components/props/props";

type Props = {
    children: React.ReactNode
}

const Session = ({ children }: Props) => {
    const navigate = useNavigate();
    const [warning, setwarning] = useState<boolean>();
    const [bool,setbool] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const decoded: any = jwtDecode<decodedtoken>(token);
        const now = Date.now() / 1000;

        if (decoded.exp < now) {
            setwarning(true);
            setbool(false);
        } else {
            const timeLeft = (decoded.exp - now) * 1000;
            setTimeout(() => {
                setwarning(true);
                setbool(false);
            }, timeLeft);
        }
    }, [navigate]);

    const click = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userin");
        navigate("/login");
        setwarning(false);
        setbool(true);
    }
    return (<>
        {warning && <div className="fixed z-1000 backdrop-blur-lg top-1/2 left-1/2 p-5 flex flex-col rounded-lg gap-4 -translate-x-1/2 border border-white -translate-y-1/2 h-auto w-[300px]">
            <h1 className="text-red-600 text-center text-3xl">Session Expired</h1>
            <p className="text-white text-center">Your Sessions has timed out.</p>
            <button type="button" onClick={click} className="text-black bg-white p-2 rounded-lg font-semibold  active:translate-y-1">Okay</button>
        </div>
        }
        {bool && children}
    </>);
};

export default Session;
