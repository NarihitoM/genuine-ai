import type { message } from "@/components/props/props";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { chatbot } from "@/services/chatapi";

interface ChatProps {
    scrollToSection?: (ref: React.RefObject<HTMLElement | null>) => void; // void function 
    sectionRefs?: { [key: string]: React.RefObject<HTMLElement | null> }; // nav link//
}

const Chat: React.FC<ChatProps> = ({ scrollToSection, sectionRefs }) => {
    const navigate = useNavigate();
    const [message, setmessage] = useState<message[]>([{ sender: "ai", message: "Ask Any Questions?" }]);
    const [toggle, settoggle] = useState<any>();
    const [loading, setloading] = useState<boolean>()
    const move = useRef<any>(null);
    const [usermessage, setusermessage] = useState<string>("");
    const openmenu = () => {
        settoggle((prev: any) => !prev);
    }
    useEffect(() => {
        move.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const sendmessage = async () => {
        if (!usermessage)
            return;
        setmessage((prev) => [...prev, { sender: "user", message: usermessage }]);
        setusermessage("");
        setloading(true);
        setmessage(prev => [...prev, { sender: "ai", message: "Thinking...", loading: true }]);
        try {
            const result = await chatbot(usermessage);
            const action = result.action;
            if (action) {
                if (action.action === "navigate" && action.path) {
                    const sectionRef = sectionRefs?.[action.path];
                    if (sectionRef) {
                        scrollToSection?.(sectionRef);
                        setmessage(prev => [
                            ...prev.filter(msg => !msg.loading),
                            { sender: "ai", message: `Navigating to ${action.path}... Done.` }
                        ]);
                    }
                }
                else if (action.action === "open_url" && action.url) {
                    window.open(action.url, "_blank");
                    setmessage(prev => [
                        ...prev.filter(msg => !msg.loading),
                        { sender: "ai", message: `Opening link to ${action.url}... Done.` }
                    ]);
                }
                else if (action.action === "go" && action.navigatelink) {
                    navigate(action.navigatelink);
                    setmessage(prev => [
                        ...prev.filter(msg => !msg.loading),
                        { sender: "ai", message: `Navigating to ${action.navigatelink}... Done.` }
                    ]);
                }
                else {
                    setmessage(prev => [
                        ...prev.filter(msg => !msg.loading),
                        { sender: "ai", message: "Sorry, I couldn't process that action." }
                    ]);
                }
            }
            if (result && result.success) {
                setmessage(prev =>
                    prev.map(msg =>
                        msg.loading ? { sender: "ai", message: result.message } : msg
                    )
                );
                setloading(false);
            }
        }
        catch (err: any) {
            setmessage(prev =>
                prev.map(msg =>
                    msg.loading ? { sender: "ai", message: err?.response?.data?.message || "Unexpected Error" } : msg
                )
            );
            setloading(false);
        }
    }
    return (
        <><Outlet />
            <div className="fixed bottom-6 right-6 z-50">
                {!toggle && <button
                    onClick={openmenu}
                    className="bg-white hover:bg-white/40 text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 animate-bounce">
                    💬
                </button>
                }
                {toggle &&
                    <div className="fixed mt-4 bottom-3 right-2 max-md:bottom-3 max-md:right-5 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-4 flex flex-col animate-slide-up">
                        <div className="rounded-xl w-80 h-80 max-md:w-full max-md:h-80 flex z-2000 flex-col overflow-hidden">
                            <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                <h2 className="text-white font-semibold">Genuine-AI Chatbot</h2>
                                <button onClick={openmenu} className="text-white text-2xl"><X /></button>
                            </div>
                            <div className="flex-1 overflow-y-auto py-2 space-y-2" style={{ scrollbarWidth: "none" }}>
                                {message.map((element, index) => (
                                    <div key={index} className={`flex items-center ${element.sender === "user" ? "justify-end" : "justify-start"}`}>
                                        {element.sender === "ai" ? <h1 className="text-white rounded-full animate-spin">⚙️</h1> : ""}
                                        <div className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${element.sender === "user" ?
                                            "bg-white text-black rounded-br-none"
                                            : "bg-white text-black border rounded-bl-none"
                                            }`}>
                                            {element.message}
                                        </div>
                                    </div>))}
                                <div ref={move} />
                            </div>
                            <div className="flex gap-2 pt-1">
                                <input
                                    type="text"
                                    value={usermessage}
                                    onChange={(e) => setusermessage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !loading) {
                                            sendmessage();
                                        }
                                    }}
                                    placeholder="Type a message..."
                                    className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none"
                                />
                                <button onClick={sendmessage} className="px-4 py-2 text-[15px] active:translate-y-1 bg-white text-black rounded-xl hover:bg-black hover:text-white transition">
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Chat;