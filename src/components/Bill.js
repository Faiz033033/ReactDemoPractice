import React, { useState, useEffect } from "react";
import "./Bill.css";

const Bill = () => {
  const [OrderID, setOrderID] = useState("");
  const [DishName, setDishName] = useState("");
  const [DishAmount, setDishAmount] = useState("");
  const [TableChoice, setTableChoice] = useState("Table 1");
  const [orders, setOrders] = useState({});

  useEffect(() => {
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
      OrderID,
      DishName,
      DishAmount,
    };

    setOrders((prevOrders) => {
      const table = TableChoice;
      return {
        ...prevOrders,
        [table]: [...(prevOrders[table] || []), newOrder],
      };
    });

    setOrderID("");
    setDishName("");
    setDishAmount("");
  };

  return (
    <div className="BillForm">
      <form onSubmit={handleSubmit}>
        <label>
          Unique Order ID:
          <input
            type="number"
            id="OrderID"
            onChange={(e) => setOrderID(e.target.value)}
            value={OrderID}
          />
        </label>
        <br />
        <br />
        <label>
          Dish Name:
          <input
            type="text"
            id="DishName"
            onChange={(e) => setDishName(e.target.value)}
            value={DishName}
          />
        </label>
        <br />
        <br />
        <label>
          Dish Amount:
          <input
            type="number"
            id="DishAmount"
            onChange={(e) => setDishAmount(e.target.value)}
            value={DishAmount}
          />
        </label>
        <br />
        <br />
        <label>
          Choose Table:
          <select
            id="TableChoice"
            onChange={(e) => setTableChoice(e.target.value)}
            value={TableChoice}
          >
            <option value="Table 1">Table 1</option>
            <option value="Table 2">Table 2</option>
            <option value="Table 3">Table 3</option>
          </select>
        </label>
        <br />
        <br />
        <button type="submit">Generate Bill</button>
      </form>

      <div className="OrderSummary">
        {Object.keys(orders).map((table) => (
          <div key={table} className="TableContainer">
            <h3>{table}</h3>
            <ul>
              {orders[table].map((order) => (
                <li key={order.OrderID}>
                  Order ID: {order.OrderID}, Dish Name: {order.DishName}, Dish Amount: {order.DishAmount}
                </li>
              ))}
            </ul>
            <button onClick={() => setOrders((prevOrders) => {
              const updatedOrders = { ...prevOrders };
              delete updatedOrders[table];
              return updatedOrders;
            })}>
              Clear Table
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bill;
