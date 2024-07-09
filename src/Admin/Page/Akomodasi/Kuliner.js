import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Topbar from "../../Component/Topbar/Topbar";
import "./Kuliner.css";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function Kuliner() {
  const [kulinerList, setKulinerList] = useState([]);
  const [editKuliner, setEditKuliner] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/auth/food`);
        setKulinerList(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/kuliner/${id}`);
      setKulinerList(kulinerList.filter((kuliner) => kuliner.id !== id));
      console.log("Kuliner deleted successfully");
    } catch (error) {
      console.error("Error deleting kuliner:", error);
    }
  };

  const handleEdit = (kuliner) => {
    setEditKuliner(kuliner);
    setShowEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setEditKuliner(null);
    setShowEditPopup(false);
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`http://localhost:8000/api/kuliner/${editKuliner.id}`, editKuliner);
      console.log("Kuliner updated successfully");
      setShowEditPopup(false);
    } catch (error) {
      console.error("Error updating kuliner:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditKuliner({ ...editKuliner, [name]: value });
  };

  return (
    <div>
      <Sidebar />
      <Topbar />
      <div className="kuliner-wrap">
        <div className="container-kuliner">
          <div className="table-kuliner-content">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Alamat</th>
                  <th>Nama Kuliner</th>
                  <th>Rating</th>
                  <th>Keterangan</th>
                  <th>Kota</th>
                  <th>Tutup</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {kulinerList.map((kuliner) => (
                  <tr key={kuliner.id_food}>
                    <td>{kuliner.id_food}</td>
                    <td>{kuliner.alamat}</td>
                    <td>{kuliner.nama_kuliner}</td>
                    <td>{kuliner.rating}</td>
                    <td>{kuliner.keterangan}</td>
                    <td>{kuliner.kota}</td>
                    <td>{kuliner.tutup}</td>

                    <td>
                      <button className="action-delete" onClick={() => handleDelete(kuliner.id)}> <MdDelete /> </button>
                      <button className="action-edit" onClick={() => handleEdit(kuliner)}> <CiEdit /> </button>
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
            <h2 className="edit-title">Edit Kuliner</h2>
            <form onSubmit={handleSubmitEdit}>
              <input type="text" name="nama" value={editKuliner.nama} onChange={handleInputChange} className="popup-input" />
              <input type="text" name="alamat" value={editKuliner.alamat} onChange={handleInputChange} className="popup-input" />
              <button type="submit" className="popup-btn">Submit</button>
              <button className="popup-btn" onClick={handleCloseEditPopup}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Kuliner;
