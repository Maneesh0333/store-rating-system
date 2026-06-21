import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import userRoutes from "./routes/user.routes.js";
import storeOwnerRoutes from "./routes/storeOwner.routes.js";
import { errorHandler } from "./middleware/errorHandler.middleware.js";

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
  res.json({
    message: "Store Rating API Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/store-owner", storeOwnerRoutes);

app.use(errorHandler);
export default app;
