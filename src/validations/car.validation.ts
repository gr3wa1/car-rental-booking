export const validateCarInput = (data: any) => {
  const {
    name,
    brand,
    model,
    year,
    pricePerDay,
    color,
    fuelType,
    transmission,
    seats,
    image,
  } = data;

  if (
    !name ||
    !brand ||
    !model ||
    !year ||
    !pricePerDay ||
    !color ||
    !fuelType ||
    !transmission ||
    !seats ||
    !image
  ) {
    throw new Error("All car fields are required");
  }

  return true;
};
