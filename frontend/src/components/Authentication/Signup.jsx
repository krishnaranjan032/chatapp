import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [picLoading, setPicLoading] = useState(false);

  const handleClick = () => setShow(!show);
  const navigateToChats = () => navigate("/chats");

  const submitHandler = async () => {
    // Your submit handler logic goes here
  };

  const postDetails = (pics) => {
    // Your post details logic goes here
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="text"
        placeholder="Enter Your Name"
        className="border border-gray-300 px-3 py-2 rounded-md w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter Your Email Address"
        className="border border-gray-300 px-3 py-2 rounded-md w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="relative w-full">
        <input
          type={show ? "text" : "password"}
          placeholder="Enter Password"
          className="border border-gray-300 px-3 py-2 rounded-md w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 focus:outline-none"
          onClick={handleClick}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
      <div className="relative w-full">
        <input
          type={show ? "text" : "password"}
          placeholder="Confirm Password"
          className="border border-gray-300 px-3 py-2 rounded-md w-full"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 focus:outline-none"
          onClick={handleClick}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
      <input
        type="file"
        accept="image/*"
        className="border border-gray-300 px-3 py-2 rounded-md w-full"
        onChange={(e) => postDetails(e.target.files[0])}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
        onClick={submitHandler}
        disabled={picLoading}
      >
        {picLoading ? "Signing Up..." : "Sign Up"}
      </button>
    </div>
  );
};

export default Signup;
