import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend , ResponsiveContainer} from "recharts";
import "../styles/CryptoChart.css";

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
    <div className="crypto-chart" style={{ width: "100%", height: 700 }}>
      <h2 className="text-center">HISTÓRICO {symbol}</h2>
       <ResponsiveContainer width="100%" height="100%">
      <LineChart data={history}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="created_at" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#3E1E68" />
      </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CryptoChart;
