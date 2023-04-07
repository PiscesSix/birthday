const typedText = document.querySelector(".typed-text");
const cursor = document.querySelector(".cursor");

// Song -----------------------------------------

const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const startBtn = document.getElementById('click');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
const songs = ['hey', 'summer'];

// Keep track of song
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	// currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	// durTime.innerHTML = min_d +':'+ sec_d;
		
};

// Event listeners

startBtn.addEventListener('click', () => {
    playSong();
    console.log("OK")
})

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate',DurTime);

//  -----------------------------------------------
const textArray = [
	"Hé luuu cậu...",
	"Chúc cậu có mụt sinh nhựt thật duiii dẻ. Tớ bíc cậu là người si nghĩ nhìuu, nmà khom sao, tớ thik là được.",
    "Cậu cũng mang lại cho tớ cả niềm duii và nỗi buồn, tớ lại thấy rất duiii vì có người luôn lắng nghee và hiểu tớ.",
	"Chúc cậu tuổi mới luôn hạnh phúc, vuiii vẻ, làm mọi việc như ý, kiếm được nhìu tiền và bao tớ ăn thật nhìu, cùng đi chơi những chỗ thân quen mà mình hay đi.",
	"Tớ khum bíc sao, tính tớ thik khám phá, phiêu du những điều mới mẻ, nhưng mà ở Sì Gòn này, tớ hi vọng mình sẽ đến những nơi thân quen, thân đến nỗi vào ngày chủ nhật, pà chủ quán sẽ bíc có tớ với cậu đến.",
    "Tớ cũng hi vọng cậu và tớ đồng hành cùng nhau thật lâu.",
    "Vì... Tớ từng hỏi cậu, mãi mãi là bao lâu,",
    "Cậu từng nói ...",
	"Ở Sì Gòn này có con đường Vĩnh Viễn.",
    "Chúc cậu tất cả nhé.",
];


let textIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textIndex].length) {
        typedText.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        var process1 = setTimeout(type, 100);
        cursor.style.opacity = 0;
    } else {
        var process1 = setTimeout(erase, 2000);
    }
}
  
function erase() {
    typedText.textContent = "";
    textIndex++;
    if (textIndex >= textArray.length) {
      textIndex = 0;
    }
    charIndex = 0;
    setTimeout(type, 500);
}
  
setInterval(() => {
    cursor.style.opacity = (cursor.style.opacity == 0 ? 1 : 0);
}, 700);
  
const button = document.getElementById('click');
button.addEventListener('click', function() {
    button.disabled = true;
    button.style.display = 'none';
    textIndex = 0;
    charIndex = 0;
    typedText.textContent = '';
    type();
});