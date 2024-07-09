import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home";
import Register from "./component/Register/Register";
// import Login from "./component/Login/Login";
import Dashboard from "./Admin/Component/Home/Dashboard";
import Agen from "./Admin/Page/Agen/Agen";
import Pengguna from "./Admin/Page/Pengguna/Pengguna";
import Destinasi from "./Admin/Page/Destination/Destinasi";
import Hotel from "./Admin/Page/Akomodasi/Hotel";
import Transportasi from "./Admin/Page/Akomodasi/Transportasi";
import Kuliner from "./Admin/Page/Akomodasi/Kuliner";
import Paket from "./Admin/Page/Paket/Paket";
import About from "./component/About/about";
import Detail from "./component/Detail/Detail";
import PaketWisata from "./component/Paket/paket";
import Cobalogin from "./component/coba/Cobalogin";
import Adminlogin from "./component/coba/Adminlogin";
import DetailTransport from "./component/Detail/DetailTransport";
import Detailpaket from "./component/Detail/Detailpaket";
import Transaksi from "./component/Transaksi/reservasi";
import Reservasi from "./component/Reservasi/transaksi";
import { GlobalProvider } from "./State/globalstate"; // Import GlobalProvider
import Reservasi2 from "./component/Coba Reservasi/Reservasi2";
import ProfilePengguna from "./component/Profile/Profile";
import DashboardNew from "./AdminNew/Page/Dashboard";
import AgentNew from "./AdminNew/Page/Agent";
import InfoTransaksi from "./component/Coba Reservasi/InfoTransaksi";
import ContentReservasi from "./component/Coba Reservasi/ContentReservasi";

import PaymentPage from "./component/Coba Reservasi/Pembayaran";


function App() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [berangkat, setBerangkat] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [jumlahKaryawan, setJumlahKaryawan] = useState(" ");

  const [nama, setNama] = useState("");
  const [nomerTelpon, setNomerTelpon] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [messages, setMessages] = useState("");
  const [namaKaryawan, setNamaKaryawan] = useState("");
  const [nomerTelponKaryawan, setNomerTelponKaryawan] = useState("");
  const [emailKaryawan, setEmailKaryawan] = useState("");
  const [jabatan, setjabatan] = useState("");


  return (
    <GlobalProvider> {/* Bungkus dengan GlobalProvider */}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                origin={origin}
                setOrigin={setOrigin}
                destination={destination}
                setDestination={setDestination}
                budget={budget}
                setBudget={setBudget}
                berangkat={berangkat}
                setBerangkat={setBerangkat}
                jumlah={jumlah}
                setJumlah={setJumlah}
                jumlahKaryawan={jumlahKaryawan}
                setJumlahKaryawan={setJumlahKaryawan}
              />
            }
          />
          <Route path="/Register" element={<Register />} />
          {/* <Route path="/Login" element={<Login />} /> */}
          <Route path="/loginn" element={<Cobalogin />} />
          <Route path="/Alogin" element={<Adminlogin />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Agen&Admin/Dashboard" element={<Dashboard />} />
          <Route path="/Agen&Admin/Agen" element={<Agen />} />
          <Route path="/Agen&Admin/Pengguna" element={<Pengguna />} />
          <Route path="/Agen&Admin/Destinasi" element={<Destinasi />} />
          <Route path="/Agen&Admin/Hotel" element={<Hotel />} />
          <Route path="/Agen&Admin/Transportasi" element={<Transportasi />} />
          <Route path="/Agen&Admin/Kuliner" element={<Kuliner />} />
          <Route path="/Agen&Admin/Paket" element={<Paket />} />
          <Route path="/Detail/:id_hotels" element={<Detail />} />
          <Route path="/About" element={<About />} />
          <Route
            path="/PaketWisata"
            element={
              <PaketWisata
                dari={origin}
                destinasi={destination}
                bugdet={budget}
                tanggal={berangkat}
                jumlah={jumlah}
                jumlahKaryawan={jumlahKaryawan}
              />
            }
          />
          <Route path="/Detailpaket/:id/:nama_paket" element={<Detailpaket />} />
          <Route
            path="/Detailtransport/:id_transportasi"
            element={<DetailTransport />}
          />
          <Route path="/ReservasiInvite/:id_paket/:nama_paket" element={<Reservasi2  />} />
          <Route path="/Transaksi" element={<InfoTransaksi  />} />
          <Route path="/Reservasi" element={<Reservasi />} />



          {/* <Route path="/Reservasii" element={<Reservasi2 />} /> */}
          <Route path="/Profilee" element={<ProfilePengguna />} />
          {/* <Route path="/Profilee" element={<ProfilePengguna />} />           */}


          <Route path="/CobaContent/:id_paket" element={<ContentReservasi />} />

          Route Baru buat admin
          <Route path="/Admin/Dashboard" element={<DashboardNew />} />
          <Route path="/payment" element={<PaymentPage />} />

          

        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
