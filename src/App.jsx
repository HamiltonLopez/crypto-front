import React, { useState } from "react";
import CryptoTable from "./components/CryptoTable";
import CryptoChart from "./components/CryptoChart";
import './App.css';


function App() {
   const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  return (
    <div className="App container">
      <h1>Crypto Dashboard</h1>
      <CryptoTable />
      <div className="col-md-6">
          <CryptoChart symbol={selectedCrypto} />
        </div>
    </div>
  );
}

export default App;
