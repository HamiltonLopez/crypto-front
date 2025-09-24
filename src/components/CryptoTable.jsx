import React, { useEffect, useState } from "react";
import axios from "axios";



const CryptoTable = () => {
  const [cryptos, setCryptos] = useState([]);
  const [symbols, setSymbols] = useState("BTC,ETH");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/cryptos?symbols=${symbols}`);
        const data = res.data;
        setCryptos(Object.values(data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); 
    return () => clearInterval(interval);
  }, [symbols]);

  return (
    <div className="crypto-table">
      <h2>Criptomonedas</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Símbolo</th>
            <th>Precio (USD)</th>
            <th>Cambio 24h (%)</th>
            <th>Volumen 24h</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.symbol}</td>
              <td>${c.quote.USD.price.toFixed(2)}</td>
              <td
                style={{ color: c.quote.USD.percent_change_24h > 0 ? "green" : "red" }}
              >
                {c.quote.USD.percent_change_24h.toFixed(2)}%
              </td>
              <td>{c.quote.USD.volume_24h.toFixed(0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;