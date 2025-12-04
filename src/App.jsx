import { Maximize, Pause, Play, Plus, Volume2Icon } from "lucide-react";
import React, { useRef, useState } from "react";

const App = () => {

  const videoRef = useRef(null)
  const [src,setSrc] = useState("/sample.mp4")
  const [playing, setPlaying] = useState(false)


  const playPause = () =>{
    const video = videoRef.current
    if(video.paused)
    {
    video.play()
    setPlaying(true)
    }else{
      video.pause()
      setPlaying(false)
    }

  }

  const addVideo = (e)=>{
    const input = e.target
    const file = input.files[0]
   const url = URL.createObjectURL(file)
   setSrc(url)
  }

  const onloadedmetadata = (e) =>{
    if(src !== "/sample.mp4")
    {
    playPause()
    const video = e.currentTarget
    const duration = video.duration
    console.log(duration)
    }
  }


  return(
  <div className="bg-gray-950 h-screen flex items-center justify-center">
   <div className="w-9/12 relative">
    <video ref={videoRef} src={src} className="w-full"   onLoadedMetadata ={onloadedmetadata}/>
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via black/50 via-40% to-transparent flex items-end justify-between">
    <div className="px-6 py-4 space-x-6 flex items-center flex-1">
       <button className="relative bg-gradient-to-br from-orange-500 via-rose-400 to-orange-500 p-3 rounded text-white shadow-lg active:scale-80 duration-300">
        <Plus/>
        <input
         type="file"
         accept="video/*"
         className="absolute top-0 left-0 w-full h-full opacity-0"
         onChange={addVideo}
        />
      </button>
      <button onClick={playPause} className="bg-gradient-to-br from-orange-500 via-rose-400 to-orange-500 p-3 rounded text-white shadow-lg active:scale-80 duration-300">
       {
        playing ?
        <Pause/>
        :
        <Play/>
       }
      </button>

      <div className="text-white w-full flex gap-6">
        <label className="font-medium">12:10/50/12</label>
        <div className="bg-white flex-1">
          <div className="bg-gradient-to-br from-orange-500 via-rose-400 to-orange-500 w-1/2 h-full"></div>
        </div>
      </div>
    </div>

     
     <div className="px-6 py-4 space-x-6">
       <button className="bg-gradient-to-br from-orange-500 via-rose-400 to-orange-500 p-3 rounded text-white shadow-lg active:scale-80 duration-300">
        <Volume2Icon/>
      </button>
      <button className="bg-gradient-to-br from-orange-500 via-rose-400 to-orange-500 p-3 rounded text-white shadow-lg active:scale-80 duration-300">
       <Maximize/>
      </button>
    </div>
    </div>
   </div>
  </div>
  )

}

export default App