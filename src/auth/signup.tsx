import BackgroundParticles from "@/components/style/bgparticles";
import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { signup } from "@/services/api";

const Signup = () => {
    const [username, setusername] = useState<string>("");
    const [email, setemail] = useState<string>("");
    const [password, setpassword] = useState<string>("");
    const [confirmpassword, setconfirmpasword] = useState<string>("");
    const [message, setmessage] = useState<string>("");
    const [bool, setbool] = useState<boolean>(true);
    const [bool1, setbool1] = useState<boolean>(true);
    const [loading, setloading] = useState<boolean>();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const navigate = useNavigate();
    const eyetoggle = () => {
        setbool((prev) => !prev);
    }
    const eyetoggle1 = () => {
        setbool1((prev) => !prev);
    }
    const formsubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!username) {
            setmessage("Please Enter Username");
            setTimeout(() => {
                setmessage("");
            }, 3000);
            return;
        }
        else if (username.length > 7) {
            setmessage("Username must not be greater than 7");
            setTimeout(() => {
                setmessage("");
            }, 3000);
            return;
        }
        else if (!email || !emailRegex.test(email)) {
            setmessage("Please Enter Valid Email Address");
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
        else if (!confirmpassword) {
            setmessage("Please Enter Confirm Password");
            setTimeout(() => {
                setmessage("");
            }, 3000);
            return;
        }
        else if (confirmpassword.length < 7) {
            setmessage("Password length must be greater than 7");
            setTimeout(() => {
                setmessage("");
            }, 3000);
            return;
        }
        else if (confirmpassword !== password) {
            setmessage("Password do not match!")
            setTimeout(() => {
                setmessage("");
            }, 3000);
            return;
        }
        else {
            setloading(true);
            setTimeout(() => {
                setloading(false);
            }, 3000);
            setmessage("Authenticating...")
            try {
                const result = await signup(username, email, password);
                if (result && result.success) {
                    localStorage.setItem("email", result.email);
                    navigate("/confirmemail");
                    setmessage("");
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
                            <h1 className="text-4xl">Sign Up</h1>
                            <p className="font-light text-xl">Genuine-Ai</p>
                        </CardTitle>
                        <CardDescription className="flex flex-col gap-5">
                            <div className="relative">
                                <input type="text" placeholder="Enter Username" className="outline-none border rounded-lg  border-white py-2 px-1 pl-8 pr-8 placeholder:text-white placeholder:font-light text-white w-full" value={username} onChange={(e) => setusername(e.target.value)} />
                                <i className="absolute left-2 top-3 fa-solid fa-user text-white"></i>
                            </div>
                            <div className="relative">
                                <input type="text" placeholder="Enter Email" className="outline-none border rounded-lg  border-white py-2 px-1 pl-8 pr-8 placeholder:text-white placeholder:font-light text-white w-full" value={email} onChange={(e) => setemail(e.target.value)} />
                                <i className="absolute left-2 top-3 fa-solid fa-envelope text-white"></i>
                            </div>

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
                            {message && <p className={`${message === "Sign Up Successful" || message === "Authenticating..." ? "text-green-600" : "text-red-600"}`}>{message}</p>}
                            <button type="submit" disabled={loading} className="bg-white p-1 rounded-lg active:translate-y-1 text-black">Sign Up</button>
                            <NavLink to="/" className="active:translate-y-1 text-center text-[14px] text-black p-1 rounded-lg bg-white">
                                Back
                            </NavLink>
                        </CardDescription>

                        <div className="flex justify-between flex-row">
                            <p className="text-white font-light text-[14px]">
                                Already have an account?
                            </p>
                            <NavLink to="/login" className="font-light text-[14px] text-blue-600">
                                Login
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
                        <CardFooter>
                            <p className="text-[12px] text-gray-500">@2025 Genuine-Ai. All Rights Reserved.</p></CardFooter>
                    </Card>
                </motion.form>
            </div>

        </>
    )
}

export default Signup;