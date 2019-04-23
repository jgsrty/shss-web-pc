<template>
  <div class="flex-center-center">
    <!-- <div v-for="(item,ind) in 100" :key="ind">{{$t('header.router.about')}}</div> -->
    <div class="chat-content flex-direction-column">
      <div class="head"></div>
      <div class="body">
        <div class="rooms">rooms</div>
        <div class="chat-view flex-direction-column">
          <div class="chat-records">
            <div class="chat-msg" v-for="(item,ind) in chatList" :key="ind">
              <div class="msg-box">
                <div class="msg">消息来自id:{{item.fromUserId}}</div>
                <div class="msg">消息内容:{{item.contentText}}</div>
              </div>
            </div>
          </div>
          <div class="chat-tool flex-align-center">toolA toolB toolC</div>
          <div class="chat-input">
            <input type="text" v-model="chatContent">
            <el-button type="text" @click="submitChat">发送</el-button>
            <el-button type="text" @click="closeChat">断开连接</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
let socket;
export default {
  computed: {
    ...mapGetters(["userInfo", "shssToken", "userState"])
  },
  data() {
    return {
      webSocket: null,
      chatContent: "",
      chatList: []
    };
  },
  mounted() {
    this.webSocket = new WebSocket(
      "ws://47.98.183.208:8080/webSocket/" + this.$route.query.id
    );
    this.initWebsocket();
  },
  methods: {
    initWebsocket() {
      this.webSocket.onerror = this.onError;
      this.webSocket.onopen = this.onOpen;
      this.webSocket.onmessage = this.onMsg;
      this.webSocket.onclose = this.onClose;
    },
    onOpen() {
      console.log("open");
    },
    onMsg(e) {
      console.log("onmessage");
      let result = JSON.parse(e.data);
      if (typeof result.data != "string") {
        // console.log(result.data)
        this.chatList.push(result.data);
      }
    },
    onError() {
      console.log("error");
    },
    onClose() {
      console.log("close");
    },
    submitChat() {
      console.log(this.webSocket)
      this.webSocket.send('fdsa');
      this.chatContent = "";
    },
    closeChat() {
      this.webSocket.close()
    }
  }
};
</script>

<style scoped lang="scss">
.chat-content {
  width: 900px;
  height: 600px;
  margin-top: 100px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.11);
  overflow: hidden;
  .head {
    height: 40px;
    background: $primary-bgColor;
  }
  .body {
    flex: 1;
    display: flex;
    .rooms {
      width: 200px;
      background: #f6f6f6;
      padding: 10px;
    }
    .chat-view {
      flex: 1;
      padding: 5px;
      .chat-records {
        height: 380px;
        .chat-msg {
          font-size: 14px;
          margin-bottom: 10px;
          .msg-box {
            display: inline-block;
            background: #f6f6f6;
            padding: 5px;
            border-radius: 5px;
          }
        }
      }
      .chat-tool {
        height: 28px;
        margin: 5px 0 5px 0;
        border-top: 1px solid #efefef;
        border-bottom: 1px solid #efefef;
      }
      .chat-input {
        flex: 1;
      }
    }
  }
}
</style>