<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <a v-bind:href="live_link">live link</a>
    {{youtube_live}}
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data() {
    return {
      live_link: "",
      youtube_live: ""
    };
  },
  created() {
    fetch(
      // "https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&channelId=UCj8BadK_leFelzdbEZnKRZg&key="
      "https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&channelId=UCJubINhCcFXlsBwnHp0wl_g&key="
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.live_link =
          "https://www.youtube.com/watch?v=" + json.items[0].id.videoId;
        this.youtube_live = JSON.stringify(
          json.items[0].snippet.liveBroadcastContent
        );
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
