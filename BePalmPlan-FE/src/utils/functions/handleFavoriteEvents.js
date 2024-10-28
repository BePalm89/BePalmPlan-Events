import { makeRequest } from "../api/makeRequest";
import { API_ENDPOINT } from "../api/url.enum";

export const handleFavorite = async (e, eventId, iconFavorite) => {
  const isAlreadyFavorite =
    iconFavorite.src.split("/").pop() === "like-filled.png";

  const user = JSON.parse(localStorage.getItem("user"));

  const endpoint = isAlreadyFavorite
    ? `${API_ENDPOINT.REMOVE_FAVORITE_EVENT}/${user._id}`
    : `${API_ENDPOINT.ADD_FAVORITE_EVENT}/${user._id}`;
  const newIconSrc = isAlreadyFavorite
    ? "/icons/like.png"
    : "/icons/like-filled.png";

  const { status } = await makeRequest({
    endpoint,
    method: "PUT",
    body: { favoriteEvents: [eventId] },
    hasToken: true,
  });

  if (status === 200) {
    iconFavorite.src = newIconSrc;

    const updatedUser = {
      ...user,
      favoriteEvents: isAlreadyFavorite
        ? user.favoriteEvents.filter((id) => id !== eventId)
        : [...user.favoriteEvents, eventId],
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
  }
};
