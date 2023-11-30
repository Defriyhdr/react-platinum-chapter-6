import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // gabisa pakai link karena dia html makanya pake navigate
  const navigate = useNavigate();

  // reset inputan
  const handleReset = () => {
    setSuccess("");
    setError("");
  };

  const handleUsername = (e) => {
    console.log(e.target.value);
    setUsername(e.target.value);
    handleReset();
  };

  const handlePassword = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
    handleReset();
  };

  const handleSubmit = () => {
    // validasi
    if (!username.length || !password.length) {
      setError("Username dan password wajib diisi");
    } else {
      setLoading(true);
      // nge set true saat di hit
      const bodyPayload = {
        username: username,
        password: password,
      };

      axios
        .post(`https://api.mudoapi.tech/login`, bodyPayload)
        .then((res) => {
          console.log(res);
          localStorage.setItem("accesToken", res.data.data.token);
          // res.data.data.token diperoleh dari saat login berhasil buat auth
          setSuccess(res.data.message);
          setLoading(false);

          setTimeout(() => {
            navigate("/");
          }, 1000);
        })
        .catch((err) => {
          console.log(err.response);
          setError(err.response.data.message);
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="w-50 m-auto">
          {success ? <p>{success}</p> : null}
          {error ? <p>{error}</p> : null}
          <label className="form-label text-label mb-1 text-center mt-3">Username</label>
          <input
            onChange={handleUsername}
            type="text"
            value={username}
            className="form-control rounded-1 mb-3 "
            placeholder="Masukkan username"
          />

          <label className="form-label text-label mb-1">Password</label>
          <input
            onChange={handlePassword}
            type="password"
            value={password}
            className="form-control rounded-1 mb-3"
            placeholder="Masukkan password"
          />
          <button onClick={handleSubmit} className="btn btn-success mt-2" disabled={loading}>
            {loading ? "Loading.." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
