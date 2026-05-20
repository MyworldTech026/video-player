const uploadVideo = document.querySelector('.js-file-input')
const playlistContainer = document.querySelector('.js-playlist')
const videoView = document.querySelector('.js-video')
const playlistCount = document.querySelector('.js-playlist-count')
const prev = document.querySelector('.js-prev-btn')
const next = document.querySelector('.js-next-btn')
const titles = document.querySelector('.js-now-playing-title')
const playBtn = document.querySelector('.js-play-btn')
const nowPlaying = document.querySelector('.js-now-playing')
const volumeAdjuster = document.querySelector('.js-volume ')
const muteBtn = document.querySelector('.js-mute-btn')
const speedAdjuster = document.querySelector('.js-speed')
const progressFill = document.querySelector('.js-progress-fill')
const progressThumb = document.querySelector('.js-progress-thumb')
const currentTime = document.querySelector('.js-current-time ')
const duration = document.querySelector('.js-duration')
const progressBar = document.querySelector('.js-progress-bar')
const overlaypause = document.querySelector('.js-play-overlay ')
const fullScreenbtn = document.querySelector('.js-fullscreen-btn')
const videoWrap = document.querySelector('.js-video-wrap ')
const unsupportedAlert = document.querySelector('.js-error-card ')
const removeunsupportedAlert = document.querySelector('.js-error-close')
const ifNoUploadedVideoYet=document.querySelector('.js-playlist-empty')
const deleteVideoBtn=document.querySelectorAll('.js-delete-video')
let count=0

//preset video, note it need network to be able to play
let videoplayList = [
  {
    title: 'Big Buck Bunny',
    src: 'https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4',
    thumb: ''
  },
  {
    title: 'Sample Video',
    src: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    thumb: ''
  },
  {
    title: 'Bunny Trailer',
    src: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
    thumb: ''
  }

]



// control uploading video
uploadVideo.addEventListener('change', () => {
  const file = uploadVideo.files[0]
  const url = URL.createObjectURL(file)

  videoplayList.push({ title: file.name, src: url, thumb: '' })
  console.log(videoplayList)
  renderPlayList()
  if (videoplayList.length === 1) {
    const urls = videoplayList[0].src
    const videoTitle = videoplayList[0].title
    showVideo(urls, videoTitle)
  }

})

//render/display the uploaded videos to playlist
function renderPlayList() {
  playlistCount.textContent = `${videoplayList.length}  videos`
  let playlist = ''
  videoplayList.forEach((video, index) => {
    playlist += `
  
  <div class="playlist-item" data-url="${video.src}" data-title="${video.title}" data-id="${index}">
  <div class="playlist-item-number">${index + 1}</div>
  <img class="playlist-item-thumb" src="${video.thumb}" alt="image" />
  <div class="playlist-item-info">
    <div class="playlist-item-title" data-title="${video.title}">${video.title}</div>
    <div class="playlist-item-duration">0:00</div>
  </div>
  <div class="playing-indicator">
    <span></span><span></span><span></span><span></span>
  </div>
</div>
  `
  })

  playlistContainer.innerHTML = playlist
  if(videoplayList.length===3){
     ifNoUploadedVideoYet.classList.remove('hidden')
     return
  }
  ifNoUploadedVideoYet.classList.add('hidden')
}
renderPlayList()



// trigger if a video is selected ,then the video plays
playlistContainer.addEventListener('click', (e) => {
  const eachvideoCard = e.target.closest('.playlist-item')
  if(!eachvideoCard)return
  const attachAtributes = eachvideoCard.dataset.index
 
  const videourl = eachvideoCard.dataset.url
  const videoTitle = eachvideoCard.dataset.title
  const index = Number(eachvideoCard.dataset.id)
  count = index
  showVideo(videourl, videoTitle)
})


//play the first video by default
function playFirstVideo() {
  if (videoplayList.length === 0) return
  const video = videoplayList[0]
  const url = video.src
  const videoTitle = video.title
  showVideo(url, videoTitle)
}
playFirstVideo()



// show video on the screen
function showVideo(url, videoTitle) {
  nowPlaying.classList.remove('hidden')
  titles.textContent = videoTitle
  videoView.src = url

  //  videoView.oncanplay=null

  // videoView.load()

  // videoView.oncanplay=()=>{
  //   videoView.play()
  //    videoView.oncanplay=null
  // }

  videoView.addEventListener('canplay', () => {
    // trigger if video is not supported
    if (videoView.videoWidth === 0 || videoView.videoHeight === 0) {
      unsupportedAlert.classList.remove('hidden')
      videoplayList.pop()
      renderPlayList()
      nowPlaying.textContent = `NOT PLAYING`
      return
    }
    nowPlaying.textContent = `NOW PLAYING`
    videoView.play()
  }, { once: true })

}

//control next video
next.addEventListener('click', () => {
  if (count >= videoplayList.length - 1) {
    return
  }
  count++
  const video = videoplayList[count]
  const url = video.src
  const movieName = video.title
  showVideo(url, movieName)
})

//control prev video
prev.addEventListener('click', () => {
  if (count === 0) {
    return
  }
  count--
  const video = videoplayList[count]
  const url = video.src
  const movieName = video.title
  showVideo(url, movieName)
})

// pause and play 
let pause_play = false
playBtn.addEventListener('click', () => {
  if (!pause_play) {
    nowPlaying.textContent = `PAUSE`
    videoView.pause()
    overlaypause.classList.remove('hidden')
    pause_play = videoView.paused
  } else {
    nowPlaying.textContent = `NOW PLAYING`
    overlaypause.classList.add('hidden')
    videoView.play()
    pause_play = false
  }
})


// volume
volumeAdjuster.addEventListener('change', () => {
  const vol = volumeAdjuster.value
  videoView.volume = vol
})

//mute sound
muteBtn.addEventListener('click', () => {
  if (videoView.muted) {
    videoView.muted = false
    volumeAdjuster.value = 1
  } else {
    videoView.muted = true
    volumeAdjuster.value = 0
  }
})

//speed adjuster
speedAdjuster.addEventListener('change', () => {
  let speed = speedAdjuster.value
  videoView.playbackRate = speed

})

// shows slider i.e progress bar
videoView.addEventListener('timeupdate', () => {
  const percentage = (videoView.currentTime / videoView.duration) * 100
  progressFill.style.width = `${percentage}%`
  progressThumb.style.left = `${percentage}%`
})


// shows currentvideo time and also allow for video loop
videoView.addEventListener('timeupdate', () => {
  const currenttime = formatTime(videoView.currentTime)
  const duration = formatTime(videoView.duration)
  currentTime.textContent = currenttime

  if (currenttime === duration) {
    count = count + 1
    if(count===videoplayList.length){
      count=0
    }
    const video = videoplayList[count]
    const url = video.src
    const videoTitle = video.title
    
    showVideo(url, videoTitle)
  }
})

// shows video duration
videoView.addEventListener('timeupdate', () => {
  duration.textContent = formatTime(videoView.duration)
})

function formatTime(seconds) {
  const min = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${min}:${secs < 10 ? '0' : ''}${secs}`
}


// allows for seeking
progressBar.addEventListener('click', (e) => {
  const rect = progressBar.getBoundingClientRect()
  const clickX = e.clientX - rect.left
  const percentage = clickX / rect.width
  videoView.currentTime = percentage * videoView.duration
})

// control full screen toggle
fullScreenbtn.addEventListener('click', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen
  } else {
    videoView.requestFullscreen()
  }
})

// removeunsupportedAlert
removeunsupportedAlert.addEventListener('click', () => {
  unsupportedAlert.classList.add('hidden')
})

//  deleteVideoBtn.forEach((button)=>{
//   button.addEventListener('click',(e)=>{
//     const card=e.target.closest('.remove-video')
//     if(!card)return
//     const deleteId=Number(card.dataset.deleteId)
//     videoplayList.splice(deleteId,1)
//     renderPlayList()
//   })
//  })



//  addEventListener('click',(e)=>{
//   const card=e.target.closest('.remove-video')
//   if(!card)return 
//   const deleteId=Number(card.dataset.deleteId)
//   videoplayList.splice(deleteId,1)
//     count=count-1
//   renderPlayList()

//   console.log(videoplayList)
// })
 