/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from 'interfaces/components/IconInterface'

function Error({width, height, color}: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "25.499"}
      height={height ?? "25.499"}
      viewBox="0 0 25.499 25.499"
    >
      <g id="icon-error" transform="translate(-1093.729 -650.26)">
        <path
          id="Trazado_5498"
          data-name="Trazado 5498"
          d="M1112.055,657.433a1.172,1.172,0,0,0-1.656,0l-3.921,3.921-3.92-3.921a1.171,1.171,0,1,0-1.656,1.656l3.921,3.921-3.921,3.921a1.171,1.171,0,1,0,1.656,1.656l3.92-3.921,3.921,3.921a1.171,1.171,0,0,0,1.656-1.656l-3.921-3.921,3.921-3.921A1.172,1.172,0,0,0,1112.055,657.433Z"
          fill={color ?? "#70777c"}
        />
        <path
          id="Trazado_5499"
          data-name="Trazado 5499"
          d="M1106.482,650.26h0a12.749,12.749,0,1,0,12.75,12.75A12.664,12.664,0,0,0,1106.478,650.26Zm7.53,20.29a10.594,10.594,0,0,1-7.537,3.121h-.005a10.666,10.666,0,0,1-.022-21.331h.03a10.665,10.665,0,0,1,7.534,18.21Z"
          fill={color ?? "#70777c"}
        />
      </g>
    </svg>
  )
}

export default Error
