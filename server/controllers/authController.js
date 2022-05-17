import User from "../models/userModel.js";
import { BadRequestError, UnAuthorizedError } from "../errors.js";

export const register = async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    throw new BadRequestError("You must provide all the values");
  }

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("User with that email already exists");
  }

  const user = await User.create({ userName, email, password });
  const token = user.createJWT();

  res.status(201).json({
    user: {
      userName: user.userName,
      _id: user._id,
      email: user.email,
      favoriteShows: user.favoriteShows,
    },
    favoriteShows: user.favoriteShows,
    token,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError(
      "You must provide an email and password to login"
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnAuthorizedError("No user with that email");
  }

  const isPasswordOk = await user.comparePassword(password);
  if (!isPasswordOk) {
    throw new UnAuthorizedError("Wrong password");
  }

  const token = user.createJWT();
  user.password = undefined;
  res.status(200).json({ user, favoriteShows: user.favoriteShows, token });
};

export const addShowToFavorites = async (req, res) => {
  const { showId } = req.body;
  if (!req.user.userId) {
    throw new UnAuthorizedError(
      "You have no permission to perform this action"
    );
  }
  let user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new NotFoundError(`No user with ID: ${req.user.userId} was found`);
  }
  user.favoriteShows.addToSet(showId);
  const updatedUser = await User.findByIdAndUpdate(
    { _id: req.user.userId },
    user,
    {
      new: true,
    }
  ).select("-password");
  res.status(200).json({ updatedUser });
};

export const removeShowFromFavorites = async (req, res) => {
  const { showId } = req.body;
  if (!req.user.userId) {
    throw new UnAuthorizedError(
      "You have no permission to perform this action"
    );
  }
  let user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new NotFoundError(`No user with ID: ${req.user.userId} was found`);
  }
  user.favoriteShows.pull(showId);
  const updatedUser = await User.findByIdAndUpdate(
    { _id: req.user.userId },
    user,
    {
      new: true,
    }
  ).select("-password");
  res.status(200).json({ updatedUser });
};
