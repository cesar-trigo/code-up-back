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

    const placee = await Place.findById(place);

    if (!placee) {
      throw new Error("Place not found");
    }

    const eventDate = new Date(date);

    const isDateAvailable = placee.date.some(
      dat => new Date(dat).getTime() === eventDate.getTime()
    );

    if (!isDateAvailable) {
      throw new Error("Date not available at this location");
    }

    const isEventExists = await Event.exists({ place: place, date: eventDate });
    if (isEventExists) {
      throw new Error("There is already an event on this date for this place");
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

    placee.events.push(event._id);

    await placee.save();

    return event;
  } catch (error) {
    throw error;
  }
};

export const readAllService = async payload => {
  let query = {};
  let order = {};

  if (payload.name) {
    query = { ...query, name: { $regex: payload.name, $options: "i" } };
  }

  if (payload.date) {
    order = {
      date: payload.date === "asc" ? -1 : 1,
    };
  }

  try {
    const events = await Event.find(query).sort(order);
    return events;
  } catch (error) {
    throw error;
  }
};

export const updateOneService = async (id, payload, user) => {
  let eventOld = await Event.findById(id);

  if (!eventOld.organizer.equals(user.id)) {
    throw new Error("Unauthorized");
  }

  const { place, date, attendees, organizer, ...rest } = payload;

  eventOld = { ...eventOld._doc, ...rest };

  try {
    const event = await Event.findByIdAndUpdate(id, eventOld, { new: true });
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
