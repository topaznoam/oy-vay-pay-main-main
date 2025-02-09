const express = require("express");
const router = express.Router();

const {
  addIncome,
  getIncomes,
  updateIncome,
  deleteIncome,
} = require("../controllers/income");

router.post("/add-income/:userId", addIncome);
router.get("/get-incomes/:userId", getIncomes);
router.patch("/update-income/:userId/:incomeId", updateIncome);
router.delete("/delete-income/:userId/:incomeId", deleteIncome);

module.exports = router;
