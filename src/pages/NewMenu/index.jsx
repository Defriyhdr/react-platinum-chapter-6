import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";

const NewMenu = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "",
    imageUrl: "",
    price: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name)
    setForm({
      ...form,
      [name]: value,
    });
  };

  // cek input form and select
  console.log(form.name, form.description, form.type, form.imageUrl, form.price);

  const handleSubmit = () => {
    const token = localStorage.getItem("accesToken");

    // cara rubah string to number
    form.price = Number(form.price);

    // config untuk me wrap authorization dan value berupa token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post("https://api.mudoapi.tech/menu", form, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div>
          <h1 className="text-center mt-3">Create Menu</h1>

          <label className="form-label text-label mb-1 text-center mt-3">Menu</label>
          <input
            name="name"
            onChange={handleChange}
            className="form-control rounded-1 mb-3 "
            placeholder="Masukkan nama menu"
          />

          <label className="form-label text-label mb-1 text-center mt-3">Description</label>
          <input
            name="description"
            onChange={handleChange}
            className="form-control rounded-1 mb-3 "
            placeholder="Masukkan Deskripsi"
          />

          <label className="form-label text-label mb-1 text-center mt-3">Type</label>
          <select name="type" onChange={handleChange} className="form-select rounded-1 mb-3">
            <option selected>-</option>
            <option value={"beverage"}>Beverage</option>
            <option value={"main-dish"}>Main Dish</option>
          </select>

          <label className="form-label text-label mb-1 text-center mt-3">Image URL</label>
          <input
            name="imageUrl"
            onChange={handleChange}
            className="form-control rounded-1 mb-3 "
            placeholder="Masukkan URL image"
          />

          <label className="form-label text-label mb-1 text-center mt-3">Price</label>
          <input
            name="price"
            onChange={handleChange}
            className="form-control rounded-1 mb-3 "
            placeholder="Masukkan Harga"
          />

          <button onClick={handleSubmit} className="btn btn-success mt-3">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewMenu;
