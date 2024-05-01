import Place from "../../models/Place.js";

export const createService = async payload => {
  const { name, address, photo, events, date, occupancy } = payload;

  try {
    const newPlace = new Place({
      name,
      address,
      photo,
      events,
      date,
      occupancy,
    });
    const place = await Place.create(newPlace);
    return place;
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

  if (payload.address) {
    query = { ...query, address: { $regex: payload.address, $options: "i" } };
  }

  if (payload.date) {
    order = {
      date: payload.date === "asc" ? -1 : 1,
    };
  }

  try {
    const places = await Place.find(query).sort(order);
    return places;
  } catch (error) {
    throw error;
  }
};

export const readOneService = async id => {
  try {
    const place = await Place.findById(id);
    return place;
  } catch (error) {
    throw error;
  }
};

export const updateOneService = async (id, payload) => {
  try {
    const place = await Place.findByIdAndUpdate(id, payload, { new: true });
    return place;
  } catch (error) {
    throw error;
  }
};

export const destroyService = async id => {
  try {
    const place = await Place.findByIdAndDelete(id);
    return place;
  } catch (error) {
    throw error;
  }
};
