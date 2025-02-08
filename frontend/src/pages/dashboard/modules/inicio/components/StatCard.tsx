import React from "react";
import CountUp from "react-countup";

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
}

const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4">
    <div className={`p-4 rounded-lg ${color}`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <div>
      <p className="text-gray-600 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-800">
        <CountUp end={value} duration={1.5} />
      </p>
    </div>
  </div>
);

export default StatCard;
