import React from "react";
import "./IntheHeaders.css";
import logo from "./logo.png";
import { Link, useNavigate } from "react-router-dom";
import search from "./search.png";
import { useState } from "react";
import { Tooltip, Whisper } from "rsuite";
import useModal from "../modal/useModal";
import Modal from "../modal/Modal";
import "../modal/Modal.css";
import { useContext } from "react";
import { userContext } from "../connexion/ContextLogin";
import { useEffect } from "react";
import { MdOutlineFacebook } from "react-icons/md";
import { FaInstagramSquare } from "react-icons/fa";
import { BsFillCameraFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InTheHeaders = () => {
  const { userDbInfo, setUserDbInfo, userId } = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [lastName, setLastName] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const navigate = useNavigate();
  const profil = localStorage.getItem("profilUser");
  const { isShowing: isLoginFormShowed, toggle: toggleLoginForm } = useModal();

  const handleSeach = (e) => {
    e.preventDefault();
    navigate(`/result/${text}`);
  };
  useEffect(() => {
    setName(userDbInfo?.nom);
    setLastName(userDbInfo?.prenom);
    setFacebookLink(userDbInfo?.lien_facebook);
    setInstagramLink(userDbInfo?.lien_instagram);
  }, [userDbInfo]);

  const updateUserFetch = (data) => {
    fetch(`http://localhost:3000/users/update/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((newUser) => {
        toast("Mise à jour effectué !");
        setUserDbInfo(newUser);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Une erreur est survenue!");
      });
  };

  const submit = (e) => {
    e.preventDefault();
    updateUserFetch({
      nom: name,
      prenom: lastName,
      lien_facebook: facebookLink,
      lien_instagram: instagramLink,
    });
  };

  useEffect(() => {
    if (image) uploadImg();
  }, [image]);

  const uploadImg = () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "nswjp9as");
    data.append("cloud_name", "dm3zhhb6i");
    fetch("  https://api.cloudinary.com/v1_1/dm3zhhb6i/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setUrl(data.url);
        updateUserFetch({
          image: data.url,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="header-back">
      <div className="Header-container">
        <div className="logo">
          <img src={logo}></img>
        </div>

        <div className="profil-container">
          {/*  essaie du popup */}
          <div className="profil">
            <Tooltip>
              <div className="container-link">
                <div className="link">
                  <a href={userDbInfo?.lien_facebook} target="_blank">
                    <MdOutlineFacebook size={30} className="facebook" />
                  </a>
                  <a href={userDbInfo?.lien_instagram} target="_blank">
                    <FaInstagramSquare className="instagram" size={30} />
                  </a>
                </div>
                <img
                  title="Modifier votre profil"
                  arrow
                  placement="top"
                  className="modal-toggle"
                  onClick={toggleLoginForm}
                  src={userDbInfo?.image || profil}
                />
              </div>

              <Modal isShowing={isLoginFormShowed} hide={toggleLoginForm}>
                <div className="container-img">
                  {loading && (
                    <p className="loading-img">Chargement de l'image...</p>
                  )}
                  <img
                    className="modal-profil"
                    src={userDbInfo?.image || profil}
                  />
                  <div className="img-overlay"></div>
                  <label className="icons-camera" htmlFor="profil_img">
                    <BsFillCameraFill size={30} color="white" />
                  </label>
                  <input
                    type="file"
                    className="input-img"
                    id="profil_img"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>

                <p className="modal-profil-name">
                  {userDbInfo?.nom} {userDbInfo?.prenom}
                </p>
                <form onSubmit={submit}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Modifier votre nom"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      style={{ textAlign: "center" }}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Modier votre prenom"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                      style={{ textAlign: "center" }}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Modifier le lien facebook"
                      onChange={(e) => setFacebookLink(e.target.value)}
                      value={facebookLink}
                      style={{ textAlign: "center" }}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Modifier le lien instagram"
                      onChange={(e) => setInstagramLink(e.target.value)}
                      value={instagramLink}
                      style={{ textAlign: "center" }}
                    />
                  </div>

                  <div className="">
                    <input
                      className="btn-valider"
                      type="submit"
                      value="Valider"
                    />
                  </div>
                </form>
              </Modal>
            </Tooltip>
            {/* fin du popu */}
          </div>

          <div className="">
            <form className="search-bar" onSubmit={handleSeach}>
              <input
                type="text"
                placeholder="Rechecher"
                onChange={(e) => setText(e.target.value)}
                value={text}
                required
              ></input>
              <Link to={`/result/${text}`}>
                <button className="btn-search" type="submit">
                  <img className="search" src={search} />
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default InTheHeaders;
