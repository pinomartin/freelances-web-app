import React from 'react';
import SectorPath from './SectorPath';
import chroma from 'chroma-js';
import { describeArc } from './utils';
import 'tippy.js/dist/tippy.css';
import './RadialChart.css';

export default function(props) {
  const {
    data,
    outerRadius = 100,
    innerRadius = 0,
    tooltip = true,
    tooltipContent = null,
    responsive = true,
  } = props;

  let startAngle = props.startAngle;

  const size = outerRadius * 2;
  const total = data.reduce((total, current) => total + current.value, 0);
  const colors = chroma.scale('Spectral').colors(data.length);

  return (
    <svg
      className="svg-radial-chart"
      style={{
        height: responsive ? null : `${size}px`,
        width: responsive ? null : `${size}px`,
        maxHeight: responsive ? `${size}px` : null,
        maxWidth: responsive ? `${size}px` : null,
      }}
      viewBox={`0 0 ${size} ${size}`}
    >
      {data.map((sector, index) => {
        const { value, label, color } = sector;
        const sectorAngle = (value / total) * 360;
        const x = size / 2;
        const y = size / 2;
        const strokeWidth = outerRadius - innerRadius;
        const radius = (size - strokeWidth) / 2;
        const endAngle = startAngle + sectorAngle;
        const d = describeArc(x, y, radius, startAngle, endAngle);

        startAngle = startAngle += sectorAngle;

        const animationDuration = 0.8;
        const sectorColor = color ? color : colors[index];

        const renderTooltipContent = () => {
          if (!tooltip) {
            return null;
          }

          if (React.isValidElement(tooltipContent)) {
            return React.cloneElement(tooltipContent, {
              ...sector,
              index,
              color: sectorColor,
            });
          }

          return tooltipContent;
        };

        return (
          <SectorPath
            key={`${label}=${value}`}
            d={d}
            animationDuration={animationDuration}
            strokeWidth={strokeWidth}
            color={sectorColor}
            tooltip={tooltip}
            tooltipContent={renderTooltipContent()}
          />
        );
      })}
    </svg>
  );
}
