import React from "react";
import "./comment.css";
import OnComment from "./OnComment";
import { useEffect } from "react";
import { useState } from "react";
import { json } from "react-router-dom";

const Comment = ({ videoId, socket }) => {
  const [commentTitle, setCommentTitle] = useState([]);
  const [textComment, setTextComment] = useState();
  const profil = localStorage.getItem("profilUser");

  useEffect(() => {
    socket.on("comment-send", (data) => {
      console.log(data);
      console.log(commentTitle);
      setCommentTitle([...commentTitle, data]);
    });
    socket.on("comment-reply", (data) => {
      console.log("reply", data);
      const newCommentTitle = commentTitle.map((comment) => {
        if (comment.id === data.id) return data;
        return comment;
      });

      setCommentTitle(newCommentTitle);
    });

    return () => {
      socket.removeListener("comment-send");
      socket.removeListener("comment-reply");
    };
  }, [socket]);

  useEffect(() => {
    fetch("http://localhost:3000/comments")
      .then((response) => response.json())
      .then((data) => setCommentTitle(data.commentaires));
  }, []);

  //const toggleCommentRes = (idComment) => {};

  const post = () => {
    if (textComment.trim()) {
      socket.emit("comment-send", {
        commentaire: textComment,
        socketID: socket.id,
        videoId,
      });
      setTextComment("");
    }
    /* fetch("http://localhost:3000/comments/comment", {
      method: "post",
      headers: {
        "Content-Type": "application/json", */
    // 'Content-Type': 'application/x-www-form-urlencoded',
    /*    },
      body: JSON.stringify({ commentaire: textComment, videoId }),
    })
      .then((response) => response.json())
      .then((data) => setTextComment(data.commentaire));*/
  };
  return (
    <div className="bloc-comment">
      <div>
        <h3>Je suis le titre</h3>
      </div>
      <div className="profil-input">
        <img className="profilComment" src={profil} />
        <input
          className="input-comment"
          value={textComment}
          onChange={(e) => setTextComment(e.target.value)}
          placeholder="Laisser un commentaire"
        />
        <button className="send-comment" onClick={post}>
          Ajouter un commentaire
        </button>
      </div>
      {commentTitle
        ?.filter((comment) => comment.videoId === videoId)
        .map((comment) => {
          return (
            <div key={comment._id}>
              <OnComment comment={comment} socket={socket} />
            </div>
          );
        })}
    </div>
  );
};

export default Comment;
