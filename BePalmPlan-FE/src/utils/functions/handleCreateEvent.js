import { makeRequest } from "../api/makeRequest";
import { API_ENDPOINT } from "../api/url.enum";
import { navigate } from "./navigate";
import { Events } from "../../pages/Events/Events";
import { Banner } from "../../components/Banner/Banner";
import { isFormValid } from "./formValidation";
import { formattedCategory } from "../functions/formatting";
export const handleCreateEvent = async (e) => {
  e.preventDefault();

  const userFromLocalStorage = localStorage.getItem("user");
  const user = userFromLocalStorage ? JSON.parse(userFromLocalStorage) : {};
  // Get the value of the input
  const title = document.querySelector("#title");
  const description = document.querySelector("#description");
  const categoryInput = document.querySelector(
    "#categories-dropdown-wrapper span"
  );
  const whereInput = document.querySelector("#type-dropdown-wrapper span");
  const locations = document.querySelector("#locations");
  const photo = document.querySelector("#upload-photo");
  const when = document.querySelector("#when");

  // Validation
  const validationRules = {
    title: { required: true },
    description: { required: true },
    when: { required: true, noPastDate: true },
    photo: { hasFile: true },
  };

  let isValid = false;

  // Validation for select categories and where
  const isWhereValid = validateSelectInput(whereInput, "type");
  const isCategoriesValid = validateSelectInput(categoryInput, "categories");

  // Validation for location
  let isLocationValid = true;
  if (whereInput.textContent === "in person") {
    const validationRulesLocation = {
      locations: { required: true },
    };
    isLocationValid = isFormValid({ locations }, validationRulesLocation);
  }

  isValid =
    isFormValid({ title, description, when, photo }, validationRules) &&
    isWhereValid &&
    isCategoriesValid &&
    isLocationValid;

  if (!isValid) return;

  // Create the payload
  const formData = new FormData();

  const locationValue = getCorrectLocation(whereInput, locations);

  formData.append("title", title.value);
  formData.append("description", description.value);
  formData.append("location", locationValue);
  formData.append("date", when.value);
  formData.append("category", formattedCategory(categoryInput));
  formData.append("imgEvent", photo.files[0]);
  formData.append("createBy", user._id);

  const token = localStorage.getItem("token");

  // Make the request
  const { data, status } = await makeRequest({
    endpoint: API_ENDPOINT.CREATE_EVENT,
    method: "POST",
    isJSON: false,
    body: formData,
    token,
  });

  // Handle successfull result
  if (status === 201) {
    Banner(`Event ${data.title} created successfully!`, "success");
    navigate(e, { path: "/events", page: Events });
  }
};

const getCorrectLocation = (whereInput, locations) => {
  return whereInput.textContent === "in person" ? locations.value : "online";
};

const validateSelectInput = (input, id) => {
  const errorSpan = document.querySelector(`#${id}-error`);
  if (input.textContent.toLowerCase().includes("any")) {
    errorSpan.textContent = "This field is required";
    const wrapperSelect = document.querySelector(`#${id}-dropdown-wrapper`);
    wrapperSelect.classList.add("error");
    return false;
  }

  errorSpan.textContent = "";
  return true;
};
