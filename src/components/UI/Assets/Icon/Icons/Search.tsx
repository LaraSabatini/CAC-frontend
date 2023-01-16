/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function IconSearch({ width, height, color }: IconInterface) {
  return (
    <svg
      id="icon-buscar"
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "19.993"}
      height={height ?? "20.688"}
      viewBox="0 0 19.993 20.688"
    >
      <path
        id="Trazado_5362"
        data-name="Trazado 5362"
        d="M1377,649.828a7.389,7.389,0,1,0,1.71,4.725A7.375,7.375,0,0,0,1377,649.828Zm-5.681,9.806a5.057,5.057,0,1,1,5.081-5.081A5.034,5.034,0,0,1,1371.319,659.634Z"
        transform="translate(-1363.929 -647.163)"
        fill={color || "#70777c"}
      />
      <path
        id="Trazado_5363"
        data-name="Trazado 5363"
        d="M1383.48,665.277l-5.316-5.317a7.42,7.42,0,0,1-2.264,1.985l-.009.007,5.453,5.453,0,0a1.508,1.508,0,1,0,2.132-2.132Z"
        transform="translate(-1363.929 -647.163)"
        fill={color || "#70777c"}
      />
    </svg>
  )
}

export default IconSearch