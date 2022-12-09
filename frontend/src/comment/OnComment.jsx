import React from "react";
import thumbsUp from "./thumbs-up.svg";
import thumbsDown from "./thumbs-down.svg";
import { useState } from "react";

const profil = localStorage.getItem("profilUser");
const OnComment = ({ comment, socket }) => {
  const [openCommentRes, setOpenCommentRes] = useState(false);
  const showSubComment = () => {
    setOpenCommentRes((value) => !value);
    console.log(openCommentRes);
  };

  return (
    <div>
      <div className="show-comment">
        <img className="profil-comment" src={comment?.user?.image} />
        <p>{comment.commentaire}</p>
      </div>
      <div className="note-comment">
        <div className="thumbs-Up">
          <img className="th-Up" src={thumbsUp} />
          <p>12</p>
        </div>
        <div className="thumbs-Down">
          <img className="th-Down" src={thumbsDown} />
          <p>12</p>
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
  const [subcommentText, setSubcommentText] = useState();
  const commentId = comment._id;

  const post = () => {
    if (subcommentText.trim()) {
      socket.emit("comment-reply", {
        commentaire: subcommentText,
        socketID: socket.id,
        commentId,
      });
      setSubcommentText("");
    }
  };

  // alert(JSON.stringify(comment));

  return trigger ? (
    <div className="sub-comment">
      <div className="profil-input">
        <img className="profil-comment" src={profil} />
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
        {comment.subcomments.map((subcomment) => (
          <React.Fragment key={subcomment._id}>
            <div className="show-comment">
              <img className="profil-comment" src={profil} />
              <p>{subcomment.commentaire}</p>
            </div>
            <div className="note-subComment">
              <div className="thup-subComment">
                <img className="thup" src={thumbsUp} />
                <p>12</p>
              </div>
              <div className="thdown-subomment">
                <img className="thDown" src={thumbsDown} />
                <p>12</p>
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

export default OnComment;
