import express from "express";
import mongoose from 'mongoose';
import bodyparser from "body-parser";
import cors from 'cors';
import routes from "./routes/soccerRoutes";

const app = express();
const PORT = 4000;

// mongo connection
mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:27017/soccerDB')
mongoose.connect(`mongodb+srv://taylors:REDACTED@cluster0.usfchj7.mongodb.net/soccerDB/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log('mongoDB Connected!'))
  .catch((err) => {
    console.log(err);
  });
  
// bodyparser setup
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// CORS setup
app.use(cors());

routes(app);

app.get('/', (req, res) => 
  res.send(`Our Soccer application is running on port ${PORT}`)
);

app.listen(PORT, () =>
  console.log(`Your soccer server is running on port ${PORT}`)
)