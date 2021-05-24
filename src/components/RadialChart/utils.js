/**
 *
 * @param {*} value
 * @param {*} total
 */
 export function scale(value, total) {
    return (value * Math.PI * 2) / total;
  }
  
  /**
   *
   * @param {*} centerX
   * @param {*} centerY
   * @param {*} radius
   * @param {*} angleInDegrees
   */
  export function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }
  
  /**
   *
   * @param {*} x
   * @param {*} y
   * @param {*} radius
   * @param {*} startAngle
   * @param {*} endAngle
   */
  export function describeArc(x, y, radius, startAngle, endAngle) {
    
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
  
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  
    var d = [
      'M',
      start.x,
      start.y,
      'A',
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(' ');

    return d;
  }
  
 