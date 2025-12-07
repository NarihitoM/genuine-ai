import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Menu, X } from "lucide-react";
import Chatbot from "@/global/chatbot";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { Card, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import BackgroundParticles from "../components/style/bgparticles";
import Humanize from "../assets/humanize.jpg"
import Chat from "../assets/Chatbot.jpg";
import Instant from "../assets/instant.jpg";
import Observer from "../components/style/observer";
import Tool from "../assets/Tools.jpg";
import Icon from "../assets/Icon.jpg";
import { jwtDecode } from "jwt-decode";
import { type decodedtoken } from "@/components/props/props";

const Mainpage = () => {
    const token = localStorage.getItem("token");
    const userinfo = token ? jwtDecode<decodedtoken>(token) : null;
    const [toggle, settoggle] = useState<boolean>(false);
    const [button, buttontoggle] = useState<boolean>();
    const home = useRef<HTMLElement>(null);
    const About = useRef<HTMLElement>(null);
    const Features = useRef<HTMLElement>(null);
    const Pricing = useRef<HTMLElement>(null);

    const Ref = (object: React.RefObject<HTMLElement | null>) => {
        object.current?.scrollIntoView({ behavior: "smooth" });
    }

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
    const navigate = useNavigate();
    return (
        <>
            <div className="relative w-full min-h-screen">
                <header className="fixed top-0 left-0 w-full backdrop-blur-xl bg-white/5 border-b border-white/10 p-7 z-100 shadow-[0_0_2px_0_black]">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row">
                            <h1 className="text-white text-2xl">Genuine-Ai</h1>
                        </div>
                        <div className="flex flex-row max-md:hidden gap-5 cursor-pointer justify-center items-center">
                            <p onClick={() => Ref(home)} className="text-white text-[17px] active:bg-white/5 active:rounded-lg">Home</p>
                            <p onClick={() => Ref(About)} className="text-white text-[17px] active:bg-white/5 active:rounded-lg">About</p>
                            <p onClick={() => Ref(Features)} className="text-white text-[17px] active:bg-white/5 active:rounded-lg">Features</p>
                            <p onClick={() => Ref(Pricing)} className="text-white text-[17px] active:bg-white/5 active:rounded-lg">Pricing</p>
                            {token ? <p className="text-white text-[17px]" onClick={() => navigate("/playground")}>Playground</p> : ""}
                            {token ?
                                <div className="backdrop-blur-lg p-2 border border-gray-600 rounded-lg relative max-md:hidden flex flex-row justify-center items-center gap-3">

                                    <h1 onClick={() => buttontoggle((prev) => !prev)} className="text-blue-600 font-bold">{userinfo?.username}</h1>
                                    <button className="p-1.5 border-black border bg-red-600 flex gap-1 justify-center items-center rounded-lg text-white text-[14px]" onClick={logout}>Sign out</button>
                                    {button &&
                                        <div className="absolute py-5 px-2 rounded-lg flex gap-3 flex-col bg-white/5 top-15 -left-2 h-auto w-auto">
                                            <button onClick={() => navigate("/userinfo")} className="active:translate-y-1 border p-1 rounded-lg border-white bg-black  text-white w-[130px]">Profile</button>
                                        </div>
                                    }
                                </div>
                                : <button onClick={() => navigate("/signin")} className="p-1.5 shadow-[0_0_5px_0_white] flex gap-1 justify-center items-center rounded-lg text-white text-[14px] active:translate-y-1">Sign in</button>
                            }</div>
                        <div className="flex flex-row relative md:hidden">
                            <button onClick={clicktoggle} className="text-white">
                                {toggle ? <X className="w-8 h-8"></X> : <Menu className="w-7 h-7"></Menu>}
                            </button>
                            {toggle && <div className="flex flex-col bg-black/80 border border-white/10 backdrop-blur-md py-4
                                                    rounded-lg  md:hidden -right-6.5 top-15 gap-3 cursor-pointer justify-center absolute w-25 items-center">
                                <p onClick={() => Ref(home)} className="text-white text-[14px] active:bg-white/5 active:rounded-lg">Home</p>
                                <p onClick={() => Ref(About)} className="text-white text-[14px] active:bg-white/5 active:rounded-lg">About</p>
                                <p onClick={() => Ref(Features)} className="text-white text-[14px] active:bg-white/5 active:rounded-lg">Features</p>
                                <p onClick={() => Ref(Pricing)} className="text-white text-[14px] active:bg-white/5 active:rounded-lg">Pricing</p>
                                {token ? <p className="text-white text-[14px]" onClick={() => navigate("/playground")}>Playground</p> : ""}
                                {token ? <div className="flex justify-center  py-2 px-2 rounded-lg items-center flex-col gap-2 relative">

                                    <p onClick={() => buttontoggle((prev) => !prev)} className="text-blue-600 text-[14px] font-bold">{userinfo?.username}</p>
                                    <button className="p-1.5 border border-black bg-red-600 flex gap-1 justify-center items-center rounded-lg text-white text-[14px]" onClick={logout}>Sign out</button>
                                    {button &&
                                        <div className="absolute py-5 px-2 rounded-lg flex gap-3 flex-col bg-white/5 right-26 h-auto">
                                            <button onClick={() => navigate("/userinfo")} className="border p-1 rounded-lg active:translate-y-1 border-white bg-black text-white w-[200px]">Profile</button>

                                        </div>
                                    }
                                </div> : <button onClick={() => navigate("/signin")} className="p-1.5 shadow-[0_0_5px_0_white] flex gap-1 justify-center items-center rounded-lg text-white text-[14px] active:translate-y-1">Sign in</button>}
                            </div>
                            }
                        </div>
                    </div>
                </header>
                <main className="grow">
                    <BackgroundParticles />
                    <section ref={home} className="relative flex justify-center items-center h-auto w-full overflow-hidden pt-20">
                        <div className="flex flex-col gap-5 justify-center items-center">
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: -10 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="text-white text-center text-5xl max-md:text-3xl">Humanize Your Text Instantly</motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: -10 }}
                                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                                className="text-white text-xl max-md:px-15 max-md:text-[14px] text-center font-medium">
                                Turn Rotbotic Ai-generated content into natural,readable, and engaging text.{<br></br>}Perfect for <Typewriter
                                    words={['Blogs', 'Email', 'Content']}
                                    loop={0}
                                    cursor
                                    cursorStyle=""
                                    typeSpeed={70}
                                    deleteSpeed={50}
                                    delaySpeed={1000}
                                /> and more.
                            </motion.p>
                            <div className="flex flex-row max-md:gap-2 gap-4">
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: -10 }}
                                    onClick={() => navigate("/playground")}
                                    transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                                    className="bg-white active:translate-y-1 p-2 rounded-lg font-semibold border-b border border-white">
                                    Humanize Text Now
                                </motion.button>
                            </div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: -5 }}
                                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                                className="w-6 h-10 border-2 border-white rounded-2xl flex justify-center items-start"
                            >
                                <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
                            </motion.div>
                        </div>
                    </section>

                    <section ref={About} className=" relative flex justify-center h-auto w-full overflow-hidden pt-20">
                        <Observer>
                            <h1 className="text-white text-5xl text-center max-md:text-3xl">About Us</h1>
                            <Observer>
                                <div className="flex flex-row justify-between items-center max-md:flex-col max-md:gap-6 px-10 py-5 w-full">

                                    <div className="flex flex-col w-full">
                                        <motion.h1
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: -10 }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="text-white text-3xl max-md:text-2xl max-md:text-center"
                                        >
                                            Who we are?
                                        </motion.h1>
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: -10 }}
                                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                                            className="text-white font-medium animate-pulse max-md:text-center"
                                        >
                                            Our mission is to make AI-generated content feel real.
                                            <br />
                                            We believe every piece of text should read like it was written by a human —
                                            smooth, engaging, and relatable.
                                        </motion.p>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <img src={Icon} className="w-58 h-58 max-md:w-40 max-md:h-40 object-contain" />
                                    </div>
                                </div>
                            </Observer>
                            <Observer>
                                <div className="flex flex-row justify-evenly items-center max-md:flex-col max-md:gap-6 px-10 py-5 w-full">
                                    <div className="flex flex-col w-full">
                                        <motion.h1
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: -10 }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="text-white text-3xl max-md:text-2xl max-md:text-center"
                                        >
                                            Why we created this tool?
                                        </motion.h1>
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: -10 }}
                                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                                            className="text-white font-medium animate-pulse max-md:text-center"
                                        >
                                            AI-generated content is incredibly powerful, but it often lacks the
                                            nuance, flow, and personality that make writing compelling.
                                            <br />
                                            Many writers, marketers, and businesses struggle to polish AI text
                                            without spending hours rewriting manually.
                                        </motion.p>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <img src={Tool} className="w-72 h-72 max-md:w-56 max-md:h-56 object-contain" />
                                    </div>
                                </div>
                            </Observer>
                        </Observer>
                    </section>

                    <section ref={Features} className="relative flex justify-center h-auto w-full overflow-hidden pt-20">
                        <Observer>
                            <h1 className="text-white text-5xl text-center max-md:text-3xl">Features</h1>
                            <br></br>
                            <Observer>
                                <div className="w-full flex px-10 py-10 flex-row max-md:flex-col gap-10 justify-center">
                                    <Observer>
                                        <div className="w-full max-w-sm bg-black border-b border-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-amber-100 transition-transform transform hover:-translate-y-2 ">
                                            <img
                                                src={Humanize}
                                                alt="Humanize"
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="p-6 text-white">
                                                <h3 className="text-xl font-bold mb-2">Humanize</h3>
                                                <p className="text-gray-300 max-md:text-[14px]">
                                                    Transform robotic AI-generated text into smooth, natural, human-like content instantly.
                                                </p>
                                            </div>
                                        </div>
                                    </Observer>
                                    <Observer>
                                        <div className="w-full max-w-sm bg-black border-b border-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-amber-100  transition-transform transform hover:-translate-y-2 ">
                                            <img
                                                src={Chat}
                                                alt="Custom Tone"
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="p-6 text-white">
                                                <h3 className="text-xl font-bold mb-2">ChatCode</h3>
                                                <p className="text-gray-300 max-md:text-[14px]">
                                                    Interact with a human-like AI assistant that helps you make code instantly.</p>
                                            </div>
                                        </div>
                                    </Observer>
                                    <Observer>
                                        <div className="w-full max-w-sm bg-black border-b border-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-amber-100 transition-transform transform hover:-translate-y-2">
                                            <img
                                                src={Instant}
                                                alt="Instant Results"
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="p-6 text-white">
                                                <h3 className="text-xl font-bold mb-2">Instant Results</h3>
                                                <p className="text-gray-300 max-md:text-[14px]">
                                                    Humanize your content in seconds—no manual editing needed, perfect for busy writers and creators.
                                                </p>
                                            </div>
                                        </div>
                                    </Observer>
                                </div>
                            </Observer>
                        </Observer>
                    </section>
                    <section ref={Pricing} className="relative flex justify-center h-auto w-full overflow-hidden pt-20">
                        <Observer>
                            <h1 className="text-white text-5xl text-center max-md:text-3xl">Pricing</h1>
                            <br></br>
                            <Observer>
                                <div className="flex flex-row py-10 max-md:flex-col gap-10">
                                    <Card className="border-b p-3 w-full bg-black max-md:w-[350px] border-white hover:shadow-[0_0_10px_0_white]">
                                        <CardTitle className="text-start">
                                            <h1 className="text-white font-light">Basic</h1>                             </CardTitle>
                                        <CardDescription className="flex flex-col justify-start gap-3 items-start">
                                            <div className="flex flex-row justify-center gap-2 items-end">
                                                <h1 className="text-white text-4xl">$0</h1>/<p>per month</p>
                                            </div>
                                            <p>Perfect for individuals just starting out</p>
                                            {token ?
                                                (userinfo?.tier === "free" ?
                                                    (<button disabled className="w-full text-white bg-black border border-white p-2 rounded-lg">
                                                        <i className="fas fa-check text-green-500 mr-2"></i>
                                                        Your current tier.
                                                    </button>) :
                                                    <button disabled className="w-full  bg-black border text-white border-white p-2 rounded-lg">
                                                        <i className="fas fa-check text-green-500 mr-2"></i>
                                                        Already Upgrade.
                                                    </button>) :
                                                (<button onClick={() => navigate("/login")} className="w-full text-black bg-white p-2 rounded-lg active:translate-y-1">
                                                    Start for free
                                                </button>
                                                )}
                                        </CardDescription>
                                        <CardFooter className="flex flex-col justify-start items-start">
                                            <div className="flex items-center font-light text-white gap-2">
                                                <i className="fas fa-check text-green-500 mr-2"></i>
                                                <p>Humanize Up To 10 times/day</p>
                                            </div>
                                            <div className="flex items-center font-light text-white gap-2">
                                                <i className="fas fa-check text-green-500 mr-2"></i>
                                                <p>Ai-code Assistance Up To 10 times/day</p>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                    <Card className="border-b p-3 w-full max-md:w-[350px] bg-black border-white hover:shadow-[0_0_10px_0_white]">
                                        <CardTitle className="text-start">
                                            <h1 className="text-white font-light">Best Pack</h1>
                                        </CardTitle>
                                        <CardDescription className="flex flex-col justify-start gap-3 items-start">
                                            <div className="flex flex-row justify-center gap-2 items-end">
                                                <h1 className="text-white text-4xl">$20</h1>/<p>Life-Time</p>
                                            </div>
                                            <p>Perfect for working with small organizations</p>
                                            {token ?
                                                (userinfo?.tier === "admin" ?
                                                    (<button disabled className="w-full text-white bg-black border border-white p-2 rounded-lg">
                                                        <i className="fas fa-check text-green-500 mr-2"></i>
                                                        You are now Admin
                                                    </button>) :
                                                    userinfo?.tier === "premium" ? (<button disabled className="w-full text-white  bg-black border border-white p-2 rounded-lg">
                                                        <i className="fas fa-check text-green-500 mr-2"></i>
                                                           Your current tier.
                                                    </button>) : (<button className="w-full bg-purple-700 text-white active:translate-y-1 p-2 rounded-lg">
                                                           Upgrade to premium.
                                                    </button>)) :
                                                (<button onClick={() => navigate("/login")} className="w-full  bg-purple-700 text-white active:translate-y-1 p-2 rounded-lg">
                                                           Upgrade to premium.
                                                    </button>
                                                )}
                                        </CardDescription>
                                        <CardFooter className="flex flex-col justify-start items-start">
                                            <div className="flex items-center font-light text-white gap-2">
                                                <i className="fas fa-check text-green-500"></i>
                                               <p>Humanize Up To 25 times/day</p>
                                            </div>
                                            <div className="flex items-center font-light text-white gap-2">
                                                <i className="fas fa-check text-green-500"></i>
                                                 <p>Ai-code Assistance Up To 25 times/day</p>
                                            </div>
                                           
                                        </CardFooter>
                                    </Card>
                                </div>
                            </Observer>
                        </Observer>
                    </section>
                </main>
                <footer className="w-full bg-black border-t border-white/10 p-10 text-white">
                    <Observer>
                        <div className="max-w-6xl mx-auto grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-10">
                            <div>
                                <h2 className="text-2xl font-bold">Genuine-AI</h2>
                                <p className="text-gray-400 mt-2 text-sm">
                                    Transform robotic AI content into smooth, natural, engaging writing instantly.{<br></br>}
                                    Developed By <a href="https://narihito-portfolio.vercel.app" className="text-blue-600">Narihito.</a>
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                                <ul className="space-y-2 text-gray-300 font-light cursor-pointer">
                                    <li onClick={() => Ref(home)}>Home</li>
                                    <li onClick={() => Ref(About)}>About</li>
                                    <li onClick={() => Ref(Features)}>Features</li>
                                    <li onClick={() => Ref(Pricing)}>Pricing</li>
                                    <li onClick={() => navigate("/signin")}>Sign In</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Features</h3>
                                <ul className="space-y-2 text-gray-300 font-light cursor-pointer">
                                    <li onClick={() => Ref(Features)}>Humanize Text</li>
                                    <li onClick={() => Ref(Features)}>AI Chatbot</li>
                                    <li onClick={() => Ref(Features)}>Instant Results</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-3 cursor-pointer">Contact</h3>
                                <p className="text-gray-300 cursor-pointer font-light">heinboss234@gmail.com</p>
                                <p className="text-gray-300 cursor-pointer font-light">Yangon,Myanmar.</p>
                                <p className="text-gray-300 mt-1 cursor-pointer font-light">(+95)09986287158</p>
                            </div>
                        </div>
                        <div className="text-center text-gray-500 text-sm mt-10">
                            ©{new Date().getFullYear()} Genuine-AI. All rights reserved.
                        </div>
                    </Observer>
                </footer>
                <Chatbot
                    scrollToSection={Ref}
                    sectionRefs={{ home, About, Features, Pricing }}
                />
            </div>
        </>
    )
}

export default Mainpage;