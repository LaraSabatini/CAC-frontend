/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from 'interfaces/components/IconInterface'

function IconNotice({width, height, color}: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "25.901"}
      height={height ?? "25.9"}
      viewBox="0 0 25.901 25.9"
    >
      <g id="icon-aviso" transform="translate(-1080.779 -682.087)">
        <path
          id="Trazado_5510"
          data-name="Trazado 5510"
          d="M1093.733,682.087h0a12.95,12.95,0,1,0,12.951,12.95A12.965,12.965,0,0,0,1093.729,682.087Zm7.649,20.609a10.763,10.763,0,0,1-7.656,3.17h-.005a10.833,10.833,0,0,1-.023-21.666h.031a10.833,10.833,0,0,1,7.653,18.5Z"
          fill={color ?? "#70777c"}
        />
        <path
          id="Trazado_5511"
          data-name="Trazado 5511"
          d="M1093.729,699a1.585,1.585,0,1,0,1.585,1.586A1.585,1.585,0,0,0,1093.729,699Z"
          fill={color ?? "#70777c"}
        />
        <path
          id="Trazado_5512"
          data-name="Trazado 5512"
          d="M1093.729,687.9c-.909,0-1.6.475-1.6,1.242v7.034c0,.77.689,1.241,1.6,1.241.888,0,1.6-.493,1.6-1.241v-7.034C1095.328,688.4,1094.618,687.9,1093.729,687.9Z"
          fill={color ?? "#70777c"}
        />
      </g>
    </svg>
  )
}

export default IconNotice