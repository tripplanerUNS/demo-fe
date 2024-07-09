import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Topbar from "../../Component/Topbar/Topbar";
import "./Agen.css";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

function Agen() {
  const [agens, setAgens] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [newAgen, setNewAgen] = useState({
    name: "",
    username: "",
    password: ""
  });
  const [editAgenData, setEditAgenData] = useState(null);

  const fetchAgens = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/auth/agen/");
      setAgens(response.data);
    } catch (error) {
      console.error("Error fetching agens:", error);
    }
  };

  useEffect(() => {
    fetchAgens();
  }, []);

  const deleteAgen = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/auth/agen/${id}`);
      setAgens(agens.filter((agen) => agen.id !== id));
    } catch (error) {
      console.error("Error deleting agen:", error);
    }
  };

  const showAddPopup = () => {
    setShowPopup(true);
  };

  const hideAddPopup = () => {
    setShowPopup(false);
  };

  const toggleShowEditPopup = (agen) => {
    setEditAgenData(agen);
    setShowEditPopup(true);
  };

  const hideEditPopup = () => {
    setShowEditPopup(false);
  };

  const addAgen = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://127.0.0.1:8000/api/auth/agen/store`, newAgen);
      setNewAgen({
        name: "",
        username: "",
        password: ""
      });
      fetchAgens();
      hideAddPopup();
    } catch (error) {
      console.error("Error adding agen:", error);
      alert("Gagal menambahkan agen. Silakan coba lagi.");
    }
  };

  const editAgen = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/auth/agen/${editAgenData.id}`, editAgenData);
      fetchAgens();
      hideEditPopup();
    } catch (error) {
      console.error("Error editing agen:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewAgen({ ...newAgen, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Sidebar />
      <Topbar />
      <div className="Agen-wrap">
        <div className="container-agen">
          <button className="button-tambah-agen" onClick={showAddPopup}>
            <FaPlus /> Tambah Agen
          </button>

          {showPopup && (
            <div className="popup">
              <div className="popup-content">
                <h2 className="edit-judul">Form Tambah Agen</h2>
                <form onSubmit={addAgen}>
                  <input
                    type="text"
                    name="name"
                    className="popup-content-form"
                    placeholder="Nama"
                    value={newAgen.name}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="username"
                    className="popup-content-form"
                    placeholder="Username"
                    value={newAgen.username}
                    onChange={handleInputChange}
                  />
                  <input
                    type="password"
                    name="password"
                    className="popup-content-form"
                    placeholder="Password"
                    value={newAgen.password}
                    onChange={handleInputChange}
                  />
                  <button type="submit" className="tambah-form">Tambah</button>
                </form>
                <button className="close-btn-form" onClick={hideAddPopup}>
                  Close
                </button>
              </div>
            </div>
          )}

          {showEditPopup && editAgenData && (
            <div className="popup">
              <div className="popup-content">
                <h2 className="edit-judul">Form Edit Agen</h2>
                <form onSubmit={editAgen}>
                  <input
                    type="text"
                    name="name"
                    className="popup-content-form"
                    placeholder="Nama"
                    value={editAgenData.name}
                    onChange={(e) => setEditAgenData({ ...editAgenData, name: e.target.value })}
                  />
                  <input
                    type="text"
                    name="username"
                    className="popup-content-form"
                    placeholder="Username"
                    value={editAgenData.username}
                    onChange={(e) => setEditAgenData({ ...editAgenData, username: e.target.value })}
                  />
                  <input
                    type="password"
                    name="password"
                    className="popup-content-form"
                    placeholder="Password"
                    value={editAgenData.password}
                    onChange={(e) => setEditAgenData({ ...editAgenData, password: e.target.value })}
                  />
                  <button type="submit" className="edit-form">Edit</button>
                </form>
                <button className="close-btn-form" onClick={hideEditPopup}>
                  Close
                </button>
              </div>
            </div>
          )}

          <div className="table-agen-content">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {agens.map((agen) => (
                  <tr key={agen.id_agen}>
                    <td>{agen.id_agen}</td>
                    <td>{agen.name}</td>
                    <td>{agen.username}</td>
                    <td>{agen.password}</td>
                    <td>
                      <button className="action-agen-edit" onClick={() => toggleShowEditPopup(agen)}>
                        <CiEdit />
                      </button>
                      <button
                        className="action-agen-delete"
                        onClick={() => deleteAgen(agen.id)}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Agen;
