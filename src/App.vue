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
        "niconico_api/v2/live/contents/search?q=test&_sort=-userId&targets=title&fields=title"
      )
      .then(response => {
        console.log(response);
      });

    // fetch(
    //   // "https://api.search.nicovideo.jp/api/v2/live/contents/search?targets=title,description,tags,tagsExact,categoryTags&_sort=-startTime&fields=title,description,channelId,commentCounter,userId,categoryTags,contentId,tags,liveStatus,startTime&q=一般(その他) OR ゲーム&filters[liveStatus][0]=past&filters[channelId][0]=2598430"
    //   // "https://api.search.nicovideo.jp/api/v2/live/contents/search?q=test&_sort=-userId&targets=title&fields=title",
    //   "api/live/contents/search?q=live&_sort=-userId&targets=title&fields=title",
    //   {
    //     method: "GET",
    //     headers: {
    //       "User-Agent": "j-stream/1.0"
    //     }
    //   }
    // )
    //   .then(response => {
    //     console.log(response);
    //     return response.json();
    //   })
    //   .then(json => {
    //     // this.niconico_live_link =
    //     // "https://live2.nicovideo.jp/watch/" + json.data[0].contentId;
    //     this.niconico_live = json;
    //   })
    //   .catch(err => {
    //     this.niconico_live = err;
    //   });
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
