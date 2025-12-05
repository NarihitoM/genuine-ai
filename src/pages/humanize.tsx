import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { type decodedtoken } from "@/components/props/props";
const Humanize = () => {

   const [content, setcontent] = useState<string>("");
   const [warning, setwarning] = useState<string>("");
   const [bool, setbool] = useState<boolean>();
   const [togglepopup, settogglepopup] = useState<boolean>();
   const [isaimessage, setisaimessage] = useState<string>("Hello");
   const [isai, setisai] = useState<boolean>();    
   const [displayed,setdisplayed] = useState<boolean>();
   const [loading,setloading] = useState<boolean>();
   const token = localStorage.getItem("token");
   const userinfo = token ? jwtDecode<decodedtoken>(token) : null;
   const copytext = () =>
   {
      navigator.clipboard.writeText(isaimessage);
   }
   const back = () =>
   {
       settogglepopup((prev) => !prev);
   }
   const sendtext = async () => {
      
      setdisplayed(true);
      setTimeout(() => {
         setdisplayed(false);
      }, 2000);
      if (!content) {
         setbool(true);
         setwarning("Please Enter Content!");
         setTimeout(() => {
            setbool(false);
         }, 3000);
      }
      else if (content.length < 100) {
         setbool(true);
         setwarning("Text Content should be greater than 100 words.")
         setTimeout(() => {
            setbool(false);
         }, 3000);
      }
      else {
         setloading(true);
         try {
            const response = await axios.post("http://localhost:4000/api/humanize",
               {
                  textcontent: content,
                  id : userinfo?.id,
               });
            if (response.data && response.data.success) {
               const action = response.data.action;
               const isai = action.ai;
               const isaimessage = action.text;
               settogglepopup(true);
               setisai(isai);
               setisaimessage(isaimessage);
               setloading(false);
            }
         }
         catch (err: any) {
            settogglepopup(false);
            setbool(true);
            setwarning(err?.response?.data.message || "Unexpected Error");
            setloading(false);
            setTimeout(() => {
               setbool(false);
               setwarning("");
            }, 3000);
         }
      }
   }
   return (
      <>
         <div className="relative flex flex-col justify-center items-center h-screen gap-6">
            {bool &&
               <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="fixed z-1000 top-0 left-0 p-5 h-auto w-100 rounded-lg bg-white">
                  <p className="text-red-700 flex flex-row gap-4 items-center"><X></X>{warning}</p>
               </motion.div>
            }
            {togglepopup &&
               <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="z-1000 border border-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-lg flex flex-col gap-2  h-auto w-10/12 p-3 rounded-lg">
                  <div className="justify-center items-center p-3">
                     <p className="text-white text-center font-bold text-2xl">Ai Test Result : {!isai ? <span className="text-green-700">Not Ai</span> : <span className="text-red-700">Is Ai</span>}</p>
                  </div>
                   
                  <div className="flex-1 overflow-auto space-y-3 flex flex-col justify-center items-center">
                    <h1 className="text-3xl text-white">Clean Results:</h1>
                     <textarea readOnly value={isaimessage === "" ? "This Text Is Already Humanize." : isaimessage} style={{ scrollbarWidth: "none" }} className="text-white p-2 w-10/12 h-[200px] resize-none outline-none border border-white rounded-lg">
                     </textarea>
                  </div>
                  <div className="flex flex-row gap-3 justify-center items-center mt-2">
                     <button onClick={copytext} className="text-black bg-white p-2 rounded-lg ">Copy</button>
                     <button onClick={back} className="text-black bg-white p-2 rounded-lg ">Back</button>
                  </div>
               </motion.div>
            }
            <h1 className="text-white text-3xl text-center font-semibold">
               Humanize any AI-generated text with one click.{<br></br>}
               Perfect For&nbsp;
               <Typewriter
                  words={['Message', 'Blogswriting', 'Contentwriting']}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={800}
               />
            </h1>
            <div className="w-11/12 bg-transparent flex flex-col justify-center  p-5 rounded-lg items-center gap-4">
               <textarea
                  placeholder="Enter Text Or Paste The Message..."
                  value={content}
                  onChange={(e) => setcontent(e.target.value)}
                  style={{ scrollbarWidth: "none" }}
                  className="bg-transparent border border-white rounded-lg outline-none backdrop-blur-2xl resize-none text-white p-4 w-10/12 h-[200px]"
               />
               <button disabled={displayed} onClick={sendtext} className="bg-white text-black px-6 py-2 rounded-lg">
                  {loading ? <span className="text-gray-900">Humanizing...</span> : <span className="text-black">Humanize</span>}
               </button>
            </div>
         </div>
      </>
   )
}

export default Humanize;