import User from "../../models/User.js";
import bcryptjs from "bcryptjs";

export const registerService = async payload => {
  const { name, lastname, email, photo, password, age, genre, events } = payload;
  const role = "user";
  const passwordHash = await bcryptjs.hash(password, 10);
  try {
    const newUser = new User({
      name,
      lastname,
      email,
      photo,
      password: passwordHash,
      age,
      genre,
      events,
      role,
    });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const signinService = async (user, payload) => {
  const { password } = payload;

  try {
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      throw new Error("Incorrect password or email");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const readAllService = async order => {
  try {
    const users = await User.find().sort(order);
    return users;
  } catch (error) {
    throw error;
  }
};

export const readOneService = async id => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateOneService = async (id, payload) => {
  try {
    const user = await User.findByIdAndUpdate(id, payload, { new: true });
    return user;
  } catch (error) {
    throw error;
  }
};

export const destroyService = async id => {
  try {
    const user = await User.findByIdAndDelete(id);
    return user;
  } catch (error) {
    throw error;
  }
};
