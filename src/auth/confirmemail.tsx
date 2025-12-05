import BackgroundParticles from "@/components/style/bgparticles";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import axios from "axios";

const confirmemail = () => {
    const useremail = localStorage.getItem("email");
    const [message, setmessaage] = useState<string>("");
    const [code, setcode] = useState<string>();
    const navigate = useNavigate();

    const signinconfirm = async (e : FormEvent) => {
        e.preventDefault();
        if (!code) {
            setmessaage("Please Enter Six Digits Code");
            return;
        }
        else {
            try {
                const response = await axios.post("http://localhost:5000/api/signin", {
                    email: useremail,
                    code: code
                })
                if (response.data && response.data.success) {
                    setmessaage(response.data.message || "Sign up successful");
                    setTimeout(() => {
                        navigate("/login");
                        setmessaage("");
                    }, 3000);
                }
            }
            catch (err: any) {
                setmessaage(err?.response?.data.message);
            }
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
                    onSubmit={signinconfirm}>
                    <Card className="bg-transparent p-10 border backdrop-blur-lg  border-white">
                        <CardTitle className="text-white flex flex-row justify-between items-center">
                            <h1 className="text-2xl">Email-Verify</h1>
                            <p className="font-light text-xl">Genuine-Ai</p>
                        </CardTitle>
                        <CardDescription className="flex flex-col gap-5">
                            <h1>Email:{useremail}</h1>
                            <div className="relative">
                                <input type="text" placeholder="Enter Six Digits Code" className="outline-none border rounded-lg  border-white py-2 px-1 pl-8 pr-8 placeholder:text-white placeholder:font-light text-white w-full" value={code} onChange={(e) => setcode(e.target.value)} />
                                <i className="absolute left-2 top-3 fa-solid fa-envelope text-white"></i>
                            </div>
                            {message && <p className={`${message === "Sign up successful" ? "text-green-600" : "text-red-600"}`}>{message}</p>}
                            <button type="submit" className="bg-white active:translate-y-1 p-1 rounded-lg text-black">Confirm</button>
                        </CardDescription>
                        <NavLink to="/playground" className="text-center active:translate-y-1 font-semi text-[14px] text-black p-2 rounded-lg bg-white">
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