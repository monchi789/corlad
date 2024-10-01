import React from "react";

interface SpinnerProps {
  size?: string;
  color?: string
}

const Spinner: React.FC<SpinnerProps> = ({ size = "w-6 h-6", color = "border-green-500"}) => {
  return (
    <div className="flex justify-center items-center px-5 py-1">
      <div className={`${size} border-4 ${color} border-t-transparent border-solid rounded-full animate-spin`}></div>
    </div>
  );
};

export default Spinner;
