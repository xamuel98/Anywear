<template>
  <div class="app-layout">
    <sidebar></sidebar>

    <channels></channels>

    <messages></messages>

    <!-- <message-form></message-form> -->
  </div>
</template>


<script>
import Sidebar from "../components/sidebar/Sidebar";
import Messages from "../components/messages/Messages";
import Channels from "../components/sidebar/Channels";
import MessageForm from "../components/messages/MessageForm";
export default {
  name: "MessageR",
  components: { Sidebar, Messages, Channels, MessageForm },
  data() {
    return {
      messagesRef: firebase.database().ref("messages")
    };
  }
};
</script>


<style>
.box {
  color: #fff;
  padding: 1em;
  text-align: left;
}

input {
  width: 100%;
  padding: 1em;
  outline: none;
  border: 1px solid #f2f2f2;
}

.message-list {
  margin: 0;
  padding: 0;
}

.message-list li {
  padding: 0.2em;
  margin-top: 1em;
  margin-bottom: 1em;
  background-color: #f2f2f2;
}

.header {
  background-color: #ffffff;
}

.teams {
  background-color: #362233;
}

.channels {
  background-color: #52364e;
}

.messages {
  background-color: #ffffff;
}

.write {
  background-color: #f2f2f2;
}

/* Grid Layout Code */

.app-layout {
  display: grid;
  height: 100vh;
  grid-template-columns: 100px 250px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: "teams channels header" "teams channels messages" "teams channels input";
}

.teams {
  grid-area: teams;
}

.channels {
  grid-area: channels;
}

.header {
  grid-area: header;
  color: #333;
  border-bottom: 1px solid #f2f2f2;
}

.messages {
  grid-area: messages;
  padding: 0 1em;
  overflow-y: scroll;
}

.input {
  grid-area: input;
}

.left {
  border-bottom-right-radius: 0 !important;
  border-top-right-radius: 0 !important;
  position: relative;
  left: -0.1px;
  right: 0;
}

.border-t-b-f__radius {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
