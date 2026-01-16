
// polar to cartesian coords
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

// keeps angle in 0-360 range
function normalizeAngle(angle) {
  return ((angle % 360) + 360) % 360;
}

// basic arc path - just a curved line
export function describeArc(x, y, radius, startAngle, endAngle) {
  const normStart = normalizeAngle(startAngle);
  const normEnd = normalizeAngle(endAngle);

  const start = polarToCartesian(x, y, radius, normEnd);
  const end = polarToCartesian(x, y, radius, normStart);

  const arcSpan = Math.abs(endAngle - startAngle);
  const largeArcFlag = arcSpan <= 180 ? "0" : "1";

  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
}

// filled arc segment - like a curved rectangle
export function describeArcPath(cx, cy, innerRadius, outerRadius, startAngle, endAngle) {
  const normStart = normalizeAngle(startAngle);
  const normEnd = normalizeAngle(endAngle);

  // four corners of the shape
  const outerStart = polarToCartesian(cx, cy, outerRadius, normStart);
  const outerEnd = polarToCartesian(cx, cy, outerRadius, normEnd);
  const innerEnd = polarToCartesian(cx, cy, innerRadius, normEnd);
  const innerStart = polarToCartesian(cx, cy, innerRadius, normStart);

  const arcSpan = Math.abs(endAngle - startAngle);
  const largeArcFlag = arcSpan <= 180 ? "0" : "1";

  // draws outer arc, then line to inner, then inner arc back, close
  return [
    "M", outerStart.x, outerStart.y,
    "A", outerRadius, outerRadius, 0, largeArcFlag, 1, outerEnd.x, outerEnd.y,
    "L", innerEnd.x, innerEnd.y,
    "A", innerRadius, innerRadius, 0, largeArcFlag, 0, innerStart.x, innerStart.y,
    "Z"
  ].join(" ");
}
