import React, { useState } from "react";
import '../Styles/Tabel.css';

function AgentTabelNew() {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div className="wrap-tabel-agen-new">
            <div className="btn-tambah-agen-popup">
                <button onClick={togglePopup}>Tambah Agen</button>
            </div>
            <div className="content-tabel-agen">
                <table className="content-tabel-new">
                    <thead className="content-tabel-new">
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Username</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="content-tabel-new-1">
                        <tr className="content-tabel-new-1">
                            <td>1</td>
                            <td>Asror</td>
                            <td>asror123</td>
                            <td>
                                <button className="btn-edit-tabel-new">Edit</button>
                                <button className="btn-delete-tabel-new">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {showPopup && (
                <div className="popup-form">
                    <div className="popup-content">
                        <span className="close-popup" onClick={togglePopup}>&times;</span>
                        <form>
                            <label>Nama:</label>
                            <input type="text" />
                            <label>Username:</label>
                            <input type="text" />
                            <label>Password:</label>
                            <input type="password" />
                            <button type="submit">Tambah</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AgentTabelNew;
