import React from "react";
import thumbsUp from "./thumbs-up.svg";
import thumbsDown from "./thumbs-down.svg";
import { useState } from "react";
import { useContext } from "react";
import { userContext } from "../connexion/ContextLogin";
import "moment/locale/fr";
import moment from "moment";
import { BsHandThumbsUpFill, BsHandThumbsDownFill } from "react-icons/bs";
import { useEffect } from "react";

const profil = localStorage.getItem("profilUser");
const Comment = ({ comment, socket, lastMessageRef }) => {
  moment.locale("fr");
  const [openCommentRes, setOpenCommentRes] = useState(false);
  const [likeCount, setLikeCount] = useState(null);
  const [dislikesCount, setDisLikesCount] = useState(null);
  const { userId } = useContext(userContext);
  const showSubComment = () => {
    setOpenCommentRes((value) => !value);
    console.log(openCommentRes);
  };
  const handleLike = () => {
    fetch("http://localhost:3000/comments/like", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId: comment._id, userId }),
    })
      .then((res) => res.json())
      .then((data) => setLikeCount(data.count));
  };
  const handleDislike = () => {
    fetch("http://localhost:3000/comments/dislike", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId: comment._id, userId }),
    })
      .then((res) => res.json())
      .then((data) => setDisLikesCount(data.count));
  };

  console.log(likeCount);
  console.log(dislikesCount);
  return (
    <div>
      <div className="show-comment">
        <img className="profil-comment" src={comment?.user?.image} />
        <p>{comment.commentaire}</p>
        <p className="times">{moment(comment.createdAt).fromNow()}</p>
      </div>

      <div ref={lastMessageRef}></div>
      <div className="note-comment">
        <div className="thumbs-Up">
          <BsHandThumbsUpFill
            size={20}
            onClick={handleLike}
            className="th-Up"
          />
          {Boolean(likeCount || comment.likes.length) && (
            <p>{likeCount || comment.likes.length}</p>
          )}
        </div>
        <div className="thumbs-Down">
          <BsHandThumbsDownFill
            size={20}
            onClick={handleDislike}
            className="th-Down"
          />
          {Boolean(dislikesCount || comment.dislikes.length) && (
            <p>{dislikesCount || comment.dislikes.length}</p>
          )}

          <div>
            <p
              className="response"
              active="true"
              onClick={() => showSubComment()}
            >
              Répondre
            </p>
          </div>
        </div>
      </div>
      <OpenCommentRes
        trigger={openCommentRes}
        comment={comment}
        socket={socket}
      />
    </div>
  );
};

const OpenCommentRes = ({ trigger, comment, socket }) => {
  const { userDbInfo, userId } = useContext(userContext);
  const [likeSubCommentCount, setLikeSubCommentCount] = useState(null);
  const [dislikeSubcommentCount, setDislikeSubcommentCount] = useState(null);
  const [subcommentText, setSubcommentText] = useState();
  const commentId = comment._id;

  const post = () => {
    if (subcommentText.trim()) {
      socket.emit("comment-reply", {
        commentaire: subcommentText,
        socketID: socket.id,
        userId,
        commentId,
      });
      setSubcommentText("");
    }
  };

  const handleLikeSubComment = (subCommentId) => {
    fetch("http://localhost:3000/comments/sublike", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId: comment._id, userId, subCommentId }),
    })
      .then((res) => res.json())
      .then((data) => setLikeSubCommentCount(data.count));
  };

  const handleDislikeSubComment = (subCommentId) => {
    fetch("http://localhost:3000/comments/subdislike", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentId: comment._id, userId, subCommentId }),
    })
      .then((res) => res.json())
      .then((data) => setDislikeSubcommentCount(data.count));
  };

  // alert(JSON.stringify(comment));

  return trigger ? (
    <div className="sub-comment">
      <div className="profil-input-Res">
        <img className="profil-comment" src={userDbInfo?.image || profil} />
        <input
          className="input-subcomment"
          type="text"
          value={subcommentText}
          onChange={(e) => setSubcommentText(e.target.value)}
          placeholder="laisser un commentaire"
        />
        <button className="send-comment" onClick={post}>
          Répondre
        </button>
      </div>

      <p>
        {comment.subcomments.map((subcomment, idx) => (
          <React.Fragment key={subcomment._id}>
            <div className="show-comment">
              <img className="profil-comment" src={subcomment?.user?.image} />
              <p>{subcomment.commentaire}</p>
              <p className="times">{moment(subcomment.createdAt).fromNow()}</p>
              {}
            </div>
            <div className="note-subComment">
              <div className="thup-subComment">
                <BsHandThumbsUpFill
                  size={20}
                  className="th-Up-sub"
                  onClick={() => handleLikeSubComment(subcomment._id)}
                />
                {Boolean(likeSubCommentCount || subcomment.likes.length) && (
                  <p>{likeSubCommentCount || subcomment.likes.length}</p>
                )}
              </div>
              <div className="thdown-subomment">
                <BsHandThumbsDownFill
                  onClick={() => handleDislikeSubComment(subcomment._id)}
                  size={20}
                />
                {Boolean(
                  dislikeSubcommentCount || subcomment.dislikes.length
                ) && (
                  <p>{dislikeSubcommentCount || subcomment.dislikes.length}</p>
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
      </p>
    </div>
  ) : (
    ""
  );
};

export default Comment;
