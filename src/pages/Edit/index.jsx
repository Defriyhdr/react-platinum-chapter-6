import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Edit = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "",
    price: "",
    imageUrl: "",
  });

  const { id } = useParams();

  useEffect(() => {
    getMenuDetail();
  }, []);

  // GET API detail dulu buat ditampilin di form
  const getMenuDetail = () => {
    axios
      .get(`https://api.mudoapi.tech/menu/${id}`)
      .then((res) => {
        setForm({
          name: res.data.data.name,
          description: res.data.data.description,
          type: res.data.data.type,
          price: res.data.data.price,
          imageUrl: res.data.data.imageUrl,
        });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //event perbuahan di form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  // button simpan method PUT
  const handleSave = () => {
    form.price = Number(form.price);

    const token = localStorage.getItem("accesToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // config utk token
    // form utk ganti bodypayload
    axios
      .put(`https://api.mudoapi.tech/menu/${id}`, form, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="text-center mt-3">Edit Menu</h1>

        <label className="form-label text-label mb-1 text-center mt-3">Nama Menu</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="form-control rounded-1 mb-3 "
          placeholder="Masukkan nama menu"
        />

        <label className="form-label text-label mb-1 text-center mt-3">Description</label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="form-control rounded-1 mb-3 "
          placeholder="Masukkan Deskripsi"
        />

        <label className="form-label text-label mb-1 text-center mt-3">Type</label>
        <select
          value={form.type}
          name="type"
          onChange={handleChange}
          className="form-select rounded-1 mb-3"
        >
          <option value={"beverage"}>Beverage</option>
          <option value={"main-dish"}>Main Dish</option>
        </select>

        <label className="form-label text-label mb-1 text-center mt-3">Image URL</label>
        <input
          type="text"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          className="form-control rounded-1 mb-3 "
          placeholder="Masukkan URL image"
        />

        <label className="form-label text-label mb-1 text-center mt-3">Price</label>
        <input
          type="text"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="form-control rounded-1 mb-3 "
          placeholder="Masukkan Harga"
        />

        <button onClick={handleSave} className="btn btn-success mt-3">
          Simpan
        </button>
      </div>
    </div>
  );
};

export default Edit;
