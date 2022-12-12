import React from "react";
import "./comment.css";
import Comment from "./Comment";
import { useEffect } from "react";
import { useState } from "react";
import { json } from "react-router-dom";
import { useMemo } from "react";
import { useContext } from "react";
import { userContext } from "../connexion/ContextLogin";

const CommentContainer = ({ videoId, socket }) => {
  const { userId } = useContext(userContext);
  const [commentTitle, setCommentTitle] = useState([]);
  const [users, setUsers] = useState([]);
  const [textComment, setTextComment] = useState();
  const profil = localStorage.getItem("profilUser");

  useEffect(() => {
    socket.on("comment-send", (data) => {
      console.log(data);
      if (data) {
        const newCommentTitle = [...commentTitle, data];
        setCommentTitle(newCommentTitle);
      }
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
  }, [socket, commentTitle]);

  useEffect(() => {
    fetch("http://localhost:3000/comments")
      .then((response) => response.json())
      .then((data) => setCommentTitle(data.commentaires));

    fetch("http://localhost:3000/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.utilisateur));
  }, []);

  const usersComments = useMemo(() => {
    return commentTitle.map((comment) => {
      return {
        ...comment,
        user: users?.find((user) => user.gapi_id === comment.userId),
      };
    });
  }, [commentTitle, users]);

  console.log("usersComments", usersComments);

  //const toggleCommentRes = (idComment) => {};

  const post = () => {
    if (textComment.trim()) {
      socket.emit("comment-send", {
        commentaire: textComment,
        socketID: socket.id,
        userId,
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
      {usersComments
        ?.filter((comment) => comment.videoId === videoId)
        .map((comment) => {
          return (
            <div key={comment._id}>
              <Comment comment={comment} socket={socket} />
            </div>
          );
        })}
    </div>
  );
};

export default CommentContainer;
