import { useState, useEffect, useRef } from 'react';
import Tippy from '@tippyjs/react';
import { followCursor } from 'tippy.js';
import chroma from 'chroma-js';
import 'tippy.js/animations/scale.css';

export default function(props) {
  const {
    d,
    color,
    strokeWidth,
    animationDuration,
    tooltip,
    tooltipContent,
  } = props;
  const [isActive, setIsActive] = useState(false);
  const [pathLength, setPathLength] = useState(null);
  const pathRef = useRef();

  useEffect(() => {
    if (!pathRef.current) return;
    setPathLength(pathRef.current.getTotalLength());
  }, [d]);

  const handleMouseEnter = () => {
    if (!tooltip) return;
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    if (!tooltip) return;
    setIsActive(false);
  };

  const renderPath = () => (
    <path
      className="path"
      ref={pathRef}
      d={d}
      fill="none"
      stroke={isActive ? chroma(color).brighten(0.5) : color}
      strokeDasharray={pathLength}
      strokeDashoffset={-pathLength}
      strokeWidth={strokeWidth}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        animationDuration: `${animationDuration}s`,
      }}
    />
  );

  return tooltip ? (
    <Tippy
      animation="scale"
      content={tooltipContent}
      arrow={false}
      delay={[0, 0]}
      // duration={[0, 0]}
      followCursor={true}
      plugins={[followCursor]}
      theme="custom"
    >
      {renderPath()}
    </Tippy>
  ) : (
    renderPath()
  );
}
