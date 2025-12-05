import BackgroundParticles from "@/components/style/bgparticles";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { jwtDecode } from "jwt-decode";
import { type decodedtoken } from "@/components/props/props";
import axios from "axios";

const Userinfo = () => {
    const [message, setmessaage] = useState<string>("");
    const token = localStorage.getItem("token");
    const [bool, setbool] = useState<boolean>();
    const [warning, setwarning] = useState<boolean>();
    const userinfo = token ? jwtDecode<decodedtoken>(token) : null;
    const [username, setusername] = useState<string | undefined>(userinfo?.username);
    const [useremail, setuseremail] = useState<string | undefined>(userinfo?.email);
    const navigate = useNavigate();
    const formsubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!username) {
            setmessaage("Please Enter Username!")
            return;
        }
        else if (username.length > 8) {
            setmessaage("Username must not be greater than 8.")
        }
        else {

            try {
                const response = await axios.post("http://localhost:5000/api/changeusername", {
                    id: userinfo?.id,
                    username: username,
                    useremail: useremail,
                });
                if (response.data && response.data.success) {
                    setmessaage("Update successful");
                    setbool(true);
                    setTimeout(() => {
                        setmessaage("");
                    }, 3000)
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
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }
    const deleteuser = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/deleteuser", {
                id: userinfo?.id

            });
            if (response.data && response.data.success) {
                setmessaage(response.data.message || "Delete Successful");
                setwarning((prev) => !prev);
                setTimeout(() => {
                    setmessaage("");
                    localStorage.removeItem("token");
                    navigate("/login");
                }, 3000);

            }
        }
        catch (err: any) {
            setmessaage(err?.response.data.message || "Unexpected Error");
            setTimeout(() => {
                setmessaage("");
            }, 3000);
        }
    }
    return (
        <div className="flex justify-center items-center h-screen">
            {bool && <div className="fixed z-1000 backdrop-blur-lg top-1/2 left-1/2 p-5 flex flex-col rounded-lg gap-4 -translate-x-1/2 border border-white -translate-y-1/2 h-auto w-[300px]">
                <h1 className="text-red-600 text-center text-3xl">Changes Detected!</h1>
                <p className="text-white text-center">For Security.We need you to login again.Thank You!</p>
                <button className="text-black bg-white p-2 rounded-lg font-semibold  active:translate-y-1" onClick={logout}>I Understand!</button>
            </div>
            }
            {warning && <div className="fixed z-1000 backdrop-blur-lg top-1/2 left-1/2 p-5 flex flex-col rounded-lg gap-4 -translate-x-1/2 border border-white -translate-y-1/2 h-auto w-[300px]">
                <h1 className="text-red-600 text-center text-3xl">Delete User?</h1>
                <p className="text-white text-center">Are you sure do you want to delete account?</p>
                <button type="button" className="text-white bg-red-700 p-2 rounded-lg font-semibold active:translate-y-1" onClick={deleteuser}>Delete</button>
                <button type="button" onClick={() => setwarning(prev => !prev)} className="text-black bg-white p-2 rounded-lg font-semibold  active:translate-y-1">Back</button>
            </div>
            }
            <BackgroundParticles />
            <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onSubmit={formsubmit}>
                <Card className="bg-transparent p-10 border backdrop-blur-lg  border-white">
                    <CardTitle className="text-white flex flex-row justify-between items-center">
                        <h1 className="text-4xl">UserInfo</h1>
                        <p className="font-light text-xl">Genuine-Ai</p>
                    </CardTitle>
                    <CardDescription className="flex flex-col gap-5">
                        <div className="relative">
                            <input type="text" placeholder="Change Username" className="outline-none border rounded-lg  border-white py-2 px-1 pl-8 pr-8 placeholder:text-white placeholder:font-light text-white w-full" value={username} onChange={(e) => setusername(e.target.value)} />
                            <i className="absolute left-2 top-3 fa-solid fa-user text-white"></i>
                        </div>
                        <div className="relative">
                            <input type="text" placeholder="Enter Email" className="outline-none border rounded-lg  border-white py-2 px-1 pl-8 pr-8 placeholder:text-white placeholder:font-light text-white w-full" value={useremail} onChange={(e) => setuseremail(e.target.value)} />
                            <i className="absolute left-2 top-3 fa-solid fa-envelope text-white"></i>
                        </div>
                        {message && <p className={`${message === "Delete successful" ? "text-green-600" : "text-red-600"}`}>{message}</p>}
                        <button type="submit" onClick={formsubmit} className="bg-white active:translate-y-1 p-1 rounded-lg text-black">Change</button>
                        <button type="button" onClick={() => setwarning(prev => !prev)} className="bg-red-700 p-1 text-white active:translate-y-1 rounded-lg">Delete User</button>
                    </CardDescription>
                    <NavLink to="/playground" className="text-center active:translate-y-1 font-semi text-[14px] text-black p-2 rounded-lg bg-white">
                        Back
                    </NavLink>
                    <CardFooter>
                        <p className="text-[12px] text-gray-500">@2025 Genuine-Ai. All Rights Reserved.</p></CardFooter>
                </Card>
            </motion.form>
        </div>
    )
}

export default Userinfo;