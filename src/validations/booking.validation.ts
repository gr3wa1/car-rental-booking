export const validateBookingInput = (data: any) => {
  const { carId, startDate, endDate } = data;

  if (!carId || !startDate || !endDate) {
    throw new Error("Car ID, start date and end date are required");
  }

  return true;
};
