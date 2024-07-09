import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Sidebar from "../../Component/Sidebar/Sidebar";
import Topbar from "../../Component/Topbar/Topbar";
import "./Paket.css";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

function Paket() {
  const [paketList, setPaketList] = useState([]);
  const [editPaket, setEditPaket] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newPaketData, setNewPaketData] = useState({
    nama_paket: "",
    deskripsi: "",
    budget: "",
    kota: "",
    gambar: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/auth/paket`);
        setPaketList(response.data); // Mengatur data paket dari respons server ke dalam state paketList
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addPaket = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/auth/paket/generate`,
        newPaketData
      );

      setNewPaketData({
        nama_paket: "",
        deskripsi: "",
        budget: "",
        kota: "",
        gambar: ""
      });

      alert("Data berhasil ditambahkan:", response.data);
    } catch (error) {
      console.error("Error adding paket:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/paket/${id}`);
      setPaketList(paketList.filter((paket) => paket.id_paket !== id)); // Filter paketList untuk menghapus paket dengan id yang sesuai
      console.log("Paket deleted successfully");
    } catch (error) {
      console.error("Error deleting paket:", error);
    }
  };

  const handleEdit = (paket) => {
    setEditPaket(paket);
    setShowEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setEditPaket(null);
    setShowEditPopup(false);
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:8000/api/paket/${editPaket.id}`, editPaket);
      console.log("Paket updated successfully");
      setShowEditPopup(false);
    } catch (error) {
      console.error("Error updating paket:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPaketData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div>
      <Sidebar />
      <Topbar />
      <div className="paket-wrap">
        <button className="add-button" onClick={() => setShowAddPopup(true)}> <FaPlus />
          Tambah Paket
        </button> {/* Add button for showing add popup */}
        <div className="container-paket">
          <div className="table-paket-content">
            <table>
              <thead>
                <tr>
                  <th>ID Paket</th>
                  <th>Nama Paket</th>
                  <th>Deskripsi</th>
                  <th>Transportasi</th>
                  <th>Jenis Transportasi</th>
                  <th>Hotel</th>
                  <th>Kota</th>
                  <th>Kuliner</th>
                  <th>Harga Paket</th>
                  <th>Foto</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paketList.map((paket) => (
                  <tr key={paket.id_paket}>
                    <td>{paket.id_paket}</td>
                    <td>{paket.nama_paket}</td>
                    <td>{paket.deskripsi}</td>
                    <td>{paket.transportasi}</td>
                    <td>{paket.jenis_transportasi}</td>
                    <td>{paket.hotel}</td>
                    <td>{paket.kota}</td>
                    <td>{paket.food}</td>
                    <td>{paket.harga_paket}</td>
                    <td><img
                        src={`http://localhost:8000/uploads/paket/${paket.image}`} 
                        alt="Non image"
                        width="100px"
                      /></td>
                    <td>
                      <button className="action-delete" onClick={() => handleDelete(paket.id_paket)}> <MdDelete /> </button>
                      <button className="action-edit" onClick={() => handleEdit(paket)}> <CiEdit /> </button>
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
            <h2 className="edit-title">Edit Paket</h2>
            <form onSubmit={handleSubmitEdit}>
              {/* Input fields for editing */}
            </form>
          </div>
        </div>
      )}
      {/* Add popup */}
      {showAddPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2 className="add-title">Tambah Paket</h2>
            {/* Form for adding new paket */}
            <form onSubmit={addPaket}>
              <input
                type="text"
                name="nama_paket"
                className="popup-content-form"
                placeholder="Nama paket"
                value={newPaketData.nama_paket}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="deskripsi"
                className="popup-content-form"
                placeholder="Deskripsi"
                value={newPaketData.deskripsi}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="budget"
                className="popup-content-form"
                placeholder="Budget"
                value={newPaketData.budget}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="kota"
                className="popup-content-form"
                placeholder="Kota"
                value={newPaketData.kota}
                onChange={handleInputChange}
              />
              <input
                type="file"
                name="gambar"
                className="popup-content-form"
                placeholder="Gambar"
                value={newPaketData.gambar}
                onChange={handleInputChange}
              />
              <button type="submit" className="tambah-form">Tambah</button>
            </form>
            <button className="popup-btn" onClick={() => setShowAddPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Paket;
