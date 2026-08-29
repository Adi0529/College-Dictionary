let express = require("express");
let app = express();

const cors = require("cors");
let dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 5006;

const userRoutes =require("./Routes/userRoutes");

const collegeRoutes =require("./Routes/collegeRoutes");
const reviewRoutes =require("./Routes/reviewRoutes");
const savedCollegeRoutes =require("./Routes/savedCollegeRoutes");
const savedComparisonRoutes =
    require("./Routes/savedComparisonRoutes");

const connectDB =require("./config/db");


connectDB();


app.use(express.json());

app.use(cors());


app.get("/", (req, res) => {

    res.send("API is running");

});


app.use(
    "/uploads",
    express.static("uploads")
);


app.use("/user", userRoutes);

app.use("/college", collegeRoutes);
app.use("/review", reviewRoutes);
app.use("/saved",savedCollegeRoutes);
app.use(
    "/saved-comparison",
    savedComparisonRoutes
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});