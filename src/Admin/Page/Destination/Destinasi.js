import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Topbar from "../../Component/Topbar/Topbar";
import axios from "axios";
import "./Destinasi.css";

function Destinasi() {
  const [destinasi, setDestinasi ] = useState([]);
  
  // Get Data Destinasi
  const fetchDestinasi = async () => {
    try{
      const response = await axios.get(``)

      setDestinasi(response.data);
    }catch(error){
      console.log("Error", error);
    }
    };
    
  useEffect(()=>{
    fetchDestinasi();
},[])
  

  return (
    <div>
      <Sidebar />
      <Topbar />
      <div className="Destinasi-wrap">
        <div className="container-destinasi">
          <Link to="/tambah-destinasi">
            <button className="button-tambah-destinasi">Tambah Destinasi</button>
          </Link>
          <div className="table-destinasi-content">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Country</th>
                  <th>Province</th>
                  <th>Island</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Tampilkan data destinasi di sini */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Destinasi;
