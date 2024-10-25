export const formattedCategory = (category) => {
  return category.textContent
    .toLowerCase()
    .replaceAll(" ", "-")
    .replaceAll("-and", "");
};
