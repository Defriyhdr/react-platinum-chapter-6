import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Home/style.css";

const Home = () => {
  const [menus, setMenus] = useState([]);
  const [paging, setPaging] = useState({
    currentPage: 1,
    previousPage: 0,
    nextPage: 2,
  });

  useEffect(() => {
    handleGetMenus();
  }, [paging.currentPage]);

  const handleGetMenus = () => {
    axios
      .get(
        `
      https://api.mudoapi.tech/menus?name=&type=&perPage=10&page=${paging.currentPage}`
      )
      .then((res) => {
        console.log(res);
        setMenus(res.data.data.Data);
        setPaging({
          currentPage: res.data.data.currentPage,
          previousPage: res.data.data.previousPage,
          nextPage: res.data.data.nextPage,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    const token = localStorage.getItem("accesToken");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`https://api.mudoapi.tech/menu/${id}`, config)
      .then((res) => {
        console.log(res);
        handleGetMenus();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBack = () => {
    setPaging({
      ...paging,
      currentPage: paging.currentPage - 1,
    });
  };

  const handleNext = () => {
    setPaging({
      ...paging,
      currentPage: paging.currentPage + 1,
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container mb-5">
        <div className="my-5 d-flex justify-content-end pe-4">
          <Link to={"/new-menu"}>
            <button className="btn btn-success">Create Menu</button>
          </Link>
        </div>
        <div className="d-flex flex-wrap justify-content-center mt-5 gap-4">
          {menus.map((menu) => (
            <div key={menu.id} className="d-flex flex-column wrap-card">
              <h1 className="text-header text-center mb-3">{menu.name}</h1>
              <div className="wrap-img">
                <img className="img-menu" src={menu.imageUrl} />
              </div>
              <div className="mt-5">
                <Link to={`/detail/${menu.id}`}>
                  <button className="btn btn-primary me-4">Detail</button>
                </Link>
                <Link to={`/edit/${menu.id}`}>
                  <button className="btn btn-success me-4">Edit</button>
                </Link>
                <button onClick={(e) => handleDelete(e, menu.id)} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center my-5">
          <button
            className="btn btn-success me-3"
            onClick={handleBack}
            disabled={!paging.previousPage}
          >
            Back
          </button>
          <button className="btn btn-success" disabled={!paging.nextPage} onClick={handleNext}>
            Next
          </button>
        </div>
        <h1 className="text-header text-center">Halaman {paging.currentPage}</h1>
      </div>
    </div>
  );
};

export default Home;
