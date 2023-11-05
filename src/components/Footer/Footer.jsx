import React from 'react'

function Footer() {
  return (
    <React.Fragment>
       <p className="mb-1 px-5 py-3 text-left text-xs text-cyan-500">Copyright WageFlow{" "}@{new Date().getFullYear()}</p>
    </React.Fragment>
  )
}

export default Footer
