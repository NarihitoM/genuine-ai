import { type decodedtoken, type chatcode, type humanize } from "@/components/props/props";
import { useEffect, useState } from "react";
import { deletechatcodeindex, deletehumanizeindex, getchatcode, gethumanize } from "@/services/chatapi";
import { Copy, Check, Trash } from "lucide-react";
import { jwtDecode } from "jwt-decode";


const History = () => {
    const [chatcode, chatcodehistory] = useState<chatcode[]>([]);
    const [humanize, humanizehistory] = useState<humanize[]>([]);
    const [copy, setcopy] = useState<number | null>();
    const token = localStorage.getItem("token");
    const userinfo = token ? jwtDecode<decodedtoken>(token) : null;
    const [forcerefresh,setforcerefresh] = useState<boolean>(false);
    useEffect(() => {
        const fetchgetchatcode = async () => {
            try {
                const result = await getchatcode(token);
                if (result && result.success) {
                    chatcodehistory(result.data);
                    console.log("done");
                    console.log(result.data);
                }
            }
            catch (err) {
                console.log(err);
            }
        };
        const fetchgethumanize = async () => {
            try {
                const result = await gethumanize(token);
                if (result && result.success) {
                    humanizehistory(result.data);
                    console.log("Done");
                    console.log(result.data);
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchgetchatcode(); 
        fetchgethumanize();
    }, [forcerefresh]);

    const deletechatcode = async (index: number) => {
        try {
            const result = await deletechatcodeindex(userinfo?.id, index);
            if (result && result.success) {
                console.log(result.message);
              
            }
        }
        catch (err : any) {
            console.log(err.response?.data.message);
        }
    }
    const deletehumanize = async (index : number) =>
    {
        try{
        const result = await deletehumanizeindex(userinfo?.id,index);
        if(result && result.success)
        {
            console.log(result.message);
        }
        }
        catch(err : any)
        {
            console.log(err?.response?.data.message);
        }
    }
    return (
        <div className="relative flex flex-col justify-center items-center gap-10 h-screen">
            <h1 className="text-white text-5xl">History</h1>
            <div className="flex flex-row justify-between gap-10 max-md:flex-col max-md:justify-center">
                <div className="flex flex-col">
                    <h1 className="text-white text-3xl">Humanize</h1>
                    <div className="overflow-y-auto p-2  h-[400px] w-[400px] max-md:h-[250px] max-md:w-[250px]" style={{ scrollbarWidth: "none" }}>
                        <ol className="list-decimal ml-5">
                            {humanize.map((element) => (
                                element.textcontent.map((text, index) => (<>
                                    <li key={index} className="text-white py-2">
                                        <p className="text-black rounded-lg p-2 bg-white border border-white mb-1">
                                            {text}
                                        </p>
                                        <button className="bg-white p-1 rounded-lg active:translate-y-1" onClick={() => {
                                            navigator.clipboard.writeText(text); setcopy(index); setTimeout(() => {
                                                setcopy(null);
                                            }, 2000);
                                        }}>  {copy === index ? <Check className="w-5 h-5 text-black"></Check> : <Copy className="w-5 h-5 text-black" />}</button>
                                        <button className="bg-red-700 p-1 rounded-lg ml-3 active:translate-y-1" onClick={() => {deletehumanize(index);setforcerefresh(prev => !prev) }}>   <Trash className="w-5 h-5 text-white" /></button>
                                    </li>
                                </>
                                ))
                            ))}
                        </ol>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-white text-3xl">Chatcode</h1>
                    <div className="overflow-y-auto p-2 h-[400px] w-[400px] max-md:h-[250px] max-md:w-[250px]" style={{ scrollbarWidth: "none" }}>
                        <ol className="list-decimal ml-5">
                            {chatcode.map((element) => (
                                element.textcontent.map((text, index) => (<>
                                    <li key={index} className="text-white py-2">
                                        <p className="text-black rounded-lg p-2 bg-white border border-white mb-1">
                                            {text}
                                        </p>
                                        <button className="bg-white p-1 rounded-lg active:translate-y-1" onClick={() => {
                                            navigator.clipboard.writeText(text); setcopy(index); setTimeout(() => {
                                                setcopy(null);
                                            }, 2000);
                                        }}>   {copy === index ? <Check className="w-5 h-5 text-black"></Check> : <Copy className="w-5 h-5 text-black" />}</button>
                                        <button className="bg-red-700 p-1 rounded-lg ml-3 active:translate-y-1" onClick={() => {deletechatcode(index); setforcerefresh(prev => !prev)}}>   <Trash className="w-5 h-5 text-white" /></button>
                                    </li>
                                </>
                                ))
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History;