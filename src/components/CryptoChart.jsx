import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const CryptoChart = ({ symbol }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/cryptos/history/${symbol}`);
        setHistory(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistory();
    const interval = setInterval(fetchHistory, 60000); 
    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <div>
      <h2>Histórico {symbol}</h2>
      <LineChart width={600} height={300} data={history}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="created_at" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default CryptoChart;
