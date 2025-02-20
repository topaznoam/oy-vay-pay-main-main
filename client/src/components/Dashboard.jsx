import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthProvider";
import { CURRENCY_SYMBOLS } from "../constants";
import { getTotalExpenses } from "../api/expenses";
import "../styles/Dashboard.css";
import { LineChart } from "./charts/LineChart";
import { BarChart } from "./charts/BarChart";

export const Dashboard = () => {
  const { user } = useAuth();
  const [expanseAmount, setExpanseAmount] = useState(0);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const totalExpenses = await getTotalExpenses(user.id);
        setExpanseAmount(totalExpenses);
      } catch (error) {
        console.error("Error fetching total expenses:", error);
      }
    };

    if (user?.id) {
      fetchExpenses();
    }
  }, []);
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome {user.fullName}</h1>
      </header>

      <div className="summary">
        <div className="card income">
          <h2>Total Incomes</h2>
          <p>$1000</p>
        </div>

        <div className="card expenses">
          <h2>Total Expenses</h2>
          <p>
            {CURRENCY_SYMBOLS["ILS"]}
            {expanseAmount}
          </p>
        </div>

        <div className="card balance">
          <h2>Balance</h2>
          <p>$200</p>
        </div>
      </div>
      <div className="charts">
        <LineChart />
        <BarChart />
      </div>
    </div>
  );
};
