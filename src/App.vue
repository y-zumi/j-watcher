<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <a v-bind:href="youtube_live_link">youtube live link</a>
    {{youtube_live}}
    <br />
    <a v-bind:href="niconico_live_link">niconico live link</a>
    {{niconico_live}}
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data() {
    return {
      youtube_live_link: "",
      youtube_live: "",
      niconico_live_link: "",
      niconico_live: ""
    };
  },
  created() {
    axios
      .get(
        "/niconico_api/api/live/contents/search?q=live&_sort=-userId&targets=title&fields=title"
      )
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .then(json => {
        this.niconico_live_link =
          "https://live2.nicovideo.jp/watch/" + json.data[0].contentId;
      })
      .catch(err => {
        this.niconico_live = err;
      });

    axios
      .get(
        "/youtube_api/youtube/v3/search?part=snippet&eventType=live&type=video&channelId=UCj8BadK_leFelzdbEZnKRZg&key=" +
          process.env.VUE_APP_YOUTUBE_API_KEY
      )
      .then(response => {
        console.log(response);
        console.log(response.data);
        return response.data;
      })
      .then(json => {
        this.youtube_live_link =
          "https://www.youtube.com/watch?v=" + json.items[0].id.videoId;
      })
      .catch(err => {
        this.youtube_live = err;
      });
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
