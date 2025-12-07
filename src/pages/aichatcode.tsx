import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { type decodedtoken } from "@/components/props/props";
import { chatcode } from "@/services/chatapi";
const Aichatcode = () => {
    const [content, setcontent] = useState<string>("");
    const [aicontent, setaicontent] = useState<string>("");
    const [bool, setbool] = useState<boolean>();
    const [warning, setwarning] = useState<string>("");
    const [loading, setloading] = useState<boolean>();
    const token = localStorage.getItem("token");
    const userinfo = token ? jwtDecode<decodedtoken>(token) : null;

    const send = async () => {
        if (!content) {
            setbool(true);
            setwarning("Please Enter Content.");
            setTimeout(() => {
                setbool(false);
            }, 3000);
        }
        else {
                setloading(true);
                try {
                    const result = await chatcode(content,userinfo?.id);
                    if (result.success && result) {
                        const action = result.action;
                        setaicontent(action.code);
                        setloading(false);
                    }
                }
                catch (err: any) {
                    setbool(true);
                    setwarning(err?.response?.data?.message || "Unexpected Error");
                    setloading(false);
                    setTimeout(() => {
                        setbool(false);
                    }, 3000);
                }
            }
    }
    return (
        <>
            {bool &&
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="fixed z-1000 top-0 left-0 p-5 h-auto w-auto rounded-lg bg-white">
                    <p className="text-red-700 flex flex-row gap-4 items-center"><X></X>{warning}</p>
                </motion.div>
            }
            <div className="flex justify-center items-center h-screen relative">
                <div className="flex flex-row max-md:flex-col justify-center items-center gap-10 w-11/12">
                    <h1 className="text-white text-3xl max-md:text-xl text-center">Coding Assistance</h1>
                    <div className="w-full h-[350px] max-md:h-[250px] border border-white rounded-lg bg-black p-2 flex flex-col items-center gap-3">
                        <textarea style={{ scrollbarWidth: "none" }}
                            className="flex-1 bg-black text-white outline-none w-full resize-none"
                            placeholder="Write Code..."
                            value={content} onChange={(e) => setcontent(e.target.value)}></textarea>
                        <div className="flex flex-row justify-between gap-5">
                            <button onClick={send} className="bg-white active:translate-y-1 text-black px-4 py-2 rounded-lg shrink-0 flex justify-end">
                                {loading ? <span>Validating...</span> : <span>Check</span>}
                            </button>
                            <button onClick={() => setcontent("")} className="bg-white active:translate-y-1 text-black px-4 py-2 rounded-lg shrink-0 flex justify-end">
                                Delete
                            </button>
                        </div>
                    </div>
                    <div className="w-full h-[350px] max-md:h-[250px] border border-white rounded-lg bg-black p-2 flex flex-col items-center gap-3">
                        <textarea style={{ scrollbarWidth: "none" }} readOnly
                            className="flex-1 bg-black text-green-700 placeholder:text-white outline-none w-full resize-none "
                            placeholder={loading ? "Fixing the code...." : "Results"}
                            value={aicontent}></textarea>
                        <div className="flex flex-row justify-between gap-5">
                            <button onClick={() => navigator.clipboard.writeText(aicontent)} className="bg-white active:translate-y-1 text-black px-4 py-2 rounded-lg shrink-0 flex justify-end active:translate-y-1">
                                Copy
                            </button>
                            <button onClick={() => setaicontent("")} className="bg-white text-black active:translate-y-1 px-4 py-2 rounded-lg shrink-0 flex justify-end">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Aichatcode;