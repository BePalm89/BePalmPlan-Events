import express  from 'express';
import cors from 'cors';
import eventsRouter from '../api/routes/event.routes.js';
import usersRouter from '../api/routes/user.routes.js';

const server = express();

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use('/api/v1/events', eventsRouter);
server.use('/api/v1/users', usersRouter);

server.use('*', ( req, res, next ) => {
    const error = new Error('Route not found');
    error.status = 404; 
    next(error)
});

server.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || "Unexpected error");
})

export default server;