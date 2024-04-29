import Event from "../../models/Event.js";
import User from "../../models/User.js";
import Place from "../../models/Place.js";

export const createService = async payload => {
  const { name, description, attendees, photo, date, minimumAge, place, organizer } = payload;

  try {
    const user = await User.findById(organizer);
    if (!user || user.role !== "organizer") {
      throw new Error("Unauthorized");
    }

    const newEvent = new Event({
      name,
      description,
      photo,
      date,
      minimumAge,
      place,
      organizer,
      attendees,
    });

    const event = await Event.create(newEvent);
    return event;
  } catch (error) {
    throw error;
  }
};

export const readAllService = async order => {
  try {
    const events = await Event.find().sort(order);
    return events;
  } catch (error) {
    throw error;
  }
};

export const updateOneService = async (id, payload) => {
  try {
    const event = await Event.findByIdAndUpdate(id, payload, { new: true });
    return event;
  } catch (error) {
    throw error;
  }
};

export const destroyService = async id => {
  try {
    const event = await Event.findByIdAndDelete(id);
    return event;
  } catch (error) {
    throw error;
  }
};
