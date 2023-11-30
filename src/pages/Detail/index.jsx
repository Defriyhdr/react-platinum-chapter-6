import React from "react";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Detail/style.css";

const Detail = () => {
  const param = useParams();

  const [itemsId, setItemsId] = useState({});

  useEffect(() => {
    handleItemsById();
  }, []);

  const handleItemsById = () => {
    axios
      .get(`https://api.mudoapi.tech/menu/${param.id}`)
      .then((res) => {
        console.log(res);
        setItemsId(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5 d-flex justify-content-center">
        <div className="wrap-card-detail">
          <h1 className="text-header text-center">{itemsId.name}</h1>
          <img className="wrap-img my-4" src={itemsId.imageUrl}></img>
          <div className="d-flex flex-column ">
            <span className="text-desc mt-2">{itemsId.description}</span>
            <span className="text-type">{`type : ${itemsId.type}`}</span>
            <span className="text-price mt-3">{`Rp ${itemsId.price}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
