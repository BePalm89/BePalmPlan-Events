import {
  register,
  login,
  getUserById,
  addFavoriteEvents,
  removeFavoriteEvents,
  logout,
} from "../controllers/user.controllers.js";
import { upload } from "../../middleware/file.js";
import express from "express";
import { isAuth } from "../../middleware/auth.js";

const router = express.Router();

/* route users */
/*
 1. register
 2. login
 3. get user by id with Auth
 4. add favorite events with Auth
 5. delete favorite events with Auth
 5. add attend events with is Auth
 6. delete attend events with is Auth
 7. logout
*/

router.post("/register", upload.single("profileImg"), register);
router.post("/login", login);
router.get("/:id", isAuth, getUserById);
router.put("/add-favorite-event/:id", isAuth, addFavoriteEvents);
router.put("/remove-favorite-event/:id", isAuth, removeFavoriteEvents);
router.post("/logout", isAuth, logout);

export default router;
