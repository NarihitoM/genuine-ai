import { useNavigate } from "react-router-dom";

const Menu = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center items-center h-screen gap-5">
            <h1 className="text-white  text-3xl max-md:text-xl text-center">
                Welcome To Genuine-Ai Playground.
            </h1>
            <div className="flex flex-col">
                <p className="text-white text-2xl">Try Our Models.</p>

            </div>
            <div className="flex flex-row gap-5">
                <button onClick={() => navigate("/humanize")} className="text-black rounded-lg shadow-[0_0_5px_0_white] bg-white p-1.5 animate-bounce">Humanize</button>
                <button onClick={() => navigate("/chatcode")} className="text-black rounded-lg shadow-[0_0_5px_0_white] bg-white p-1.5 animate-bounce">ChatCode</button>
            </div> 
        </div>
    )
}

export default Menu;