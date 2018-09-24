/* eslint-disable max-len */
import * as React from 'react';

const DashboardIcon = ({ fillPath1, fillPath2 }) => (
  <svg viewBox="0 0 17 14">
    <g>
      <path d="M17 0v14H0V0h17z" fill={fillPath1} />
      <path d="M2 2h3v8H2zm4 0h7v4H6zm0 5h3v3H6zm4 0h3v3h-3z" fill={fillPath2} />
    </g>
  </svg>
);

export default DashboardIcon;
