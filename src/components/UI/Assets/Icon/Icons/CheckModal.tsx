/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from 'interfaces/components/IconInterface'

function IconCheckModal({width, height, color}: IconInterface) {
  return (
    <svg
      id="icon-check-modal"
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "74.036"}
      height={height ?? "74.036"}
      viewBox="0 0 74.036 74.036"
    >
      <circle
        id="Elipse_1258"
        data-name="Elipse 1258"
        cx="37.018"
        cy="37.018"
        r="37.018"
        fill="none"
      />
      <path
        id="Trazado_851"
        data-name="Trazado 851"
        d="M146.467,191.744a3.029,3.029,0,0,1-2.189-.942l-11.33-11.811a3.207,3.207,0,0,1,.037-4.454,3.019,3.019,0,0,1,4.342.038l9.052,9.436,18.727-21.156a3.018,3.018,0,0,1,4.336-.214,3.209,3.209,0,0,1,.209,4.45l-20.91,23.622a3.038,3.038,0,0,1-2.211,1.033A.417.417,0,0,0,146.467,191.744Z"
        transform="translate(-114.239 -139.766)"
        fill={color ?? "#70777c"}
      />
    </svg>
  )
}

export default IconCheckModal