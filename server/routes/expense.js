const express = require("express");
const router = express.Router();

const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  getTotalExpenses,
} = require("../controllers/expense");

router.post("/add-expense/:userId", addExpense);
router.get("/get-expenses/:userId", getExpenses);
router.patch("/update-expense/:userId/:expenseId", updateExpense);
router.delete("/delete-expense/:userId/:expenseId", deleteExpense);
router.get("/get-total/:userId", getTotalExpenses);

module.exports = router;
