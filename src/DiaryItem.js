import React from "react";

const DiaryItem = ({ author, content, created_date, emotion }) => {
  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수 : {emotion}
        </span>
        <br />
        <span className="date">
          작성 시간(ms) : {new Date(created_date).toLocaleTimeString()}
        </span>
      </div>
      <div className="content">{content}</div>
      <button>삭제하기</button>
    </div>
  );
};

export default DiaryItem;
