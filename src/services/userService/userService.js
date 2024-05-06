import User from "../../models/User.js";
import Event from "../../models/Event.js";
import bcryptjs from "bcryptjs";

export const registerService = async payload => {
  const { name, lastname, email, photo, password, age, genre, events } = payload;
  //const { name, lastname, email, photo, password, age, genre } = payload;
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
      events: [],
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
    const users = await User.find()
      .sort(order)
      .populate({
        path: "events",
        populate: { path: "place" },
      });
    return users;
  } catch (error) {
    throw error;
  }
};

export const registerForEventService = async payload => {
  const { userId, eventId } = payload;
  try {
    const idUser = await User.findById(userId);
    const idEvent = await Event.findById(eventId);

    if (idUser.age < idEvent.place.minimumAge) {
      throw new Error("You cannot register because you do not reach the minimum age");
    }

    if (idEvent.attendees.length >= idEvent.place.capacity) {
      throw new Error("You cannot register because the place does not have more capacity");
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { events: idEvent._id } },
      { new: true }
    );

    await Event.findByIdAndUpdate(eventId, { $push: { attendees: userId } }, { new: true });

    return user;
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
