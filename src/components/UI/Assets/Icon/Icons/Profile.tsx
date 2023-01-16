/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function Profile({ width, height, color }: IconInterface) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? "20.17"}
      height={height ?? "20.79"}
      viewBox="0 0 20.17 20.79"
    >
      <g id="icon-user" transform="translate(0 0.001)">
        <path
          id="Unión_19"
          data-name="Unión 19"
          d="M5049.089-3387.874c-.128-2.061,2.128-3.565,4.312-5.019l.074-.048a9.987,9.987,0,0,1,5.851-2.21,9.64,9.64,0,0,1,5.111,1.758l.007.005c1.743,1.055,4.991,3.017,4.8,5.527-.237,3.12-5.728,4.935-9.6,5.047-.141,0-.283.005-.425.005C5054.586-3382.809,5049.271-3384.948,5049.089-3387.874Zm6.363-11.917v-.1a3.675,3.675,0,0,1,3.611-3.709h.014a3.716,3.716,0,0,1,3.807,3.624,3.716,3.716,0,0,1-3.624,3.807h-.094A3.718,3.718,0,0,1,5055.452-3399.791Z"
          transform="translate(-5049.083 3403.599)"
          fill={color || "#F2F8FF"}
        />
      </g>
    </svg>
  )
}

export default Profile