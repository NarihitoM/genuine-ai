import BackgroundParticles from "@/components/style/bgparticles";
import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "@/services/api";

const Login = () => {
    const [email, setemail] = useState<string>("");
    const [password, setpassword] = useState<string>("");
    const [message, setmessage] = useState<string>("");
    const [bool, setbool] = useState<boolean>(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const navigate = useNavigate();
    const eyetoggle = () => {
        setbool((prev) => !prev);
    }
    const formsubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!email && !emailRegex.test(email)) {
            setmessage("Please Enter Email");
            setTimeout(() => {
                setmessage("");
            }, 3000);
            return;
        }
        else if (!password) {
            setmessage("Please Enter Password");
            setTimeout(() => {
                setmessage("");
            }, 3000);
            return;
        }
        else if (password.length < 7) {
            setmessage("Password length must be greater than 7");
            setTimeout(() => {
                setmessage("");
            }, 3000);
            return;
        }
        else {
            setmessage("Authenticating...");
            try {
              const result = await login(email,password);
                if (result && result.success) {
                    setmessage(result.message || "Log in success");
                    const token = result.newtoken;
                    localStorage.setItem("token", token);
                    setTimeout(() => {
                        setmessage("");
                        navigate("/");
                    }, 3000);
                }
                else {
                    setmessage(result.message);
                    setTimeout(() => {
                        setmessage("");
                    }, 3000);
                }
            }
            catch (err: any) {
                setmessage(err?.response?.data?.message || "Unexpected Error");
                setTimeout(() => {
                    setmessage("");
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
                    onSubmit={formsubmit}
                >
                    <Card className="bg-transparent p-10 border backdrop-blur-lg  border-white">
                        <CardTitle className="text-white flex flex-row justify-between items-center">
                            <h1 className="text-4xl">Login</h1>
                            <p className="font-light text-xl">Genuine-Ai</p>
                        </CardTitle>
                        <CardDescription className="flex flex-col gap-5">
                            <div className="relative">
                                <input type="text" placeholder="Enter Email" className="outline-none border rounded-lg  border-white py-2 px-1 pl-8 pr-8 placeholder:text-white placeholder:font-light text-white w-full" value={email} onChange={(e) => setemail(e.target.value)} />
                                <i className="absolute left-2 top-3 fa-solid fa-envelope text-white"></i>
                            </div>
                            <div className="relative">
                                <i className="absolute left-2 top-3 fa-solid fa-key text-white"></i>
                                <input type={bool ? "password" : "text"} placeholder="Enter Password" className="outline-none border rounded-lg w-full border-white py-2 px-1 pl-8 pr-8 placeholder:text-white placeholder:font-light text-white" value={password} onChange={(e) => setpassword(e.target.value)} />
                                <i onClick={eyetoggle} className={`absolute right-2 top-3 fa-solid  ${bool ? "fa-eye-slash" : "fa-eye"}`}></i>
                            </div>
                            {message && <p className={`${message === "Log in successful" ? "text-green-600" : "text-red-600"}`}>{message}</p>}
                            <button className="bg-white active:translate-y-1 p-1 rounded-lg text-black">Login</button>
                            <NavLink to="/" className="text-center active:translate-y-1 text-[14px] text-black p-1 rounded-lg bg-white">
                                Back
                            </NavLink>
                        </CardDescription>
                        <div className="flex justify-between flex-row">
                            <p className="text-white font-light text-[14px]">
                                Don't Have An Account?
                            </p>
                            <NavLink to="/signin" className="font-light text-[14px] text-blue-600">
                                Sign up
                            </NavLink>
                        </div>
                         <div className="flex justify-between flex-row">
                            <p className="text-white font-light text-[14px]">
                                Forgot password?
                            </p>
                            <NavLink to="/passwordrequest" className="font-light text-[14px] text-blue-600">
                                Find
                            </NavLink>
                        </div>
                        <CardFooter><p className="text-[12px] text-gray-500">@2025 Genuine-Ai. All Rights Reserved.</p></CardFooter>
                    </Card>
                </motion.form>
            </div>
        </>
    )
}

export default Login;