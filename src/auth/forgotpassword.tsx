import BackgroundParticles from "@/components/style/bgparticles";
import { motion } from "framer-motion";
import { Card, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { findemail } from "@/services/api";

const Forgot = () => {
  const [message, setmessaage] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [loading, setloading] = useState<boolean>();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const navigate = useNavigate();

  const confirmpassword = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      setmessaage("Please Enter Email");
      setTimeout(() => {
        setmessaage("");
      }, 3000);
      return;
    }
    else if(!emailRegex.test(email))
    {
       setmessaage("Please Enter Valid Email Address");
       return;
    }
    else {
      setloading(true);
      setTimeout(() => {
        setloading(false);
      }, 3000);
      setmessaage("Authenticating...");
      try {
        const result = await findemail(email);
        if (result && result.success) {
          setmessaage(result.message);
          localStorage.setItem("pwemail", result.email);
          navigate("/passwordverify");
          setmessaage("");
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
          onSubmit={confirmpassword}>
          <Card className="bg-transparent p-10 border backdrop-blur-lg  border-white">
            <CardTitle className="text-white flex flex-row justify-between items-center">
              <h1 className="text-xl">Password-Verify</h1>
              <p className="font-light text-xl">Genuine-Ai</p>
            </CardTitle>
            <CardDescription className="flex flex-col gap-5">
              <h1></h1>
              <div className="relative">
                <input type="text" placeholder="Find Email" className="outline-none border rounded-lg  border-white py-2 px-1 pl-8 pr-8 placeholder:text-white placeholder:font-light text-white w-full" value={email} onChange={(e) => setemail(e.target.value)} />
                <i className="absolute left-2 top-3 fa-solid fa-envelope text-white"></i>
              </div>
              {message && <p className={`${message === "Password verification email has been sent." || message === "Authenticating..." ? "text-green-600" : "text-red-600"}`}>{message}</p>}
              <button type="submit" disabled={loading} className="bg-white active:translate-y-1 p-1 rounded-lg text-black">Find</button>
            </CardDescription>
            <NavLink to="/playground" onClick={() => navigate("/")} className="text-center active:translate-y-1 font-semi text-[14px] text-black p-2 rounded-lg bg-white">
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

export default Forgot;