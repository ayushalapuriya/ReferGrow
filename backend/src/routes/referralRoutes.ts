import { Router } from "express";
import { buildReferralTree } from "@/lib/referralTree";
import { requireAuth } from "@/middleware/auth";

const router = Router();

// Get referral tree
router.get("/", async (req, res) => {
  try {
    const ctx = await requireAuth(req);
    const depthParam = Number(req.query.depth ?? "3");
    const maxDepth = Math.min(Math.max(depthParam, 1), 10);

    const tree = await buildReferralTree({ rootUserId: ctx.userId, depth: maxDepth });
    return res.json({ tree, maxDepth });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unauthorized";
    const status = msg === "Unauthorized" ? 401 : 400;
    return res.status(status).json({ error: msg });
  }
});

export default router;
