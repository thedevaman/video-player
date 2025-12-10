import { Maximize, Pause, Play, Plus, Volume2Icon, VolumeX } from "lucide-react";
import React, { useRef, useState } from "react";

const App = () => {

  const videoRef = useRef(null)
  const [src,setSrc] = useState("/sample.mp4")
  const [playing, setPlaying] = useState(false)
  const [duration,setDuration] = useState("00:00")
  const [currentTime,setCurrentTime] = useState(0)
  const [progress,setProgress] = useState(0)
  const [muted,setMuted] = useState(false)
  const containerRef = useRef(null)
  const divRef = useRef(null)
  const [seeking,setSeeking] = useState(false)


//used for play pause
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

  //used For adding video
  const addVideo = (e)=>{
    const input = e.target
    const file = input.files[0]
   const url = URL.createObjectURL(file)
   setSrc(url)
    mutecontrol()
  }

  //use for on load
  const onloadedmetadata = (e) =>{
    if(src !== "/sample.mp4")
    {
    playPause()
   
      }
       const video = e.currentTarget
    const duration = (video.duration).toFixed(2)
    setDuration(duration)
   
  }

  //used for changing running time of video

  const ontimeupdate = (e)=>{
   if(seeking) return
     const video = e.currentTarget
     const time = (video.currentTime).toFixed(2)
     const p = (time/duration)*100
     setCurrentTime(time)
     setProgress(p)
  }

  const mutecontrol = ()=>{
    const video = videoRef.current
    if(video.muted)
    {
      video.muted = false
      setMuted(false)
  }else{
    video.muted = true
    setMuted(true)
  }
  }

  const togglescreen = ()=>{
    const div = containerRef.current
    if(document.fullscreenElement)
    {
    document.exitFullscreen()
    }else{
    div.requestFullscreen()
    }


  } 

  const forwardVideo = (e)=>{
    setSeeking(true)
    const x = e.clientX
    const y = e.clientY
    const div = divRef.current
    const rec = div.getBoundingClientRect()
    const leftPosition = Math.max(0,Math.round(x - rec.x))
    // setDuration(leftPosition)
   const progressPercentage = ((leftPosition/rec.width)*100).toFixed(2)
   setProgress(progressPercentage)
   const video = videoRef.current
   const video_duration = (video.duration).toFixed(2)
   const clickedDuration = ((progressPercentage/100)*video_duration).toFixed(2)
   video.currentTime = clickedDuration
   setCurrentTime(clickedDuration)
   setSeeking(false)

  }

  return(
  <div className="bg-gray-950 h-screen flex items-center justify-center">
   <div className="w-9/12 relative" ref={containerRef}>
    <video ref={videoRef} src={src} className="w-full" 
      onLoadedMetadata ={onloadedmetadata}
      onTimeUpdate={ontimeupdate}
      />
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
        <label className="font-medium">{(currentTime/60).toFixed(2)}/{(duration/60).toFixed(2)}</label>
        <div ref={divRef} className="bg-white flex-1" onClick={forwardVideo}>
          <div className="bg-gradient-to-br from-orange-500 via-rose-400 to-orange-500 h-full" style={{width:progress+'%'}}></div>
        </div>
      </div>
    </div>

     
     <div className="px-6 py-4 space-x-6">
       <button onClick={mutecontrol} className="bg-gradient-to-br from-orange-500 via-rose-400 to-orange-500 p-3 rounded text-white shadow-lg active:scale-80 duration-300">
       {
        muted?
        <VolumeX/>
        :
        <Volume2Icon/>
       }
      </button>
      <button onClick={togglescreen} className="bg-gradient-to-br from-orange-500 via-rose-400 to-orange-500 p-3 rounded text-white shadow-lg active:scale-80 duration-300">
       <Maximize/>
      </button>
    </div>
    </div>
   </div>
  </div>
  )

}

export default App