import BackgroundParticles from "@/components/style/bgparticles";
import { motion } from "framer-motion";
import { Card, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, type FormEvent } from "react";
import { passwordchange, resendpassword } from "@/services/api";

const Confirmpassword = () => {
    const [message, setmessaage] = useState<string>("");
    const [loading, setloading] = useState<boolean>();
    const [code, setcode] = useState<string>();
    const [time,settime] = useState<number>(60);

    useEffect(() => {
        if (time <= 0)
        return;
        const timeinterval = setInterval(() => {
            settime((prev) => prev -1);
        }, 1000);

        return () => clearInterval(timeinterval);
    },[time])

    const email = localStorage.getItem("pwemail");
    const navigate = useNavigate();
    const submitcode = async (e: FormEvent) => {
        e.preventDefault();
        if (!code) {
            setmessaage("Please Enter Code");
            setTimeout(() => {
                setmessaage("");
            }, 3000);
            return;
        }
        else {
            setloading(true);
            setTimeout(() => {
                setloading(false);
            }, 3000)
            try {
                const result = await passwordchange(email, code);
                if (result && result.success) {
                    setmessaage(result.message || "Verification Successful");
                    localStorage.setItem("isopen", JSON.stringify(true));
                    setTimeout(() => {
                        setmessaage("");
                        navigate("/passwordchange");

                    }, 3000);
                }
            }
            catch (err: any) {
                setmessaage(err?.response?.data.message || "Unexpected Error");
                setTimeout(() => {
                    setmessaage("");
                }, 3000);
            }
        }
    }
    const resend = async () =>
    {
        settime(60);
        setmessaage("Authenticating...");
        try{
        const result = await resendpassword(email);
        if(result && result.success)
        {
             setmessaage(result.message || "New Verification Code Has Been Sent.");
             setTimeout(() => {
                setmessaage("");
             }, 3000);
        }
    }
    catch(err : any)
    {
         setmessaage(err?.response?.data.message);
         setTimeout(() => {
            setmessaage("");
         }, 3000);
    }
    }
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <BackgroundParticles />
                <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -10 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    onSubmit={submitcode}>
                    <Card className="bg-transparent p-10 border backdrop-blur-lg  border-white">
                        <CardTitle className="text-white flex flex-row justify-between items-center">
                            <h1 className="text-xl">Password-Verify</h1>
                            <p className="font-light text-xl">Genuine-Ai</p>
                        </CardTitle>
                        <CardDescription className="flex flex-col gap-5">
                            <h1>Verification sent to : {email}</h1>
                            <div className="relative">
                                <input type="text" placeholder="Enter 6 digits code" className="outline-none border rounded-lg  border-white py-2 px-1 pl-8 pr-8 placeholder:text-white placeholder:font-light text-white w-full" value={code} onChange={(e) => setcode(e.target.value)} />
                                <i className="absolute left-2 top-3 fa-solid fa-key text-white"></i>
                            </div>
                            {message && <p className={`${message === "Verification Successful" || message === "New Verification Code Has Been Sent." || message === "Authenticating..."  ? "text-green-600" : "text-red-600"}`}>{message}</p>}
                            <button type="submit" disabled={loading} className="bg-white active:translate-y-1 p-1 rounded-lg text-black">Confirm</button>
                            <button type="button" disabled={time > 0} onClick={resend} className={`${time > 0 ? "bg-black text-white" : "bg-white text-black"} active:translate-y-1 p-1 rounded-lg`}>{time === 0 ? "Send" : time + "s"}</button>
                        </CardDescription>
                        <NavLink to="/playground" onClick={() => { navigate("/login"); localStorage.removeItem("pwemail") }} className="text-center active:translate-y-1 font-semi text-[14px] text-black p-2 rounded-lg bg-white">
                            Back
                        </NavLink>
                        <CardFooter>
                            <p className="text-[12px] text-gray-500">@2025 Genuine-Ai. All Rights Reserved.</p></CardFooter>
                    </Card>
                </motion.form>
            </div>
        </>
    )
}

export default Confirmpassword;