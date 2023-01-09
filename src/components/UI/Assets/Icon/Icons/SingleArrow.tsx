/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from 'interfaces/components/IconInterface'

function SingleArrow({width, height, color}: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "14.261"}
      height={height ?? "8.38"}
      viewBox="0 0 14.261 8.38"
    >
      <g
        id="Icon_ionic-ios-arrow-dropleft"
        data-name="Icon ionic-ios-arrow-dropleft"
        transform="translate(0)"
      >
        <path
          id="Trazado_868"
          data-name="Trazado 868"
          d="M1562.122,650.117a1.213,1.213,0,0,0,0,1.707l5.984,5.963a1.207,1.207,0,0,0,1.664.037l5.9-5.876a1.205,1.205,0,0,0-1.678-1.73l-.023.023-5.065,4.99-5.071-5.123a1.205,1.205,0,0,0-1.7.008Z"
          transform="translate(-1561.771 -649.759)"
          fill={color ?? "#70777c"}
        />
      </g>
    </svg>
  )
}

export default SingleArrow
