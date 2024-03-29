import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken from "../config/generateToken.js";

export const allUsers = expressAsyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  });


export const registerUser = expressAsyncHandler(async (req, res) => {
  // extract fields from the req/body
  // check if they are empty or not
  // check if the user already exists
  // create ew user
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});


export const authUser = expressAsyncHandler(async (req, res) => {
    // get email or password from req.body
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
      }
  
    const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error("User not registered");
  }

  
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      status: "success",
      message: "User login successful",
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
  });
