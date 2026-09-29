import express from "express";

const router = express.Router();
import { authorize } from "../middlewares/authorize.js";
import { protect } from "../middlewares/auth.js";


// GET /admin/dashboard
router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({
      message: `Welcome to the admin dashboard, ${req.user.name}!`,
      user: req.user,
    });
  }
);

export default router;
