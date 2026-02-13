import { Router } from "express";
import { connectToDatabase } from "@/lib/db";
import { IncomeModel } from "@/models/Income";
import { requireAuth } from "@/middleware/auth";

const router = Router();

// Get user income
router.get("/", async (req, res) => {
  try {
    const ctx = await requireAuth(req);
    await connectToDatabase();

    const incomes = await IncomeModel.find({ toUser: ctx.userId })
      .populate("fromUser", "email referralCode")
      .populate("purchase")
      .sort({ createdAt: -1 })
      .limit(100);

    return res.json({ incomes });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    const status = msg === "Unauthorized" ? 401 : 400;
    return res.status(status).json({ error: msg });
  }
});

export default router;
