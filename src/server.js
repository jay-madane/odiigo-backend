const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDb = require("./config/dbConnection.js");
const { redisClient } = require("./odiigo-modules/auth/config/redis.js");
const authRoutes = require("./odiigo-modules/auth/routes/auth.js");
const vehicleRoutes = require("./odiigo-modules/vehicles/routes/vehicleRoutes.js");
const serviceRoutes = require("./odiigo-modules/categories/services/routes/serviceRoutes.js");
const categoryRoutes = require("./odiigo-modules/categories/routes/categoryRoutes.js");
const servicePricingRoutes = require("./odiigo-modules/service-prices/routes/servicePricingRoutes.js");
const userRoutes = require("./odiigo-modules/users/routes/userRoutes.js");
const orderRoutes = require("./odiigo-modules/orders/routes/orderRoutes.js");
const serviceBuddyRoutes = require("./odiigo-modules/service-buddies/routes/serviceBuddyRoutes.js");
const pincodeRoutes = require('./odiigo-modules/service-pincode/routes/pincodeRoutes.js');
const garageRoutes = require("./odiigo-modules/garages/routes/garageRoutes.js");
const carBrandRoutes = require("./odiigo-modules/car-brands/routes/carBrandRoutes.js");
const carModelRoutes = require("./odiigo-modules/car-model/routes/carModelRoutes.js");

const authMiddleware = require("./odiigo-modules/auth/middleware/authMiddleware.js");
const sessionCheck = require("./odiigo-modules/auth/middleware/sessionCheck.js");
const cartRoutes = require("./odiigo-modules/cart/routes/cartRoutes.js");

const adminRoutes = require('./odiigo-modules/admin-auth/routes/adminRoutes.js');


dotenv.config();
connectDb();

const app = express();
const port = 3000;

// app.use(cors());
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "http://192.168.137.3:5173"], // Use your actual IP
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: "*", // Temporarily allow all origins
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());

app.get("/protected-data", authMiddleware, sessionCheck, async (req, res) => {
  res.json({ message: "Protected data accessed!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/servicePricing", servicePricingRoutes);
app.use("/api/userProfile", userRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/pincodes", pincodeRoutes);
app.use("/api/garages", garageRoutes);
app.use("/api/serviceBuddies", serviceBuddyRoutes);
app.use("/api/car-brands", carBrandRoutes);
app.use("/api/car-models", carModelRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/admin', adminRoutes);



redisClient
  .connect()
  .then(() => console.log("Redis connected successfully"))
  .catch(console.error);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running at ${port}`);
});
