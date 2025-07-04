import React from "react";
import { GraduationCap } from "lucide-react";

export const Header = ({ title, subtitle, showBadge = true }) => (
  <div className="mb-8">
    {showBadge && (
      <div className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
        <GraduationCap size={16} />
        Intervue Poll
      </div>
    )}
    <h1 className="text-4xl font-bold text-dark mb-4">{title}</h1>
    <p className="text-mediumgray text-lg max-w-2xl">{subtitle}</p>
  </div>
);