<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />

    <a v-bind:href="twitch_live_link">twitch live link</a>
    {{twitch_live}}
    <br />
    <a v-bind:href="niconico_live_link">niconico live link</a>
    {{niconico_live}}
    <br />
    <a v-bind:href="youtube_live_link">youtube live link</a>
    {{youtube_live}}
    <br />
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
    console.log(process.env.VUE_APP_ENV);
    if (process.env.VUE_APP_ENV == "production") {
      return {
        youtube_live_link:
          "https://www.youtube.com/channel/UCx1nAvtVDIsaGmCMSe8ofsQ",
        youtube_live: "none",
        youtube_channel_id: "UCx1nAvtVDIsaGmCMSe8ofsQ",
        niconico_live_link: "https://live.nicovideo.jp/",
        niconico_live: "none",
        niconico_channel_id: "",
        twitch_live_link: "https://www.twitch.tv/kato_junichi0817",
        twitch_live: "none",
        twitch_user_id: "545050196"
      };
    }
    return {
      youtube_live_link:
        "https://www.youtube.com/channel/UCx1nAvtVDIsaGmCMSe8ofsQ",
      youtube_live: "none",
      youtube_channel_id: "UCj8BadK_leFelzdbEZnKRZg",
      niconico_base_url: "https://api.search.nicovideo.jp",
      niconico_live_link: "https://live.nicovideo.jp/",
      niconico_live: "none",
      niconico_channel_id: "",
      twitch_live_link: "https://www.twitch.tv/kato_junichi0817",
      twitch_live: "none",
      twitch_user_id: "545050196"
    };
  },
  created() {
    axios
      .get(
        "https://api.twitch.tv/helix/streams?user_id=" + this.twitch_user_id,
        {
          headers: {
            Authorization: "Bearer " + process.env.VUE_APP_TWITCH_AUTH_TOKEN,
            "Client-ID": process.env.VUE_APP_TWITCH_CLIENT_ID
          }
        }
      )
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .then(json => {
        this.twitch_live = json.data[0].type;
      })
      .catch(err => {
        console.log(err);
      });

    if (process.env.VUE_APP_ENV == "local") {
      this.niconico_base_url = "/niconico_api";
    }
    axios
      .get(
        this.niconico_base_url +
          "/api/v2/live/contents/search?" +
          "targets=title,description,tags,tagsExact,categoryTags&" +
          "_sort=-startTime&" +
          "fields=title,description,channelId,commentCounter,userId,categoryTags,contentId,tags,liveStatus,startTime&" +
          "q=一般(その他) OR ゲーム&" +
          "filters[liveStatus][0]=onair&" +
          "filters[channelId][0]=2598430"
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
        console.log(err);
      });

    axios
      .get(
        "https://www.googleapis.com/youtube/v3/search?" +
          "part=snippet&" +
          "eventType=live&" +
          "type=video&" +
          "fields=items(snippet/liveBroadcastContent,id/videoId)&" +
          "channelId=" +
          this.youtube_channel_id +
          "&key=" +
          process.env.VUE_APP_YOUTUBE_API_KEY
      )
      .then(response => {
        console.log(response);
        console.log(response.data);
        return response.data;
      })
      .then(json => {
        this.youtube_live = json.items[0].snippet.liveBroadcastContent;
        this.youtube_live_link =
          "https://www.youtube.com/watch?v=" + json.items[0].id.videoId;
      })
      .catch(err => {
        console.log(err);
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
