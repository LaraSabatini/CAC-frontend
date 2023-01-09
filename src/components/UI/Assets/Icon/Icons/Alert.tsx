/* eslint-disable prettier/prettier */
import React from "react"
import IconInterface from 'interfaces/components/IconInterface'

function IconAlert({width, height, color}: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "27.556"}
      height={height ?? "25.067"}
      viewBox="0 0 27.556 25.067"
    >
      <g id="icon-alerta" transform="translate(-969.68 -649.859)">
        <path
          id="Trazado_5492"
          data-name="Trazado 5492"
          d="M996.6,667.876,987.522,652.2a4.7,4.7,0,0,0-8.129,0l-9.074,15.674a4.7,4.7,0,0,0,4.064,7.05h18.15A4.7,4.7,0,0,0,996.6,667.876Zm-2.03,3.526a2.306,2.306,0,0,1-2.034,1.176h-18.15a2.349,2.349,0,0,1-2.032-3.525l9.075-15.675a2.348,2.348,0,0,1,4.064,0l9.075,15.675A2.306,2.306,0,0,1,994.567,671.4Z"
          fill={color ?? "#70777c"}
        />
        <path
          id="Trazado_5493"
          data-name="Trazado 5493"
          d="M983.517,667.612a1.612,1.612,0,1,0,1.611,1.612A1.612,1.612,0,0,0,983.517,667.612Z"
          fill={color ?? "#70777c"}
        />
        <path
          id="Trazado_5494"
          data-name="Trazado 5494"
          d="M983.517,656.325c-.926,0-1.625.483-1.625,1.262v7.152c0,.783.7,1.262,1.625,1.262.9,0,1.625-.5,1.625-1.262v-7.152C985.142,656.826,984.42,656.325,983.517,656.325Z"
          fill={color ?? "#70777c"}
        />
      </g>
    </svg>
  )
}

export default IconAlert