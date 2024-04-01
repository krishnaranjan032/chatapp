import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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
    // try {
    //   const userData = {
    //     name,
    //     email,
    //     password,
    //     pic,
    //   };
    //   const res = await axios.post("http://localhost:5000/api/user/", userData);
    //   console.log("User created successfully:", res.status);
    //   if (res.status === 201) {
    //     navigate("/chat");
    //   } else {
    //     console.error("Error creating user:", res.data.message);
    //   }
    // } catch (error) {
    //   console.error("Error creating user:", error);
    // }

    setPicLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast.warning("Please Fill all the Fields", {
        autoClose: 5000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.warning("Passwords Do Not Match", {
        autoClose: 5000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setPicLoading(false);
      return;
    }
    console.log(name, email, password, pic);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      console.log(data);
      toast.success("Registration Successful", {
        autoClose: 5000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      // Assuming `history` is available in scope
      history.push("/chats");
    } catch (error) {
      toast.error("Error Occurred!", {
        autoClose: 5000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    // Your post details logic goes here
    setPicLoading(true);
    if (pics === undefined) {
      toast.warning("Please Select an Image!", {
        autoClose: 5000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return;
    }
    console.log(pics);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat app");
      data.append("cloud_name", "dhaeg5fz2");
      fetch("https://api.cloudinary.com/v1_1/dhaeg5fz2/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "line 61");
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast.warning("Please Select an Image!", {
        autoClose: 5000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setPicLoading(false);
      return;
    }
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
