import express, { Request, Response } from 'express';
import cors from 'cors';
import AuthRouter from './routes/auth.router';
import AiRouter from './routes/ai.router';
import contentRoutes from "./routes/content.router"
import connectDB from './db/connection';
import PassportService from './middlewares/passport.middlware';
const app = express();

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);



// JSON body parsing middleware
app.use(express.json());
app.use(PassportService.initialize());
// Routing
app.use('/api/ai', AiRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/content', contentRoutes);

// Basic test route
app.get('/', (req: Request, res: Response): void => {
  res.send('Done');
});

// Connecting to MongoDB and setting up the server
connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server is running at port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed! ", error);
  });

// Export the app
export default app;
