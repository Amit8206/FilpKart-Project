const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path")
const cors = require('cors')



// Routes...
const userRoutes = require("./routes/user")
const adminRoutes = require("./routes/admin/admin")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const cartRoutes = require("./routes/cart");
const initialDataRoutes = require("./routes/admin/initialData");
const pageRoutes = require("./routes/admin/page");
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const adminOrderRoute = require("./routes/admin/order");




// Environment Variable Configuration
dotenv.config();

const port = process.env.PORT || 8000;
const host = process.env.HOST || 'localhost';


const app = express();


// creating Database  // const connctDB = 
mongoose.connect(process.env.MONGO_URL, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connection Established Successfully...");
}).catch((error) => {
    console.log("MongoDB Connection Failed !!!");
    console.log(error);
})



app.use(cors());
app.use(express.json());

// // Middleware
// app.use(bodyparser.urlencoded({ extended: true }));
// app.use(bodyparser.json());



app.use('/public', express.static(path.join(__dirname, 'uploads')));

app.use("/api", userRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", initialDataRoutes);
app.use("/api", pageRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", adminOrderRoute);




app.listen(port, host, () => {
    console.log(`Application Is Listening On Port http://${host}:${port}`);
})
