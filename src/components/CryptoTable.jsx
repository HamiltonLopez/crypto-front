import React, { useEffect, useState } from "react";
import axios from "axios";



const CryptoTable = ({ onSelectCrypto }) => {
  const [cryptos, setCryptos] = useState([]);
    const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/cryptos?limit=100");
        setCryptos(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

   const filteredCryptos = cryptos.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="crypto-table">
      <h2>Criptomonedas</h2>
      <input
        className="form-control"
        type="text"
        placeholder="Buscar por nombre o símbolo..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "8px",
          width: "100%",
          maxWidth: "300px",
        }}
      />
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
          {filteredCryptos.length > 0 ? (
            filteredCryptos.map((c) => (
              <tr
                key={c.id}
                onClick={() => onSelectCrypto(c.symbol)}
                style={{ cursor: "pointer" }}
              >
                <td>{c.name}</td>
                <td>{c.symbol}</td>
                <td>${c.quote.USD.price.toFixed(2)}</td>
                <td
                  style={{
                    color: c.quote.USD.percent_change_24h > 0 ? "green" : "red",
                  }}
                >
                  {c.quote.USD.percent_change_24h.toFixed(2)}%
                </td>
                <td>{c.quote.USD.volume_24h.toFixed(0)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No se encontraron monedas</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;