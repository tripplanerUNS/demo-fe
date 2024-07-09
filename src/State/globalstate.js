import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [jumlahKaryawan, setJumlahKaryawan] = useState(0);
  const [jumlah, setJumlah] = useState(0); // State untuk jumlah_hari
  const [totalHarga, setTotalHarga] = useState(0); // State untuk menyimpan total harga

  return (
    <GlobalContext.Provider value={{ jumlahKaryawan, setJumlahKaryawan, jumlah, setJumlah, totalHarga, setTotalHarga }}>
      {children}
    </GlobalContext.Provider>
  );
};
