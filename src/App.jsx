import React, { useState } from "react";
import CryptoTable from "./components/CryptoTable";
import CryptoChart from "./components/CryptoChart";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
   const [selectedCrypto, setSelectedCrypto] = useState("BTC");
  return (
    <div className="App container">
      <h1>Crypto Dashboard</h1>
       <div className="row mt-5">
        <div className="col-md-6">
          <CryptoTable onSelectCrypto={setSelectedCrypto} />
        </div>
        <div className="col-md-6">
          <CryptoChart symbol={selectedCrypto} />
        </div>
      </div>
    </div>
  );
}

export default App;
