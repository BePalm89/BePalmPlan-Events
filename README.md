# BePalmPlan-Events

This project is a fullstack project. The BE is done with `node.js`, `express` and `mongoDB` and frontend with `vanilla javascript`. The topic is Event and Attendee Management. There is:

- **landing page**: that shows what the user can do with the application, like search event by location or categories like travel, art or technology.
- **register page**: the user can register to the application entering a username, email, password and chose and avatar
- **login page**: the user can login in the application using email and password
- **home page**: the user can see the list of events, can add and remove favorite events and can search the event based on the topic, location, categories and time, the user can also create new event
- create event page\*\*: the logged user can create an event, choosing the title, description, category, location, date and image
- **my event page**: the user can see which favorite or attend event has saved, and which event had created.
- **detail page of the event**: the user can see the details of an event and choose to attend to it, if the logged user is the one that had created the event can also edit and delete the event.

### Acceptance criteria:

- [x] Create a user model that stores information such as name, email, and hashed password.
- [x] Create an event model with information such as title, date, location, and description, and an array of attendees that will be user IDs.
- [x] Implement middleware that verifies the presence and validity of the token in protected routes.
- [x] Protect routes that allow actions exclusive to authenticated users.
- [x] File uploads (e.g., avatars or event posters).
- [x] Controllers that sort information based on some criteria.
- [x] Controllers that insert an element from one collection into another.
- [x] Implement a login form for users to enter the system. If a user does not exist, register a new one. Registration logs in the user after registering to save an unnecessary step.
- [x] Display a list of available events. Authenticated users will see additional options to create events and confirm attendance.
- [x] Allow users to explore details of each event and the list of attendees.
- [x] Implement proper error handling in the frontend and backend. All frontend forms have error control to inform the user of any issues.
- [x] All asynchronous processes show a loading indicator to the user to provide immediate feedback.
- [x] Focus on componentization, ensuring no code is repeated.
- [x] Fetch requests are reused through a single function, allowing all fetches to be made using the same method.

### BE Implementation:

I implemented three models: users, event and location.

## User model:

```javascript

  {
    username: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    favoriteEvents: [
      { type: mongoose.Types.ObjectId, required: false, ref: "events" },
    ],
    profileImg: { type: String, required: false },
  },
```

When registering and logging in the user, the library `bcrypt` is used to encrypt the password. The users have an array for storing favorite events, that are `Event` object.

## Event model

```javascript
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    category: {
      type: String,
      required: true,
      enum: ["hobbies-passions", "art-culture", "health-wellbeing", "travel-outdoor", "sport-fitness", "social-activities", "technology"],
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "users",
      },
    ],
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    imgEvent: { type: String, required: true },
  },
```

The event model has a `createBy` field that is the user who created the event and an array of `attendees` to have a list of user that will attend that particular event.

## Location model

```javascript
import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
});
```

### Middleware

I implemented three middlewares, one for uploading file in cloudinary, the other one for authenticate the user with a token, using `jsonwebtoken` library and the last one for checking if the user has permission to edit or delete the event.

## Middleware for uploading file in cloudinary

```javascript
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "BePalmPlan",
    allowedFormats: ["jpg", "png", "jpeg", "gif"],
  },
});

export const upload = multer({ storage });
```

### Middleware for authenticate the user

```javascript
import User from "../api/models/User.model.js";
import { isTokenBlacklisted } from "../utils/blacklistToken.js";
import { verifyToken } from "../utils/jtw.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json("Unauthorized");
    }

    const parsedToken = token.replace("Bearer ", "");

    if (isTokenBlacklisted(parsedToken)) {
      return res.status(403).json("Forbidden!");
    }

    const { id } = verifyToken(parsedToken);

    const user = await User.findById(id);

    user.password = null;
    req.user = user;

    next();
  } catch (error) {
    return next(error);
  }
};
```

### Middleware for edit and delete permission

```javascript
export const checkEventCreator = async (req, res, next) => {
  try {
    const { id } = req.params;
    const loggedUserId = req.user._id;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json("Event not found");
    }

    if (event.createBy.toString() !== loggedUserId.toString()) {
      return res
        .status(403)
        .json("Unauthorized action: You are not the creator of this event.");
    }

    next();
  } catch (error) {
    return next(error);
  }
};
```

### Utility functions

I implemented three utility functions, one for delete file from cloudinary, used when deleting an event, make sure that the file is also deleted in cloudinary, the other one is for verity and generate the token, and the last one is to set the token after the logout of the user in a blacklist.

## Delete file

```javascript
import { v2 as cloudinary } from "cloudinary";

export const deleteFile = (imgUrl) => {
  const splittedImg = imgUrl.split("/");
  const folderName = splittedImg.at(-2);
  const fieldName = splittedImg.at(-1).split(".");

  const public_id = `${folderName}/${fieldName[0]}`;

  cloudinary.uploader.destroy(public_id, () => {
    console.log("File deleted successfully!");
  });
};
```

## JTW file

```javascript
import jtw from "jsonwebtoken";

export const generateToken = (id) => {
  return jtw.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1y" });
};

export const verifyToken = (token) => {
  return jtw.verify(token, process.env.JWT_SECRET);
};
```

## Blacklist token

```javascript
const blacklistedToken = new Set();

export const blacklistToken = (token) => {
  blacklistedToken.add(token);
};

export const isTokenBlacklisted = (token) => {
  return blacklistedToken.has(token);
};
```

### Seeds

### location.seed.js

I implemented a seed for the location to insert at once a lot of location in the database, this endpoint will be use to simulate an autosuggest in the search bar.

```javascript
const locationDocuments = LOCATIONS.map((location) => new Location(location));

export const locationSeeds = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(async () => {
      const allLocation = await Location.find();

      if (allLocation.length) {
        await Location.collection.drop();
      }
    })
    .catch((err) => console.log(`Error deleting data: ${err}`))
    .then(async () => {
      await Location.insertMany(locationDocuments);
      console.log("Collection created successfully!");
    })
    .catch((err) => console.log(`Error creating collection: ${err}`))
    .finally(() => mongoose.disconnect());
};
```

### Endpoints

## Users endpoint:

| ENDPOINT                   | METHOD | DESCRIPTION                                 | REQUEST BODY                               | RESPONSE                               | MIDDLEWARE  |
| -------------------------- | ------ | ------------------------------------------- | ------------------------------------------ | -------------------------------------- | ----------- |
| /register                  | POST   | Register a new user                         | username, password, email, profile picture | 200 OK with the registered user's info | upload file |
| /login                     | POST   | Login a registered user                     | email, password                            | 200 OK with token and the user obj     |             |
| /:id                       | GET    | Retrieve the user´s info by their unique id |                                            | 200 OK with all user's info            | isAuth      |
| /add-favorite-event/:id    | PUT    | Add a favorite event to the logged user     | event id                                   | 200 OK with all updated user's info    | isAuth      |
| /remove-favorite-event/:id | PUT    | Remove a favorite event to the logged user  | event id                                   | 200 OK with all updated user's info    | isAuth      |
| /logout                    | POST   | Logout the user from the application        |                                            | 200 OK with a successfull message      | isAuth      |

## Events endpoint:

| ENDPOINT              | METHOD | DESCRIPTION                                                                        | REQUEST BODY                        | RESPONSE                                         | MIDDLEWARE         |
| --------------------- | ------ | ---------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------ | ------------------ |
| /                     | GET    | Retrieves all events available in the DB                                           |                                     | 200 OK with the list of available events         | isAuth             |
| /search               | GET    | Retrieves all events that matches the condition with query and location parameters |                                     | 200 OK with the list of filtered events          | isAuth             |
| /:id                  | GET    | Retrieve the details of an event by their unique ID                                |                                     | 200 OK with the details of a particular event    | isAuth             |
| /create               | POST   | Create a new event                                                                 | Event obj                           | 201 OK with all the info about the new event     | isAuth             |
| /:id                  | PUT    | Update an event by their unique ID                                                 | Property of the event obj to update | 200 OK with all the info about the updated event | isAuth, permission |
| /:id                  | DELETE | Delete an event by their unique ID                                                 |                                     | 200 OK with a successfull message                | isAuth             |
| /attending/:userId    | GET    | Retrieves all attending events by user id                                          |                                     | 200 OK with the list of attending event          | isAuth             |
| /hosting/:userId      | GET    | Retrieves all hosting events by user id                                            |                                     | 200 OK with the list of hosting event            | isAuth             |
| /add-attendees/:id    | POST   | Add the user to the event                                                          | User id                             | 201 OK with the updated event object             | isAuth             |
| /remove-attendees/:id | DELETE | Remove the user from the event                                                     | User id                             | 200 OK with a successfull message                | isAuth             |

## Location endpoint

| ENDPOINT | METHOD | DESCRIPTION                                                               | REQUEST BODY | RESPONSE                                       | MIDDLEWARE |
| -------- | ------ | ------------------------------------------------------------------------- | ------------ | ---------------------------------------------- | ---------- |
| /search  | GET    | Retrieves all the location that matches the condition with city parameter |              | 200 OK with the list of the filtered locations | isAuth     |

## Deployment

BE was deployed on vercel. the url is `https://be-palm-plan-events.vercel.app`

### FE Implementation:

## Landing page

It is the landing page for the BePalmPlan website, there is a here box to describe what the user can do with the application, the list of category of the events, the list of popular cities and a list of benefit the use can experience if they sign up. They user can sign up, if he/she is not yet register, or the user can login directly.

![Landing page](/Design/landing_page.png)

## Register page

It is a dialog where the user can register, entering a username, the email, the password and a profile picture. Call to the endpoint `/register`.

![Register dialog](/Design/register.png)

## Login page

It is a dialog where the user need to enter the email and the password to be logged in the application. Call to the endpoint `/login`.

![Login dialog](/Design/login.png)

## Home page

When the user is logged in, he/she will land on this page, it shows the event sorted by date and filtered to excluded the events that the logged user had created. The user is able to filter by category, by the title of the event, the location and time. moreover the user can sort the events by date and by relevance ( the user with more attendees). From the avatar, when clicking, there is a menu where the user can log out or land to the page where there are listed all the their events, favorite, hosting, attend or past. For every event the user can add or remove the event as favorite.

![Home page](/Design/home_page.png)

## Details page of the event

Clicking on one of the event, the use navigate to the details page that shows the details of the event. If the event was created by the logger user, the user could see two button to edit or delete this event. If the logged user is not the one that had created the event, will see a button to attend or not attend this event.

![Details event page](/Design/detail_event.png)

## My event page

In the page the user can see the list of the event is attending, hosting, or favorite.

![My event event page](/Design/hosting_event.png)

## Create event dialog

This is the dialog for creating a new event, the user should enter a title, description, category, location, image and date.

![Create event dialog](/Design/create_event.png)

### Edit event dialog

This is the dialog for edit the event
