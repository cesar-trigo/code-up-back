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
      throw new Error("Lugar no encontrado");
    }

    // Obtener la fecha del evento
    const eventDate = new Date(date);

    // Verificar si la fecha está disponible en el lugar
    const isDateAvailable = placee.date.some(
      dat => new Date(dat).getTime() === eventDate.getTime()
    );

    if (!isDateAvailable) {
      throw new Error("Fecha no disponible en este lugar");
    }

    const isEventExists = await Event.exists({ place: place, date: eventDate });
    if (isEventExists) {
      throw new Error("Ya existe un evento en esta fecha para este lugar");
    }

    /*     console.log(
      placee.date[0].getTime(),
      eventDate.getTime(),
      placee.date[0].getTime() === eventDate.getTime(),
      isDateAvailable
    ); */

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
