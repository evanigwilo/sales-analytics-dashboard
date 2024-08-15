// icon:ecommerce_sales | Linea Iconset https://linea.io/ | Benjamin Sigidi
import * as React from "react";

function IconSales(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      height="1.5em"
      width="1.5em"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={2}
      >
        <path d="M21.903 5L55 38.097 34.097 59 1 25.903V5z" />
        <path d="M29.903 5L63 38.097 42.097 59" />
        <path d="M19 18 A5 5 0 0 1 14 23 A5 5 0 0 1 9 18 A5 5 0 0 1 19 18 z" />
      </g>
    </svg>
  );
}

export default IconSales;
