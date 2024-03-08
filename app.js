const express = require('express');
const cors = require('cors');
const helmet =require('helmet');
const hpp =require('hpp');
const mongoSanitize=require('express-mongo-sanitize');
const {rateLimit}=require('express-rate-limit');
const { sanitize } = require('dompurify');
// const path =require('path');

const eventRouter = require('./routers/eventRouter');
const userRouter = require('./routers/userRouter');

const app = express();

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100, 
	standardHeaders: 'draft-7', 
	legacyHeaders: true, 
})

app.use(limiter)
app.use(express.json());
app.use(mongoSanitize());

app.use((req, res, next) => {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string' && /<[^>]*>/g.test(req.body[key])) {
        req.body[key] = sanitize(req.body[key]);
      }
    }
    next();
  });

app.use(hpp({whitelist:["duration","timings"]}))
app.use(cors());

//this features is not implemented since we store the image in db
// app.use('/img/events', express.static(path.join(__dirname, 'public', 'img', 'events')));
// app.use('/img/users', express.static(path.join(__dirname, 'public', 'img', 'users')));

app.use('/api/v1/event', eventRouter);
app.use('/api/v1/user', userRouter);


app.all("*",(req,res,next)=>{
    res.status(404).json({
        status:"fail",
        message:"404 page not found"
    })
})



module.exports = app;
