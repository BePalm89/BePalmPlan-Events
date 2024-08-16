export const toTitleCase = (label) => {
  return label.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}`;

  return `${formattedDate} ${formattedTime}`;
}

export const ISODate = (dateString) => {
  
  const date = new Date(dateString);

  const timeZoneOffset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - timeZoneOffset);

  const isoString = localDate.toISOString().slice(0, 19);

  return isoString
}

export const formattedId = (name) => {
  return name.includes("") ? name.replaceAll(" ", "-") : name;
}