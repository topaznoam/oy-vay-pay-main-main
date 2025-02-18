import React, { useRef, useState, useEffect } from "react";
import "../styles/Expenses.css";
import { useAuth } from "./AuthProvider";
import {
  createExpenses,
  getExpenses,
  deleteExpense,
  updateExpense,
} from "../api/expenses";
import { toast } from "react-toastify";
import { CURRENCY_SYMBOLS } from "../constants/index";
import Filters from "./Filters";

export const Expenses = () => {
  const [isPending, setIsPending] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [editSubmit, setEditSubmit] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(null);
  const { user } = useAuth();

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const amountRef = useRef(null);
  const tagRef = useRef(null);
  const currencyRef = useRef(null);

  const filteredExpenses = expenses.filter((expense) =>
    expense.title.toLowerCase().includes(inputSearch.toLowerCase())
  );
  const resetFields = () => {
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    amountRef.current.value = "";
    tagRef.current.value = "food";
    currencyRef.current.value = "ILS";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const amount = amountRef.current.value;
    const tag = tagRef.current.value;
    const currency = currencyRef.current.value;

    const payload = {
      userId: user.id,
      title,
      description,
      amount: Number(amount),
      tag,
      currency,
    };

    try {
      setIsPending(true);
      const data = await createExpenses(payload);
      toast.success(data.message);
      resetFields();
      setExpenses((prevExpenses) => [...prevExpenses, data.expense]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  const deleteExpanse = async (expenseId) => {
    try {
      setIsPending(true);
      const data = await deleteExpense(user.id, expenseId);
      toast.success(data.message);
      setExpenses((prevExpenses) =>
        prevExpenses.filter((exp) => exp._id !== expenseId)
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  const editExpanseSubmit = (expenseId) => {
    const expenseToEdit = expenses.find((item) => item._id === expenseId);

    if (expenseToEdit) {
      titleRef.current.value = expenseToEdit.title;
      descriptionRef.current.value = expenseToEdit.description;
      amountRef.current.value = expenseToEdit.amount;
      tagRef.current.value = expenseToEdit.tag;
      currencyRef.current.value = expenseToEdit.currency;
    }
    setEditSubmit(true);
  };

  const saveExpanseSubmit = async (expenseId) => {
    const updatedExpense = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      amount: Number(amountRef.current.value),
      tag: tagRef.current.value,
      currency: currencyRef.current.value,
    };

    try {
      setIsPending(true);
      const data = await updateExpense(user.id, expenseId, updatedExpense);
      toast.success(data.message);
      data.expense &&
        setExpenses((prevExpenses) =>
          prevExpenses.map((exp) =>
            exp._id === expenseId ? { ...exp, ...updatedExpense } : exp
          )
        );
      setEditSubmit(false);
      resetFields();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExpenses(user.id);
        setExpenses(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user.id]);

  return (
    <main className="expense-container">
      <h1>Expenses</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            ref={titleRef}
            id="title"
            placeholder="Enter the title"
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            ref={descriptionRef}
            id="description"
            placeholder="Enter the description"
          />
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            ref={amountRef}
            inputMode="numeric"
            id="amount"
            placeholder="Enter the amount"
            required
          />
        </div>

        <div>
          <label htmlFor="tag">Tag</label>
          <select id="tag" ref={tagRef} required>
            <option value="food">Food</option>
            <option value="rent">Rent</option>
            <option value="transport">Transport</option>
            <option value="clothing">Clothing</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="currency">Currency</label>
          <select id="currency" ref={currencyRef}>
            <option value="ILS">ILS</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <button type="submit" className="expense-button" disabled={isPending}>
          Add Expense
        </button>
      </form>
      <Filters
        inputSearch={inputSearch}
        setInputSearch={setInputSearch}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      {filteredExpenses.length ? (
        <table className="expenses-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Tag</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense._id}>
                <td>{expense.title}</td>
                <td>{expense.description}</td>
                <td>
                  {expense.amount}
                  {" " + CURRENCY_SYMBOLS[expense.currency]}
                </td>
                <td>{expense.tag}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      onClick={
                        editSubmit
                          ? () => saveExpanseSubmit(expense._id)
                          : () => editExpanseSubmit(expense._id)
                      }
                      className={editSubmit ? "save-button" : "edit-button"}
                      disabled={isPending && editSubmit}
                    >
                      {editSubmit ? "Save" : "Edit"}
                    </button>

                    <button
                      onClick={() => deleteExpanse(expense._id)}
                      className="delete-button"
                      disabled={isPending}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="not-found">{`"${inputSearch}" not found`}</p>
      )}
    </main>
  );
};
