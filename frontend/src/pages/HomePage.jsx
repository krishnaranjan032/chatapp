import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/chats");
  }, [navigate]);

  const handleTabChange = (tab) => {
    setShowLogin(tab === "login");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-xl w-full bg-slate-400 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold text-center mb-6 text-white">
          Talk-A-Tive
        </h1>
        <div className="bg-red-200 p-4 rounded-lg">
          <ul className="flex border-b">
            <li className="-mb-px mr-1 w-1/2">
              <button
                className={`bg-white inline-block border-l border-t border-r rounded-t rounded-l py-2 px-4 text-blue-700 font-semibold w-full`}
                role="tab"
                onClick={() => handleTabChange("login")}
              >
                Login
              </button>
            </li>
            <li className="w-1/2">
              <button
                className={`bg-white inline-block py-2 border-${
                  !showLogin ? "green" : "transparent"
                }-500 px-4 text-blue-500 hover:text-blue-800 font-semibold w-full rounded rounded-r`}
                role="tab"
                onClick={() => handleTabChange("signup")}
              >
                Sign Up
              </button>
            </li>
          </ul>
          <div className="bg-white p-4">
            {showLogin ? <Login /> : <Signup />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
