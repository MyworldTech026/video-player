# Video Player App

A custom video player built with HTML, CSS, and JavaScript that allows users to watch preset videos and upload their own personal videos directly from their device. The application starts with a default video that automatically plays when the user enters the website. Users can upload additional videos without interrupting the currently playing video. Newly uploaded videos are added to the playlist queue and wait for their turn.

Features include automatic playback of the first video, continuous playlist looping, play and pause controls, previous and next navigation, progress tracking, volume control, fullscreen mode, manual video selection, and local device upload support.

Playback works in a queue system. The first video starts automatically when the application loads. If another video is uploaded while the current video is still playing, the new video does not interrupt playback. Once the current video ends, the next video starts automatically. When all videos finish playing, the player returns to the first video and continues the cycle indefinitely.

Example playback order:

Video 1 → Video 2 → Video 1 → Video 2 → ...

Users can manually switch videos at any time by selecting another video from the playlist.

Uploaded videos only exist during the current session. Refreshing the page removes all uploaded videos because no backend database or permanent storage system is used. Videos are uploaded only from the user’s local device and currently cannot be removed after upload. Video removal is planned as a future improvement.

Technologies used in this project:

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- HTML Video API

Project structure:

project-folder/
│── index.html
│── style.css
│── script.js
│── videos/
│ └── default-video.mp4
│── README.md

Future improvements planned:

- Remove uploaded videos
- Search functionality
- Drag and drop upload
- Video thumbnails
- Watch history
- Local storage support
- Dark mode


