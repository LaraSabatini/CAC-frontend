/* eslint-disable prettier/prettier */
import * as React from "react"
import IconInterface from "interfaces/components/IconInterface"

function Profile({ width, height, color }: IconInterface) {
  return (
    <svg 
    width={width ?? "41"} 
    height={height ?? "41"} 
    viewBox="0 0 41 41" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M20.3799 40.7998C31.4256 40.7998 40.3799 31.8455 40.3799 20.7998C40.3799 9.75411 31.4256 0.799805 20.3799 0.799805C9.33423 0.799805 0.379883 9.75411 0.379883 20.7998C0.379883 31.8455 9.33423 40.7998 20.3799 40.7998Z" 
        fill={color || "#466995"}
      />
      <path 
        fillRule="evenodd" 
        clipRule="evenodd" d="M34.1106 35.0708C30.5261 38.467 25.685 40.5502 20.3573 40.5502C15.0296 40.5502 10.1885 38.467 6.604 35.0708C7.30418 28.0925 13.1945 22.6445 20.3573 22.6445C27.5201 22.6445 33.4104 28.0925 34.1106 35.0708Z" 
        fill="#F2F8FF"
      />
      <path 
        d="M20.3572 23.2852C24.6881 23.2852 28.1991 19.7743 28.1991 15.4434C28.1991 11.1125 24.6881 7.60156 20.3572 7.60156C16.0263 7.60156 12.5154 11.1125 12.5154 15.4434C12.5154 19.7743 16.0263 23.2852 20.3572 23.2852Z" 
        fill="#F2F8FF"
      />
      <path 
        d="M39.8046 20.7621C39.8046 31.5109 31.091 40.2245 20.3422 40.2245C9.59347 40.2245 0.879883 31.5109 0.879883 20.7621C0.879883 10.0134 9.59347 1.2998 20.3422 1.2998C31.091 1.2998 39.8046 10.0134 39.8046 20.7621Z" 
        stroke={color || "#466995"}
      />
  </svg>
  )
}

export default Profile