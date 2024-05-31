const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'LIST_SONG'

const player = $('.player')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const playlist = $('.playlist')
const getFile = $('#inputFile')
const uploadMusicBtn = $('.upload-music-btn')
const uploadContainer = $('.header')
const searchSong = $('.header__search-input')
const searchBtn = $('.header__search-btn')
const viewPlaylist = $('.ViewPlaylist')
const backToHome = $('.backToHome')
const deletePlaylist = $('.deletePlaylist')


const firebaseConfig = {
  apiKey: "AIzaSyC4RmHimJ2QKdiIQ_Y_aMYxnwepnT1ZXsM",
  authDomain: "music-baf6c.firebaseapp.com",
  projectId: "music-baf6c",
  storageBucket: "music-baf6c.appspot.com",
  messagingSenderId: "819807425658",
  appId: "1:819807425658:web:a20cdee01771485d4297c3",
  measurementId: "G-6MB8N2J4F8"
};

const app = {
  isPlaying: false,
  currentIndex: 0,
  config: localStorage.getItem(PLAYER_STORAGE_KEY) === '' ? [] : JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)),
  songs: localStorage.getItem(PLAYER_STORAGE_KEY) === '' ? [] : JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)),
  newPlaylist: localStorage.getItem('New_Playlist') === '' ? [] : JSON.parse(localStorage.getItem('New_Playlist')),
  songs: [
    {
      name: "你啊你啊",
      singer: "魏如萱",
      path: "/assets/music/Y2meta.app - 【你啊你啊 ni a ni a】Only you _ 魏如萱 waa wei [lyrics pinyin] แปลไทย (128 kbps).mp3",
      image: "https://y.gtimg.cn/music/photo_new/T002R300x300M000002qn12l0Zlxq5_1.jpg?max_age=2592000"
    },
    {
      name: "王睿卓",
      singer: "Damn５z",
      path: "/assets/music/Y2meta.app - 王睿卓_Damn５z - 重生之我在異鄉為異客「那遠山呼喚我 曾千百次路過 山腰摘幾朵 便飄向歌頌者」【動態歌詞_PinyinLyrics】♪ (128 kbps).mp3",
      image:
        "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
    },
    {
      name: "Lipmark",
      singer: "M NAIVE x LIUGRACE (prod. bySmokele)",
      path: "/assets/music/Y2meta.app - LIPMARK - M NAIVE x LIUGRACE (prod. bySmokele) _ SPEED UP (128 kbps).mp3",
      image:
        "https://i.ytimg.com/vi/lyhxSy6rZQw/mqdefault.jpg"
    },
    {
      name: "Vài lần đón đưa",
      singer: "Soobin Hoàng Sơn",
      path: "/assets/music/Y2meta.app - VÀI LẦN ĐÓN ĐƯA (ORINN X GUANG) - SOOBIN _ NHẠC TRẺ REMIX HOUSE LAK 2023 (128 kbps).mp3",
      image:
        "https://yt3.ggpht.com/DQstrCrz4q6G-zquwTvGRHrsedm9G1TvoPHup_P7QnB1FIbMb4JSpK1fAcHcqrrf8CfGQ4DSkmQ=s88-c-k-c0x00ffffff-no-rj"
    },
    {
      name: "Top Floor",
      singer: "Gunna (feat. Travis Scott)",
      path: "/assets/music/Y2meta.app - Gunna - TOP FLOOR (feat. Travis Scott) [Official Audio] (128 kbps).mp3",
      image: "https://i1.sndcdn.com/artworks-m1UkrNIcbXM0-0-t500x500.jpg"
    },
    {
      name: "Highest in the room",
      singer: "Travis Scott",
      path: "/assets/music/Y2meta.app - Travis Scott - HIGHEST IN THE ROOM (Official Music Video) (128 kbps).mp3",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJszxIIzQ4p6ZdUYRoqw3BCZ0OHimGevIiN9yNQ_fEkw&s"
    },
    {
      name: "Who You Foolin",
      singer: "Gunna",
      path: "/assets/music/Y2meta.app - Gunna - Who You Foolin [Official Audio] (128 kbps).mp3",
      image: "https://i1.sndcdn.com/artworks-000571554101-jr7h9m-t500x500.jpg"
    },
    {
      name: "Tevomxntana",
      singer: "Heaven Sent (Prod.Sønata)",
      path: "/assets/music/Y2meta.app - tevomxntana - Heaven Sent (Prod.Sønata) _OFFICIAL AUDIO_ (128 kbps).mp3",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVGLo3O50sS2ocwaGORBRThZ62PyZa6QfUAgFz3MfkLQ&s"
    },
  ],

  setConfig: function (key, value) {
    this.config[key] = value
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.songs))
    localStorage.setItem('New_Playlist', JSON.stringify(this.newPlaylist))
  },

  render: function (songsToRender = this.songs) {
    const htmls = songsToRender.map((song, index) => {
      return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = "${index}">
                <div class="thumb" style="background-image: url(${song.image})"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                    <div class="options">
                      <button class="deleSong" data-index = "${index}">Delete</button>
                      <button class="addPlaylist" data-index = "${index}">Add playlist</button>
                    </div>
                </div>
            </div>
            `
    })
    playlist.innerHTML = htmls.join('')
  },
  defineProperties: function () {
    Object.defineProperty(this, 'currentSong', {
      get: function () {
        return this.songs[this.currentIndex]
      }
    })
  },
  handleEvent: function () {
    const _this = this
    const cdWidth = cd.offsetWidth

    // Xử lí animation cd khi quay
    const CdAnimate = cdThumb.animate([
      { transform: 'rotate(360deg' }
    ], {
      duration: 10000,
      iterations: Infinity
    })
    CdAnimate.pause()

    // Xử lý phóng to thu nhỏ CD
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const newCdWidth = cdWidth - scrollTop
      cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
      cd.style.opacity = newCdWidth / cdWidth
    }

    // Xử lí khi click play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
    }

    // KHi song được play
    audio.onplay = function () {
      player.classList.add('playing')
      _this.isPlaying = true
      CdAnimate.play()
    }

    // KHi song bị pause
    audio.onpause = function () {
      player.classList.remove('playing')
      _this.isPlaying = false
      CdAnimate.pause()
    }

    // Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = audio.currentTime / audio.duration * 100
        progress.value = progressPercent
      }
    }

    // Xử lí khi tua song
    progress.oninput = function (e) {
      const seekTime = audio.duration / 100 * e.target.value;
      audio.currentTime = seekTime
    }

    // Khi next/prev song
    nextBtn.onclick = function () {
      _this.nextSong()
      audio.play()
    }
    prevBtn.onclick = function () {
      _this.prevSong()
      audio.play()
    }

    // Xử lí khi song end
    audio.onended = function () {
      nextBtn.click()
    }

    // Lắng nghe click vòa playlist
    playlist.onclick = function (e) {
      const songNode = e.target.closest('.song:not(.active)')
      const optionNode = e.target.closest('.option')
      const deleBtn = e.target.closest('.deleSong')
      const addPlaylistBtn = e.target.closest('.addPlaylist')
      const listMusic = []
      if (songNode || optionNode) {
        if (songNode ) {
          _this.currentIndex = Number(songNode.getAttribute('data-index'));
          _this.loadCurrenSong()
          _this.render()
          audio.play()

        }

        // Delete Song
        if (deleBtn) {
          deleSong = Number(deleBtn.getAttribute('data-index'))
          _this.songs.splice(deleSong, 1)
          _this.setConfig('LIST_SONG', _this.songs);
          _this.render();
          _this.loadCurrenSong()
          audio.play()
        }

        if (addPlaylistBtn) {
          const songIndex = Number(addPlaylistBtn.getAttribute('data-index'));
          const storedPlaylist = localStorage.getItem('New_Playlist');
          let listMusic = storedPlaylist ? JSON.parse(storedPlaylist) : [];
    
          if (!listMusic.find(song => song.path === _this.songs[songIndex].path)) {
            listMusic.push(_this.songs[songIndex]);
            localStorage.setItem('New_Playlist', JSON.stringify(listMusic));
            _this.newPlaylist = listMusic;
          }
    
          _this.render();
        }
    }
    }

    // UploadBtn click
    uploadMusicBtn.onclick = function() {
      uploadContainer.classList.toggle('hidden');
    }

    searchSong.oninput = () => {
      const keyword = searchSong.value.trim()
      _this.searchSongs(keyword)
    }

    searchBtn.onclick = () => {
      const keyword = searchSong.value.trim();
      _this.searchSongs(keyword);
    }

    // View playlist
    viewPlaylist.onclick = () =>  {
      _this.render(_this.newPlaylist)
      backToHome.style.display = 'flex'
      viewPlaylist.style.display = 'none'
      deletePlaylist.style.display = 'flex'
    }

    // Back to Home
    backToHome.onclick = () =>  {
      _this.render(_this.songs)
      backToHome.style.display = 'none'
      viewPlaylist.style.display = 'flex'
      deletePlaylist.style.display = 'none'
    }

    deletePlaylist.onclick = () => {
      _this.newPlaylist = []
      localStorage.removeItem('New_Playlist');
      _this.render(_this.newPlaylist);
      backToHome.click();
    }
  },

  // scroll To Active Song
  scrollToActiveSong: function () {
    if (this.currentIndex === 0) {
      setTimeout(() => {
        $('.song.active').scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        })
      }, 300)
    } else {
      setTimeout(() => {
        $('.song.active').scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }, 300)
    }
  },

  // Tải bài hát đầu tiên vào UI khi chạy ứng dụng
  loadCurrenSong: function () {

    heading.textContent = this.currentSong.name
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
    audio.src = this.currentSong.path
  },

  // Load config
  loadConfig: function () {
    Object.assign(this, this.config)
  },

  nextSong: function () {
    this.currentIndex++
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0
    }
    this.loadCurrenSong()
    this.render()
    this.scrollToActiveSong()
  },
  prevSong: function () {
    this.currentIndex--
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1
    }
    this.loadCurrenSong()
    this.render()
    this.scrollToActiveSong()

  },

  upload: function () {
    firebase.initializeApp(firebaseConfig)

    const NameInput = $('.nameNewSong')
    const SingerInput = $('.singerNewSong')

    var fileText = document.querySelector('.fileText')
    var uploadBtn = document.querySelector('.uploadBtn')
    var uploadPercentage = document.querySelector('.uploadPercentage')
    var progresss = document.querySelector('.progresss')
    var percenValue
    var fileItem
    var fileName
    getFile.onchange = function (e) {
      fileItem = e.target.files[0]
    },
      uploadBtn.onclick = () => {
        fileName = fileItem.name;
        let storageRef = firebase.storage().ref("audio/" + fileName)
        let uploadTask = storageRef.put(fileItem)


        uploadTask.on("state_changed", (snapshot) => {
          percenValue = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          uploadPercentage.innerHTML = percenValue + '%'
          progresss.style.width = percenValue + '%'
        }, (error) => {
          console.log('Error is', error);
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            console.log('URL', url);
            const newSong = {
              name: NameInput.value,
              singer: SingerInput.value,
              path: url,
              image: "/assets/img/442456548_1890829208092184_3673498727914727744_n.jpg"
            }
            app.songs.push(newSong)
            app.setConfig('LIST_SONG', app.songs) // Lưu lại danh sách bài hát
            app.render() // Cập nhật giao diện
            NameInput.value = ''
            SingerInput.value=''
          })
        })
      }
      
  },

  //Tìm kiếm bài hát
  searchSongs: function (keyword) {
    const filteredSongs = this.songs.filter(song => song.name.toLowerCase().includes(keyword.toLowerCase()))
      this.render(filteredSongs)
  },
  start: function () {
    this.loadConfig()
    this.handleEvent()
    this.defineProperties()
    this.loadCurrenSong()
    this.upload()
    this.render()
    this.newPlaylist = JSON.parse(localStorage.getItem('New_Playlist')) || [];
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.songs))
    if (localStorage.getItem(PLAYER_STORAGE_KEY)) {
      this.config = JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY))
    }
  }
}
app.start()