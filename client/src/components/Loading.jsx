import React from "react";
import "./Loading.css";
import { LoaderCircle } from "lucide-react";

export const Loading = () => {
  return (
    <div className="loading">
      <LoaderCircle className="loading-icon" />
      <p>Loading...</p>
    </div>
  );
};
