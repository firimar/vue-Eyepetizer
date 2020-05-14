import Vue from 'vue'
import Vuex from 'vuex'
import * as func from './function'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    videoSrc: '',
    videoId: null,
    videoTitle: '',
    videoCover: '',
    closed: false,
    loading: false,
    feedfollow: [],
    follow: [], //本地关注
    input: '', //搜索栏
    num: 0,  //用于whatch搜索
    bgSrc: '',
    collect: [],
    volumeValue: '',//音量
  },
  mutations: {
    getLocalStorage(state) {
      state.follow = func.localFollow.get() || []
      state.bgSrc = func.localBgSrc.get() || ''
      state.volumeValue = func.localVolume.get() || ''
      state.collect = func.localCollect.get() || []
    },
    setNum(state) {
      state.num++
    },
    setCollect(state, res) {
      let id = res.id
      let is = true
      state.collect.forEach(el => {
        if (el.id == id) {
          is = false
        }
      })
      if (is) {
        state.collect.push(res)
      }
      func.localCollect.set(state.collect)
    },
    removeCollect(state, id) {
      state.collect = state.collect.filter(el => {
        return el.id !== id
      })
      func.localCollect.set(state.collect)
    },
    setBgSrc(state, res) {
      state.bgSrc = res
      func.localBgSrc.set(state.bgSrc)
    },
    setVolumeValue(state, res) {
      state.volumeValue = res
      func.localVolume.set(state.volumeValue)
    },
    setInput(state, res) {
      state.input = res
    },
    setTap(state, res) {
      state.closed = res
    },
    setVideoInfo(state, res) {
      state.videoId = res.id
      state.videoTitle = res.title
      state.videoSrc = res.src
      state.videoCover = res.cover
    },
    setVideoSrc(state, res) {
      state.videoSrc = res
    },
    setLoading(state, res) {
      state.loading = res
    },
    getFeedFollowed(state, res) {
      state.feedfollow.push(res)
    },
    setFeedFollowed(state, res) {
      state.feedfollow.forEach(item => {
        if (item.itemId == res.itemId) {
          item.followed = !res.followed
        }
      })
    },
    setFollowed(state, res) {
      state.follow.push(res)
      func.localFollow.set(state.follow)
    },
    removeFollowed(state, id) {
      state.follow = state.follow.filter(item => {
        return item.itemId != id
      })
      func.localFollow.set(state.follow)
    },
  },
  getters: {
    badge: state => {
      return state.follow.filter(item => item.followed).length
    }
  },
})
export default store