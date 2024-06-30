import React from "react";

function PostCards({ title, content, image, onDelete }) {
  return (
    <div className="my-10">
      <div className="w-56 bg-white p-5">
        <h1 className="text-2xl font-bold">{title}</h1>
        <h3 className="text-gray-400 mt-3">Time</h3>
        <img src={image} alt={title} style={{ width: "100%" }} />
        <p>{content}</p>
        <button onClick={onDelete} className="bg-red-400 text-white px-5 py-3 my-5">Delete</button>
      </div>
    </div>
  );
}

export default PostCards;
