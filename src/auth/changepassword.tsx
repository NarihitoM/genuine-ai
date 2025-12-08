import BackgroundParticles from "@/components/style/bgparticles";
import { motion } from "framer-motion";
import { Card, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { newpasswordchange } from "@/services/api";

const Changepassword = () => {
    const [message, setmessaage] = useState<string>("");
    const [loading, setloading] = useState<boolean>();
    const [password, setpassword] = useState<string>("");
    const [bool, setbool] = useState<boolean>();
    const [bool1, setbool1] = useState<boolean>();
    const [confirmpassword, setconfirmpasword] = useState<string>("");
    const email = localStorage.getItem("pwemail");
    const eyetoggle = () => {
        setbool(prev => !prev);
    }
    const eyetoggle1 = () => {
        setbool1(prev => !prev);
    }
    const navigate = useNavigate();
    const submitpassword = async (e: FormEvent) => {
        e.preventDefault();
        if (!password) {
            setmessaage("Please Enter Password");
            setTimeout(() => {
                setmessaage("");
            }, 3000);
            return;
        }
        else if (password.length < 7) {
            setmessaage("Password length must be greater than 7");
            setTimeout(() => {
                setmessaage("");
            }, 3000);
            return;
        }
        else if (!confirmpassword) {
            setmessaage("Please Enter Confirm Password");
            setTimeout(() => {
                setmessaage("");
            }, 3000);
            return;
        }
        else if (confirmpassword.length < 7) {
            setmessaage("Password length must be greater than 7");
            setTimeout(() => {
                setmessaage("");
            }, 3000);
            return;
        }
        else {
            setloading(true);
            setTimeout(() => {
                setloading(false);
            }, 3000);
            setmessaage("Authenticating...");
            try {
                const result = await newpasswordchange(email, password);
                if (result && result.success) {
                    setmessaage(result.message || "Password change successful");
                    setTimeout(() => {
                        setmessaage("");
                        localStorage.removeItem("pwemail");
                        localStorage.removeItem("isopen");
                        navigate("/login");
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

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <BackgroundParticles />
                <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -10 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    onSubmit={submitpassword}>
                    <Card className="bg-transparent p-10 border backdrop-blur-lg  border-white">
                        <CardTitle className="text-white flex flex-row justify-between items-center">
                            <h1 className="text-xl">Change Password</h1>
                            <p className="font-light text-xl">Genuine-Ai</p>
                        </CardTitle>
                        <CardDescription className="flex flex-col gap-5">

                            <div className="relative">
                                <i className="absolute left-2 top-3 fa-solid fa-key text-white"></i>
                                <input type={bool ? "password" : "text"} placeholder="Enter Password" className="outline-none border rounded-lg w-full border-white py-2 px-1 pl-8 pr-8 placeholder:text-white placeholder:font-light text-white" value={password} onChange={(e) => setpassword(e.target.value)} />
                                <i onClick={eyetoggle} className={`absolute right-2 top-3 fa-solid  ${bool ? "fa-eye-slash" : "fa-eye"}`}></i>
                            </div>
                            <div className="relative">
                                <i className="absolute left-2 top-3 fa-solid fa-key text-white"></i>
                                <input type={bool1 ? "password" : "text"} placeholder="Enter Confirm Password" className="outline-none border rounded-lg w-full border-white py-2 px-1 pl-8 pr-8 placeholder:text-white placeholder:font-light text-white" value={confirmpassword} onChange={(e) => setconfirmpasword(e.target.value)} />
                                <i onClick={eyetoggle1} className={`absolute right-2 top-3 fa-solid  ${bool1 ? "fa-eye-slash" : "fa-eye"}`}></i>
                            </div>
                            {message && <p className={`${message === "Password change successful" || message === "Authenticating..." ? "text-green-600" : "text-red-600"}`}>{message}</p>}
                            <button type="submit" disabled={loading} className="bg-white active:translate-y-1 p-1 rounded-lg text-black">Confirm</button>
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

export default Changepassword;