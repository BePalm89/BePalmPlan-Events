# BePalmPlan-Events

This project includes backend, with `node.js`, `express` and frontend with `vanilla javascript`. The topic is Event and Attendee Management. There is:

- **landing page** that show what the user can do with the application, like search event by topic or location, filter the event byt some categories like travel, art or technology.
- **register page** where the user can register to the application
- **login page** where the user can login inside the application
- **home page** where the user can see the list of the events, can add favorite events and can search the event based on the topic or location, also can create new event
- **my event page** where the user can see which favorite or attend event has saved, and which event had created, the user can also modify or delete his/her created event
- **detail page of the event** where the user can see the details of an event and choose to attend to it

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

We have two models: one for the users and one for the event.

## User model:

```javascript

  {
    username: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    favoriteEvents: [
      { type: mongoose.Types.ObjectId, required: false, ref: "events" },
    ],
    attendEvents: [
      { type: mongoose.Types.ObjectId, required: false, ref: "events" },
    ],
    profileImg: { type: String, required: false },
  },
```

When registering and logging in the user, the library `bcrypt` is used to encrypt the password. The users have 2 array for storing favorite events and attend events, that are `Event` object.

## Event model

```javascript
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    category: {
      type: String,
      required: true,
      enum: ["hobbies", "art", "health", "travel", "sport", "social", "tech"],
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
```

The event model has a `createBy` field that is the user who created the event and an array of `attendees` to have a list of user that will attend that particular event.

### Middleware

I implemented two middleware, one for uploading file in cloudinary and the other one for authenticate the user with a token, using `jsonwebtoken` library.

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

### Endpoints

## Users endpoint:

| ENDPOINT                   | METHOD | DESCRIPTION                                 | REQUEST BODY                               | RESPONSE                               | MIDDLEWARE  |
| -------------------------- | ------ | ------------------------------------------- | ------------------------------------------ | -------------------------------------- | ----------- |
| /register                  | POST   | Register a new user                         | username, password, email, profile picture | 200 OK with the registered user's info | upload file |
| /login                     | POST   | Login a registered user                     | email and password                         | 200 OK with token and the user obj     |             |
| /:id                       | GET    | Retrieve the user´s info by their unique id |                                            | 200 OK with all user's info            | isAuth      |
| /add-favorite-event/:id    | PUT    | Add a favorite event to the logged user     | event id                                   | 200 OK with all updated user's info    | isAuth      |
| /remove-favorite-event/:id | PUT    | Remove a favorite event to the logged user  | event id                                   | 200 OK with all updated user's info    | isAuth      |
| /add-attend-event/:id      | PUT    | Add attend event to the logged user         | event id                                   | 200 OK with all updated user's info    | isAuth      |
| /remove-attend-event/:id   | PUT    | Remove an attend event to the logged user   | event id                                   | 200 OK with all updated user's info    | isAuth      |
| /logout                    | POST   | Logout the user from the application        |                                            | 200 OK with a successfull message      | isAuth      |

## Events endpoint:

| ENDPOINT | METHOD | DESCRIPTION                                                                        | REQUEST BODY                        | RESPONSE                                         | MIDDLEWARE |
| -------- | ------ | ---------------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------ | ---------- |
| /        | GET    | Retrieves all events available in the DB                                           |                                     | 200 OK with the list of available events         | isAuth     |
| /search  | GET    | Retrieves all events that matches the condition with query and location parameters |                                     | 200 OK with the list of filtered events          | isAuth     |
| /:id     | GET    | Retrieve the details of an event by their unique ID                                |                                     | 200 OK with the details of a particular event    | isAuth     |
| /create  | POST   | Create a new event                                                                 | Event obj                           | 201 OK with all the info about the new event     | isAuth     |
| /:id     | PUT    | Update an event by thier unique ID                                                 | Property of the event obj to update | 200 OK with all the info about the updated event | isAuth     |
| /:id     | DELETE | Delete an event by their unique ID                                                 |                                     | 200 OK with a successfull message                | isAuth    |
