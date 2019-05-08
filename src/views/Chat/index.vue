<template>
  <div class="flex-center-center">
    <!-- <div v-for="(item,ind) in 100" :key="ind">{{$t('header.router.about')}}</div> -->
    <div class="chat-content flex-direction-column">
      <div class="head"></div>
      <div class="body">
        <div class="rooms">rooms</div>
        <div class="chat-view flex-direction-column">
          <div class="chat-top-notice flex-align-center">
            <div class="online-num item">当前在线人数：{{onlineNumber}}</div>
            <div v-show="showJoin" class="user-join item">用户：{{joinUser}} 加入聊天</div>
            <div v-show="showExit" class="user-exit item">用户：{{exitUser}} 退出聊天</div>
          </div>
          <div class="chat-records" ref="chatRecords">
            <div
              class="chat-msg"
              v-for="(item,ind) in chatList"
              :key="ind"
              :class="item.userId == userInfo.userId?'chat-msg-row-reverse':''"
            >
              <div class="user-avatar">
                <img src="../../assets/images/users/none-avatar.jpg" alt>
              </div>
              <div class="msg-box" v-if="item.userId">
                <div class="msg" v-show="item.userId != userInfo.userId">{{item.username}}</div>
                <div class="msg">消息内容:{{item.message}}</div>
              </div>
            </div>
          </div>
          <div class="chat-tool flex-align-center">toolA toolB toolC</div>
          <div class="chat-input">
            <input type="text" v-model="chatContent" @keyup.enter="submitChat">
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
import Storage from "@/utils/storage";
import { setTimeout } from "timers";
let socket;
export default {
  computed: {
    ...mapGetters(["userInfo", "shssToken"])
  },
  data() {
    return {
      // userId: "",
      webSocket: null,
      chatContent: "",
      chatList: [],
      //在线人数
      onlineNumber: 0,
      joinUser: "",
      showJoin: false,
      exitUser: "",
      showExit: false
    };
  },
  mounted() {
    let socketUrl = "ws://47.98.183.208:8080/webSocket/" + this.userInfo.userId;
    this.webSocket = new WebSocket(socketUrl);
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
      console.log(result);
      //userState: 0离开，1进入，2发送消息
      if (result.userState == 0) {
        this.onlineNumber = result.onlineNum;
        this.exitUser = result.username;
        this.showExit = true;
        setTimeout(() => {
          this.showExit = false;
        }, 3000);
      } else if (result.userState == 1) {
        this.onlineNumber = result.onlineNum;
        this.joinUser = result.username;
        this.showJoin = true;
        setTimeout(() => {
          this.showJoin = false;
        }, 3000);
      } else if (result.userState == 2) {
        this.chatList.push(result);
        this.$nextTick(() => {
          this.$refs["chatRecords"].scrollTop = this.$refs[
            "chatRecords"
          ].scrollHeight;
        });
      }
      //非消息数据排除
      // if (result.stateCode != 200) {
      //   // console.log(result.data)
      //   console.log(this.chatList);
      // }
    },
    onError() {
      console.log("error");
    },
    onClose() {
      console.log("close");
    },
    submitChat() {
      if (this.chatContent) {
        let params = {
          toUserId: "",
          contentText: this.chatContent
        };
        this.webSocket.send(JSON.stringify(params));
        this.chatContent = "";
      } else {
        this.$message({
          showClose: true,
          message: "请输入聊天内容",
          type: "warning"
        });
      }
    },
    closeChat() {
      this.webSocket.close();
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
      .chat-top-notice {
        .item {
          color: #fff;
          font-size: 14px;
          margin-left: 10px;
          padding: 2px 4px;
          border-radius: 2px;
          background: $primary-bgColor;
        }
      }
      .chat-records {
        margin-top: 5px;
        height: 380px;
        overflow-y: scroll;
        .chat-msg {
          display: flex;
          font-size: 14px;
          margin-bottom: 10px;
          position: relative;
          .user-avatar {
            width: 30px;
            height: 30px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .msg-box {
            max-width: 370px;
            display: inline-block;
            background: $primary-bgColor;
            padding: 5px;
            color: #fff;
            border-radius: 5px;
            margin: 0 5px;
          }
        }
        .chat-msg-row-reverse {
          flex-direction: row-reverse;
          align-items: center;
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