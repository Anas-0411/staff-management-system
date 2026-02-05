import React from "react";

const SummaryCard = ({ icon, title, value, color }) => {
  return (
    <div className="flex bg-white rounded shadow">
      <div className={`text-3xl flex justify-center items-center rounded ${color} text-white px-4 cursor-pointer`}>{icon}</div>
      <div className="pl-4 py-1">
        <h4 className="text-lg font-bold">{title}</h4>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
