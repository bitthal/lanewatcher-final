import React from "react";

export default function Arrow() {
  return (
    <div className="flex flex-col gap-4">
      <svg
        width="50"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        className="animated-arrow"
      >
      {Array.from({ length: 20 }).map((_, index) => (
          <line
            key={index}
            x1={index * 10}
            y1="12"
            x2={(index + 1) * 10}
            y2="12"
            stroke="#434190"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <animate
              attributeName="stroke-dasharray"
              from={`0 ${5 + index}`}
              to={`${10 + index} ${5 + index}`}
              dur={`${0.5 + index * 0.1}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
        <polygon
          points="50,12 40,16 40,12 40,8"
          fill="#434190"
        />
      </svg>
    </div>
  );
}
