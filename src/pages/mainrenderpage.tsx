import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { type decodedtoken } from "@/components/props/props";
import BackgroundParticles from "@/components/style/bgparticles";
const Mainrenderpage = () => {
    const [toggle, settoggle] = useState<boolean>();
    const [button, buttontoggle] = useState<boolean>();
    const token = localStorage.getItem("token");
    const userinfo = token ? jwtDecode<decodedtoken>(token) : null;
    const navigate = useNavigate();
    const clicktoggle = () => {
        settoggle((prev) => {
            const state = !prev;
            if (state) {
                buttontoggle(false);
            }
            return state;
        });

    }
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }
    return (
        <>
            <div className="relative w-full flex flex-col h-screen">
                <BackgroundParticles />
                <header className=" w-full backdrop-blur-xl mb-10 bg-white/5 border-b border-white/10 p-7 z-100 shadow-[0_0_2px_0_black]">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-col">
                            <h1 className="text-2xl text-white">Genuine-Ai</h1>
                            <p className="text-[13px] text-white/50">PlayGround</p>
                        </div>
                        <div className="flex flex-row max-md:hidden gap-3 cursor-pointer justify-center items-center">
                            <p onClick={() => navigate("/")} className="text-white text-[17px]">Home</p>
                            <NavLink to={"/playground"} className={({ isActive }) =>
                                isActive ? "text-white font-bold text-[17px]" : "text-white text-[17px]"
                            }>Menu</NavLink>
                            <NavLink to={"/humanize"} className={({ isActive }) =>
                                isActive ? "text-white font-bold text-[17px]" : "text-white text-[17px]"
                            }>Hummanize-AI</NavLink>
                            <NavLink to={"/chatcode"} className={({ isActive }) =>
                                isActive ? "text-white font-bold text-[17px]" : "text-white text-[17px]"
                            }>ChatCode</NavLink>
                            <NavLink to={"/history"} className={({ isActive }) =>
                                isActive ? "text-white font-bold text-[17px]" : "text-white text-[17px]"
                            }>History</NavLink>
                        </div>
                        <div className="backdrop-blur-lg p-2 border border-gray-600 rounded-lg relative max-md:hidden flex flex-row justify-center items-center gap-3">
                            <h1 onClick={() => buttontoggle((prev) => !prev)} className="text-blue-600 font-bold">{userinfo?.username}</h1>
                            <button className="p-1.5 border-black border bg-red-600 flex gap-1 justify-center items-center rounded-lg text-white text-[14px]" onClick={logout}>Sign out</button>
                            {button &&
                                <div className="absolute py-5 px-2 rounded-lg flex gap-3 flex-col bg-white/5 top-15 -left-2 h-auto w-auto">
                                    <button onClick={() => navigate("/userinfo")} className="active:translate-y-1 border p-1 rounded-lg border-white bg-black text-white w-[130px]">Profile</button>
                                </div>
                            }
                        </div>
                        <div className="flex flex-row relative md:hidden">
                            <button onClick={clicktoggle} className="text-white">
                                {toggle ? <X className="w-8 h-8"></X> : <Menu className="w-7 h-7"></Menu>}
                            </button>
                            {toggle && <div className="flex flex-col bg-black/80 border border-white/10 backdrop-blur-md py-4
                                                       rounded-lg  md:hidden -right-6.5 top-18 gap-3 cursor-pointer justify-center absolute w-30 items-center">
                                <p onClick={() => navigate("/")} className="text-white text-[14px]">Home</p>
                                <NavLink to={"/playground"} className={({ isActive }) =>
                                    isActive ? "text-white font-bold text-[14px]" : "text-white text-[14px]"
                                }>Menu</NavLink>
                                <NavLink to={"/humanize"} className={({ isActive }) =>
                                    isActive ? "text-white font-bold text-[14px]" : "text-white text-[14px]"
                                }>Hummanize-AI</NavLink>
                                <NavLink to={"/chatcode"} className={({ isActive }) =>
                                    isActive ? "text-white font-bold text-[14px]" : "text-white text-[14px]"
                                }>ChatCode</NavLink>
                                <NavLink to={"/history"} className={({ isActive }) =>
                                    isActive ? "text-white font-bold text-[14px]" : "text-white text-[14px]"
                                }>History</NavLink>
                                <div className="flex justify-center  py-2 px-2 rounded-lg items-center flex-col gap-2 relative">
                                    <p onClick={() => buttontoggle((prev) => !prev)} className="text-blue-600 text-[14px] font-bold">{userinfo?.username}</p>
                                    <button className="p-1.5 border border-black bg-red-600 flex gap-1 justify-center items-center rounded-lg text-white text-[14px]" onClick={logout}>Sign out</button>
                                    {button &&
                                        <div className="absolute py-5 px-2 rounded-lg flex gap-3 flex-col bg-white/5 right-24 h-auto">
                                            <button onClick={() => navigate("/userinfo")} className="border p-1 rounded-lg active:translate-y-1 border-white bg-black text-white w-[200px]">Profile</button>
                                        </div>
                                    }
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </header>
                <main className="h-screen flex-1 mt-auto grow">
                    <Outlet />
                </main>
               
            </div>
        </>
    )
}

export default Mainrenderpage;