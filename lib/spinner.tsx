import { SVGProps } from "react";

// stolen from https://github.com/chantastic/react-svg-spinner/blob/master/index.js

function speedSwitch(speed) {
  if (speed === "fast") return 600;
  if (speed === "slow") return 900;
  return 750;
}

const Spinner = ({
  color,
  speed,
  gap,
  thickness,
  size,
  ...props
}: {
  color?: string;
  speed?: "fast" | "slow";
  gap?: number;
  size?: number;
  thickness?: number;
} & SVGProps<SVGSVGElement>) => {
  const _color = color;
  const _thickness = thickness || 3;
  const _gap = gap || 1;

  return (
    <svg
      height={size || 16}
      width={size || 16}
      {...props}
      style={{ animationDuration: `${speedSwitch(speed || "slow")}ms` }}
      className="__react-svg-spinner_circle"
      role="img"
      aria-labelledby="title desc"
      viewBox="0 0 32 32"
    >
      <style jsx>{`
        .__react-svg-spinner_circle {
          transition-property: transform;
          animation-name: __react-svg-spinner_infinite-spin;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        @keyframes __react-svg-spinner_infinite-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <circle
        role="presentation"
        cx={16}
        cy={16}
        r={14 - _thickness / 2}
        stroke={_color}
        fill="none"
        strokeWidth={_thickness}
        strokeDasharray={Math.PI * 2 * (11 - _gap)}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Spinner;
