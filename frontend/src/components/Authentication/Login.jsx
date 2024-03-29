import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Use useNavigate hook

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("Please fill all the fields");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        config
      );
      console.log(res.data);
      const data = res?.data;
      alert("Login Successful");
        localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chat"); // Navigate using navigate function
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-full flex flex-col justify-center gap-2 text-xl  max-w-md">
        <label className="block mb-2">
          Email Address
          <input
            className="mt-2 block w-full rounded-md border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="email"
            value={email}
            placeholder="Enter Your Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="block mb-2">
          Password
          <input
            className="mt-2 block w-full rounded-md border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type={show ? "text" : "password"}
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={submitHandler}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <button
          className="mt-2 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
          }}
        >
          Get Guest User Credentials
        </button>
      </div>
    </div>
  );
};

export default Login;
