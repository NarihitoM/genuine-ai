import BackgroundParticles from "@/components/style/bgparticles";
import { motion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { signin, resendemail } from "@/services/api";

const confirmemail = () => {
    const useremail = localStorage.getItem("email");
    const [message, setmessaage] = useState<string>("");
    const [code, setcode] = useState<string>();
   
    const navigate = useNavigate();
    const [time, settime] = useState<number>(60);

    useEffect(() => {
        if (time <= 0)
            return;
        const timeinterval = setInterval(() => {
            settime(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timeinterval);
    }, [time])


    const signinconfirm = async (e: FormEvent) => {
        e.preventDefault();
        if (!code) {
            setmessaage("Please Enter Six Digits Code");
            return;
        }
        else {
            try {
                const result = await signin(useremail, code);
                if (result && result.success) {
                    setmessaage(result.message || "Sign up successful");
                     console.log(result.message);
                    setTimeout(() => {
                        navigate("/login");
                        setmessaage("");
                        localStorage.removeItem("email");
                    }, 3000);
                }
            }
            catch (err: any) {
                setmessaage(err?.response?.data?.message);
                setTimeout(() => {
                    setmessaage("");
                }, 3000);
            }
        }
    }
    const resend = async () => {
        setmessaage("Authenticating...")
        try {
            const result = await resendemail(useremail);
            if (result && result.success) {
                setmessaage(result.message || "New Verification Code Has Been Sent.");
               
                setTimeout(() => {
                    setmessaage("");
                }, 3000);
                settime(60);
            }
        }
        catch (err: any) {
            console.log(err?.response?.data?.message);
            setmessaage(err?.response?.data?.message);
            setTimeout(() => {
                setmessaage("");
            }, 3000);
        }
    }
    const removeemail = () => {
        localStorage.removeItem("email");
    }
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <BackgroundParticles />
                <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -10 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    onSubmit={signinconfirm}>
                    <Card className="bg-transparent p-10 border backdrop-blur-lg  border-white">
                        <CardTitle className="text-white flex flex-row justify-between items-center">
                            <h1 className="text-2xl">Email-Verify</h1>
                            <p className="font-light text-xl">Genuine-Ai</p>
                        </CardTitle>
                        <CardDescription className="flex flex-col gap-5">
                            <h1>Verification sent to : {useremail}</h1>
                            <div className="relative">
                                <input type="text" placeholder="Enter Six Digits Code" className="outline-none border rounded-lg  border-white py-2 px-1 pl-8 pr-8 placeholder:text-white placeholder:font-light text-white w-full" value={code} onChange={(e) => setcode(e.target.value)} />
                                <i className="absolute left-2 top-3 fa-solid fa-envelope text-white"></i>
                            </div>
                            {message && <p className={`${message === "Account Successfully created" || message === "New Verification Code Has Been Sent." ? "text-green-600" : "text-red-600"}`}>{message}</p>}
                            <button type="submit" className="bg-white active:translate-y-1 p-1 rounded-lg text-black">Confirm</button>
                            <button type="button" disabled={time > 0} onClick={resend} className={`${time > 0 ? "bg-black text-white" : "bg-white text-black"} active:translate-y-1 p-1 rounded-lg`}>{time === 0 ? "Send" : time + "s"}</button>
                        </CardDescription>
                        <NavLink to="/playground" onClick={removeemail} className="text-center active:translate-y-1 font-semi text-[14px] text-black p-2 rounded-lg bg-white">
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

export default confirmemail;