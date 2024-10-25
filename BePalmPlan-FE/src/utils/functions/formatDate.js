import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}`;

  return `${formattedDate} ${formattedTime}`;
};

export const ISODate = (dateString) => {
  const date = new Date(dateString);

  const timeZoneOffset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - timeZoneOffset);

  const isoString = localDate.toISOString().slice(0, 16);

  return isoString;
};

export const longFormatDate = (dateString) => {
  const dateInCest = dayjs(dateString).tz("Europe/Berlin"); // CEST is observed in Berlin

  // Format the start time and end time (assuming a 2-hour event)
  const startFormatted = dateInCest.format("dddd, MMMM D, YYYY h:mm A");
  const endFormatted = dateInCest.add(2, "hour").format("h:mm A");

  // Construct the final formatted string
  return `${startFormatted} to ${endFormatted} CEST`;
};
