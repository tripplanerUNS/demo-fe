import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Topbar from "../../Component/Topbar/Topbar";
import "./Hotel.css";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { FaFileImage } from "react-icons/fa6";

function Hotel() {
  const [hotelList, setHotelList] = useState([]); // Mengganti penggunaList dengan hotelList
  const [editHotel, setEditHotel] = useState(null); // State untuk menyimpan data hotel yang akan diedit
  const [showEditPopup, setShowEditPopup] = useState(false); // State untuk mengontrol tampilan popup edit
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showAddImage, setShowAddImage] = useState(false);
  const { id_hotels } = useParams();
  const [addImage, setAddImage] = useState(null);
  const [newHotel, setNewHotel] = useState({
    nama_hotel: "",
    harga: "",
    rating: "",
    deskripsi: "",
    tipe_kamar: "",
    fasilitas: "",
    kota: "",
    alamat: "",
  });
  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  //Read Hotel
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/auth/hotelsAll`
        );
        setHotelList(response.data.data);
        console.log(response.data); // Mengambil data dari endpoint hotel

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //addHotel
  const addHotel = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/auth/hotels/buatBaru`,
        newHotel
      );

      setNewHotel({
        nama_hotel: "",
        harga: "",
        rating: "",
        deskripsi: "",
        tipe_kamar: "",
        fasilitas: "",
        kota: "",
        alamat: "",
      });

      alert("Data berhasil ditambahkan:", response.data);
    } catch (error) {
      console.error("Error adding paket:", error);
    }
  };

  //edit Hotel
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/hotel/${id}`);
      setHotelList(hotelList.filter((hotel) => hotel.id !== id));
      console.log("Hotel deleted successfully");
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  const handleEdit = (hotel) => {
    setEditHotel(hotel);
    setShowEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setEditHotel(null);
    setShowEditPopup(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditHotel((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(
        `http://localhost:8000/api/auth/hotels/editNew/${editHotel.id_hotels}`,
        editHotel
      );
      console.log("Hotel updated successfully");
      alert("Berhasil Ngedit Bos");
      setShowEditPopup(false);
      window.location.reload(); // Memuat ulang halaman setelah berhasil edit
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };



  //AddImage 
  const handleShowAddImagePopup = () => {
    setShowAddImage(true);
  };

  const handleCloseAddImagePopup = () => {
    setAddImage(null);
    setShowAddImage(false);
  };

  const handleAddImage = async () => {

//   const formData = new FormData();
//   formData.append("images[]", addImage);

//   try {
//     const response = await axios.post(
//       `http://localhost:8000/api/auth/hotels/${idHotels}/uploads`,
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     console.log("Images uploaded successfully", response.data);
//   } catch (error) {
//     console.error("Error uploading images:", error);
//   }
};

  return (
    <div>
      <Sidebar />
      <Topbar />
      <div className="hotel-wrap">
        <button className="add-button" onClick={() => setShowAddPopup(true)}>
          {" "}
          <FaPlus />
          Tambah Hotel
        </button>{" "}
        {/* Add button for showing add popup */}
        <div className="container-hotel">
          <div className="table-hotel-content">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Hotel</th>
                  <th>Harga Permalam</th>
                  <th>Rating</th>
                  <th>Deskripsi</th>
                  <th>Tipe Kamar</th>
                  <th>Fasilitas</th>
                  <th>Kota</th>
                  <th>Alamat</th>
                  <th>Gambar</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hotelList.map((dataItem) => (
                  <tr key={dataItem.hotel.id}>
                    <td>{dataItem.hotel.id_hotels}</td>
                    <td>{dataItem.hotel.nama_hotel}</td>
                    <td>{dataItem.hotel.harga}</td>
                    <td>{dataItem.hotel.rating}</td>
                    <td>{truncateText(dataItem.hotel.deskripsi, 20)}</td>
                    <td>{dataItem.hotel.tipe_kamar}</td>
                    <td>{truncateText(dataItem.hotel.fasilitas, 10)}</td>
                    <td>{dataItem.hotel.kota}</td>
                    <td>{truncateText(dataItem.hotel.alamat, 0)}</td>
                    <td className="image-grid"> 
                      {/* Menampilkan semua gambar hotel */}
                      {dataItem.images.map((image) => (
                        <img
                          key={image.id_image_hotels}
                          src={`http://localhost:8000/${image.image}`}
                          alt={`Gambar ${dataItem.hotel.nama_hotel}`}
                          style={{ width: "100px", height: "100px" }}
                        />
                      ))}
                    </td>
                    <td>
                      <button
                        className="icon"
                        onClick={() => handleDelete(dataItem.hotel.id)}
                      >
                        {" "}
                        <MdDelete />{""}
                      </button>
                      <button
                        className="icon"
                        onClick={() => handleEdit(dataItem.hotel)}
                      >
                        {" "}
                        <CiEdit />{""}
                      </button>
                      <button
                        className="icon"
                        onClick={() =>
                          handleShowAddImagePopup(dataItem.hotel.id)
                        }
                      >
                        {" "}
                        <FaFileImage />{""}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* popup Add */}
      {showAddPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2 className="add-title">Tambah Hotel</h2>
            {/* Form for adding new Hotel */}
            {/* Form 1. nama_Hotel 2. Harga 3. budget 4. kota 5. gambar */}
            <form onSubmit={newHotel}>
              <input
                type="text"
                name="name"
                className="popup-content-form"
                placeholder="Nama Hotel"
                value={newHotel.nama_hotel}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="Harga"
                className="popup-content-form"
                placeholder="Harga"
                value={newHotel.harga}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="rating"
                className="popup-content-form"
                placeholder="Rating"
                value={newHotel.rating}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="deskripsi"
                className="popup-content-form"
                placeholder="Deskripsi"
                value={newHotel.deskripsi}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="tipekamar"
                className="popup-content-form"
                placeholder="Tipe Kamar"
                value={newHotel.tipe_kamar}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="fasilitas"
                className="popup-content-form"
                placeholder="Fasilitas"
                value={newHotel.fasilitas}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="kota"
                className="popup-content-form"
                placeholder="Kota"
                value={newHotel.kota}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="alamat"
                className="popup-content-form"
                placeholder="Alamat"
                value={newHotel.alamat}
                onChange={handleInputChange}
              />
              
              <button type="submit" className="tambah-form" onSubmit={addHotel}>
                Tambah
              </button>
            </form>
            <button
              className="popup-btn"
              onClick={() => setShowAddPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Popup add Image */}
      {showAddImage && (
  <div className="popup">
    <div className="popup-content">
      <h2 className="add-title">Tambah Gambar</h2>
      {/* Form for adding new Hotel */}
      <input
        type="file"
        name="gambar"
        className="popup-content-form"
        onChange={(e) => setAddImage(e.target.files[0])}
      />
      <button className="edit-form" onClick={handleAddImage}>
        Submit
      </button>
      <button className="close-btn-form" onClick={handleCloseAddImagePopup}>
        Cancel
      </button>
    </div>
  </div>
)}
{/* Tampilkan popup edit jika showEditPopup bernilai true */}
      {showEditPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2 className="edit-judul">Edit Hotel</h2>
            <form onSubmit={handleSubmitEdit}>
              <input
                type="text"
                name="nama_hotel"
                value={editHotel?.nama_hotel || ""}
                onChange={handleInputChange}
                className="popup-content-form"
              />
              <input
                type="text"
                name="harga"
                value={editHotel?.harga || ""}
                onChange={handleInputChange}
                className="popup-content-form"
              />
              <input
                type="text"
                name="rating"
                value={editHotel?.rating || ""}
                onChange={handleInputChange}
                className="popup-content-form"
              />
              <input
                type="text"
                name="deskripsi"
                value={editHotel?.deskripsi || ""}
                onChange={handleInputChange}
                className="popup-content-form"
              />
              <input
                type="text"
                name="tipe_kamar"
                value={editHotel?.tipe_kamar || ""}
                onChange={handleInputChange}
                className="popup-content-form"
              />
              <input
                type="text"
                name="fasilitas"
                value={editHotel?.fasilitas || ""}
                onChange={handleInputChange}
                className="popup-content-form"
              />
              <input
                type="text"
                name="kota"
                value={editHotel?.kota || ""}
                onChange={handleInputChange}
                className="popup-content-form"
              />
              <input
                type="text"
                name="alamat"
                value={editHotel?.alamat || ""}
                onChange={handleInputChange}
                className="popup-content-form"
              />
              <button type="submit" className="edit-form">
                Submit
              </button>
              <button className="close-btn-form" onClick={handleCloseEditPopup}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hotel;