import React from "react"
import { FaRegTrashAlt } from "react-icons/fa"

function DeleteEvent({
  allowClick,
  authenticate,
}: {
  allowClick: boolean
  authenticate: (arg?: any) => void
}) {
  return (
    <button
      type="button"
      className="trash"
      disabled={!allowClick}
      onClick={authenticate}
    >
      <FaRegTrashAlt />
    </button>
  )
}

export default DeleteEvent
