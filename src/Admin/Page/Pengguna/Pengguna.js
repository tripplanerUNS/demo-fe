import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Topbar from "../../Component/Topbar/Topbar";
import "./Pengguna.css";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function Pengguna() {
  const [penggunaList, setPenggunaList] = useState([]);
  const [editPengguna, setEditPengguna] = useState(null); // State untuk menyimpan data pengguna yang akan diedit
  const [showEditPopup, setShowEditPopup] = useState(false); // State untuk mengontrol tampilan popup edit

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/auth/user/profile/");
        setPenggunaList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/auth/user/profile/${id}`);
      setPenggunaList(penggunaList.filter((pengguna) => pengguna.id !== id));
      console.log("Pengguna deleted successfully");
    } catch (error) {
      console.error("Error deleting pengguna:", error);
    }
  };

  const handleEdit = (pengguna) => {
    // Setel data pengguna yang akan diedit ke dalam state
    setEditPengguna(pengguna);
    // Tampilkan popup edit
    setShowEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    // Kosongkan data pengguna yang akan diedit
    setEditPengguna(null);
    // Sembunyikan popup edit
    setShowEditPopup(false);
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault(); // Mencegah pengiriman form secara default

    try {
      // Kirim permintaan PUT untuk mengedit pengguna
      await axios.put(`http://localhost:8000/api/auth/update/${editPengguna.id}`, editPengguna);
      console.log("Pengguna updated successfully");
      // Sembunyikan popup edit setelah berhasil disunting
      setShowEditPopup(false);
    } catch (error) {
      console.error("Error updating pengguna:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Perbarui data pengguna yang akan diedit sesuai dengan input yang disunting
    setEditPengguna({ ...editPengguna, [name]: value });
  };

  return (
    <div>
      <Sidebar />
      <Topbar />
      <div className="Pengguna-wrap">
        <div className="container-pengguna">
          <div className="table-pengguna-content">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>No Telpon</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {penggunaList.map((pengguna) => (
                  <tr key={pengguna.id_pengguna}>
                    <td>{pengguna.id_pengguna}</td>
                    <td>{pengguna.nama}</td>
                    <td>{pengguna.username}</td>
                    <td>{pengguna.email}</td>
                    <td>{pengguna.password}</td>
                    <td>{pengguna.no_tlpn}</td>
                    <td>
                      <button className="action-edit" onClick={() => handleEdit(pengguna)}> <CiEdit /> </button>
                      <button className="action-delete" onClick={() => handleDelete(pengguna.id)}> <MdDelete /> </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Tampilkan popup edit jika showEditPopup bernilai true */}
      {showEditPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2 className="edit-judul">Edit Pengguna</h2>
            {/* Isi dengan form untuk mengedit data pengguna */}
            <form onSubmit={handleSubmitEdit}>
              <input type="text" name="nama" value={editPengguna.nama} onChange={handleInputChange} className="popup-content-form" />
              <input type="text" name="username" value={editPengguna.username} onChange={handleInputChange} className="popup-content-form" />
              <input type="text" name="password" value={editPengguna.password} onChange={handleInputChange} className="popup-content-form" />
              <input type="text" name="no_tlpn" value={editPengguna.no_tlpn} onChange={handleInputChange} className="popup-content-form" />
              <button type="submit" className="edit-form">Submit</button>
              <button className="close-btn-form" onClick={handleCloseEditPopup}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pengguna;
