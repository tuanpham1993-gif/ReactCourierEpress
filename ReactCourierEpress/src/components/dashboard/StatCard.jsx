import React from "react";

function StatCard({ title, value, type }) {
  return (
    <div className={`stat-card ${type}`}>
      <p>{title}</p>
      <h3>{value}</h3>
    </div>
  );
}

export default StatCard;