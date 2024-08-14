import express from 'express';
import { searchLocation } from '../controllers/location.controller.js';
import { isAuth } from '../../middleware/auth.js';

const router = express.Router();

/* route location */
/*
 1. search location by city
*/

router.get("/search", isAuth, searchLocation);

export default router;