import React from "react";

const App = () => {

  return(
  <div className="bg-gray-950 h-screen flex items-center justify-center">
   <div className="w-9/12 relative">
    <video src="/sample.mp4" className="w-full"/>
    <div className="absolute"></div>
   </div>
  </div>
  )

}

export default App