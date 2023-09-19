import React from "react";

export default function Arrow() {
  const numLines = 10;
  const lineHeight = 2; // Adjust the thickness of the lines (reduced from 4 to 2)
  const arrowSize = 12; // Adjust the size of the arrowhead
  const totalWidth = numLines * (lineHeight + 5); // Adjust the total width including the gap
  const animationDuration = 6; // Adjust animation duration (seconds)

  return (
    <div className="flex flex-col gap-4">
      <svg
        width={totalWidth}
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        className="animated-arrow"
      >
        {Array.from({ length: numLines }).map((_, index) => (
          <line
            key={index}
            x1={index * (lineHeight + 5)} // Adjust the gap between the lines
            y1="12"
            x2={index * (lineHeight + 5) + lineHeight}
            y2="12"
            stroke="#434190"
            stroke-dasharray="5 10" // Adjust the dash pattern (5 for dashes, 15 for gaps)
            strokeWidth={lineHeight}
            strokeLinecap="round"
          >
            <animate
              attributeName="x1"
              from={`${index * (lineHeight + 5) - totalWidth}`} // Start from offscreen left (adjusted for thinner lines)
              to={`${(index + 1) * (lineHeight + 5)}`} // Move to the right with the gap
              dur={`${animationDuration}s`}
              begin={`${index * (animationDuration / numLines)}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="x2"
              from={`${index * (lineHeight + 5)}`} // Start from offscreen left (adjusted for thinner lines)
              to={`${(index + 1) * (lineHeight + 5) + lineHeight}`} // Move to the right with the gap
              dur={`${animationDuration}s`}
              begin={`${index * (animationDuration / numLines)}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
        <polygon
          points={`${totalWidth},${12} ${totalWidth - arrowSize},${12 + arrowSize} ${totalWidth - arrowSize},${12} ${totalWidth - arrowSize},${12 - arrowSize}`}
          fill="#434190"
        />
      </svg>
    </div>
  );
}
