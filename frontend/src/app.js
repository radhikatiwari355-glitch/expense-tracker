import React, { useState } from "react";

function App() {
  // State
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  // Calculate totals
  const amounts = transactions.map((t) => t.amount);
  const balance = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);

  // Add transaction
  const addTransaction = (e) => {
    e.preventDefault();

    if (title.trim() === "" || amount.trim() === "") {
      alert("Please enter title and amount");
      return;
    }

    // ✅ Decide category type
    const incomeCategories = ["Salary"];
    const expenseCategories = [
      "Food",
      "Hospital",
      "Travel",
      "Shopping",
      "Bills",
      "Other",
    ];

    let finalAmount = +amount;

    if (expenseCategories.includes(category)) {
      finalAmount = -Math.abs(finalAmount); // expense → negative
    } else if (incomeCategories.includes(category)) {
      finalAmount = Math.abs(finalAmount); // income → positive
    }

    const newTransaction = {
      id: Date.now(),
      title,
      amount: finalAmount,
      category,
      date: date || new Date().toISOString().split("T")[0],
    };

    setTransactions([newTransaction, ...transactions]);
    setTitle("");
    setAmount("");
    setCategory("Food");
    setDate("");
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        fontFamily: "Poppins, Arial",
        backgroundColor: "#78acd9ff", 
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333" }}>💰 Expense Tracker</h1>
      <h2 style={{ textAlign: "center", color: "#444" }}>
        Your Balance: ₹{balance}
      </h2>

      {/* Income & Expense */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 0",
        }}
      >
        <div
          style={{
            background: "#d4edda",
            padding: "15px",
            flex: 1,
            marginRight: "10px",
            textAlign: "center",
            borderRadius: "8px",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Income</h3>
          <p style={{ fontSize: "18px", fontWeight: "bold", color: "green" }}>
            ₹{income}
          </p>
        </div>
        <div
          style={{
            background: "#f8d7da",
            padding: "15px",
            flex: 1,
            textAlign: "center",
            borderRadius: "8px",
            boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Expense</h3>
          <p style={{ fontSize: "18px", fontWeight: "bold", color: "red" }}>
            ₹{expense}
          </p>
        </div>
      </div>

      {/* History */}
      <h3 style={{ marginTop: "20px" }}>📜 Transaction History</h3>
      {transactions.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr style={{ background: "#e58586ff", color: "white" }}>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Title</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Amount
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                Category
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr
                key={t.id}
                style={{
                  background: i % 2 === 0 ? "#f9f9f9" : "white",
                }}
              >
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {t.title}
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    color: t.amount > 0 ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {t.amount > 0 ? "+" : "-"}₹{Math.abs(t.amount)}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {t.category}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {t.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add Transaction */}
      <h3>➕ Add Transaction</h3>
      <form onSubmit={addTransaction}>
        <input
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        {/* Category dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        >
          <option value="Food">🍔 Food</option>
          <option value="Hospital">🏥 Hospital</option>
          <option value="Travel">🚗 Travel</option>
          <option value="Shopping">🛍️ Shopping</option>
          <option value="Bills">💡 Bills</option>
          <option value="Salary">💼 Salary</option>
          <option value="Other">📦 Other</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "linear-gradient(45deg, #20c997, #17a2b8)", // teal gradient
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.target.style.background = "linear-gradient(45deg,#17a2b8,#20c997)")
          }
          onMouseOut={(e) =>
            (e.target.style.background =
              "linear-gradient(45deg,#20c997,#17a2b8)")
          }
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default App;
