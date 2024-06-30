import React from 'react';

function EducationalCards({ title, content, image, onEdit, onDelete }) {
  return (
    <div className="bg-white p-5 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold">{title}</h2>
      <img src={image} alt={title} className="my-3 w-full h-48 object-cover" />
      <p className="text-gray-600">{content}</p>
      <div className="flex justify-between mt-5">
        <button onClick={onEdit} className="bg-blue-500 text-white px-4 py-2 rounded">
          Edit
        </button>
        <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded">
          Delete
        </button>
      </div>
    </div>
  );
}

export default EducationalCards;
