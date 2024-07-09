import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Topbar from "../../Component/Topbar/Topbar";
import "./Transportasi.css";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function Transportasi() {
  const [transportasiList, setTransportasiList] = useState([]);
  const [editTransportasi, setEditTransportasi] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/auth/transportasi`);
        setTransportasiList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/transportasi/${id}`);
      setTransportasiList(transportasiList.filter((transportasi) => transportasi.id !== id));
      console.log("Transportasi deleted successfully");
    } catch (error) {
      console.error("Error deleting transportasi:", error);
    }
  };

  const handleEdit = (transportasi) => {
    setEditTransportasi(transportasi);
    setShowEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setEditTransportasi(null);
    setShowEditPopup(false);
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:8000/api/auth/updateTransport/${editTransportasi.id}`, editTransportasi);
      console.log("Transportasi updated successfully");
      setShowEditPopup(false);
    } catch (error) {
      console.error("Error updating transportasi:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditTransportasi({ ...editTransportasi, [name]: value });
  };

  return (
    <div>
      <Sidebar />
      <Topbar />
      <div className="transportasi-wrap">
        <div className="container-transportasi">
          <div className="table-transportasi-content">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Jenis</th>
                  <th>Harga</th>
                  <th>Berangkat</th>
                  <th>Tujuan</th>
                  <th>Jam Keberangkatan</th>
                  <th>Jam Kedatangan</th>
                  <th>Kota</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transportasiList.map((transportasi) => (
                  <tr key={transportasi.id_transportasi}>
                    <td>{transportasi.id_transportasi}</td>
                    <td>{transportasi.nama_transportasi}</td>
                    <td>{transportasi.jenis_transportasi}</td>
                    <td>{transportasi.harga}</td>
                    <td>{transportasi.berangkat}</td>
                    <td>{transportasi.tujuan}</td>
                    <td>{transportasi.jam_keberangkatan}</td>
                    <td>{transportasi.jam_kedatangan}</td>
                    <td>{transportasi.kota}</td>
                    <td>
                    <button className="action-delete" onClick={() => handleDelete(transportasi.id)}> <MdDelete /> </button>
                      <button className="action-edit" onClick={() => handleEdit(transportasi)}> <CiEdit /> </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showEditPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2 className="edit-title">Edit Transportasi</h2>
            <form onSubmit={handleSubmitEdit}>
              <input type="text" name="nama" value={editTransportasi.nama} onChange={handleInputChange} className="popup-input" />
              <input type="text" name="jenis" value={editTransportasi.jenis} onChange={handleInputChange} className="popup-input" />
              <input type="text" name="harga" value={editTransportasi.harga} onChange={handleInputChange} className="popup-input" />
              <input type="text" name="berangkat" value={editTransportasi.berangkat} onChange={handleInputChange} className="popup-input" />
              <input type="text" name="tujuan" value={editTransportasi.tujuan} onChange={handleInputChange} className="popup-input" />
              <input type="text" name="jam_keberangkatan" value={editTransportasi.jam_keberangkatan} onChange={handleInputChange} className="popup-input" />
              <input type="text" name="jam_kedatangan" value={editTransportasi.jam_kedatangan} onChange={handleInputChange} className="popup-input" />
              <button type="submit" className="popup-btn">Submit</button>
              <button className="popup-btn" onClick={handleCloseEditPopup}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transportasi;
