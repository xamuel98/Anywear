<template>
  <div class="users__container">
    <div class="ui inverted aligned center">
      <div class="mt-5 mb-4">Users</div>

      <div
        class="ui middle aligned animated list"
        v-for="user in users"
        :key="user.uid"
        :class="{'is_active': isActive(user)}"
        @click.prevent="changeChannel(user)"
      >
        <div class="item">
          <img class="ui avatar image" :src="user.avatar" alt="avatar">
          <span id="hardcoded-badge" :class="{ 'olive': isOnline(user), 'red': !isOnline(user) }"></span>
          <div class="content">
            <!-- <span class="ui empty circular label connection__label" :class="{ 'olive': isOnline(user), 'red': !isOnline(user) }"></span> -->
            <div class="username">{{ user.username }}</div>
          </div>
        </div>
      </div>

      <!-- <div class="ui feed" v-for="user in users" :key="user.uid">
                <div class="event">
                    <div class="label">
                        <img :src="user.avatar" alt="avatar">
                    </div>

                    <div class="content">
                        <span class="ui empty circular label connection__label" :class="{ 'olive': isOnline(user), 'red': !isOnline(user) }"></span>
                        {{ user.username }}
                    </div>
                </div>
      </div>-->
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "users",
  data() {
    return {
      users: [],
      usersRef: firebase.database().ref("users"),
      connectedRef: firebase.database().ref(".info/connected"),
      presenceRef: firebase.database().ref("presence")
    };
  },
  computed: {
    ...mapGetters(["currentUser", "currentChannel"])
  },
  mounted() {
    this.addListeners();
  },
  methods: {
    addListeners() {
      this.usersRef.on("child_added", snap => {
        if (this.currentUser.uid !== snap.key) {
          let user = snap.val();
          user["uid"] = snap.key;
          user["status"] = "offline";
          this.users.push(user);
        }
      });

      this.presenceRef.on("child_added", snap => {
        if (this.currentUser.uid !== snap.key) {
          this.addStatusToUser(snap.key);
        }
      });

      this.presenceRef.on("child_removed", snap => {
        if (this.currentUser.uid !== snap.key) {
          this.addStatusToUser(snap.key, false);
        }
      });

      this.connectedRef.on("value", snap => {
        if (snap.val() === true) {
          let ref = this.presenceRef.child(this.currentUser.uid);
          ref.set(true);
          ref.onDisconnect().remove(err => {
            if (err !== null) console.log(err);
          });
        }
      });
    },
    addStatusToUser(userId, connected = true) {
      let index = this.users.findIndex(user => user.uid === userId);
      if (index !== -1) {
        connected === true
          ? (this.users[index].status = "online")
          : (this.users[index].status = "offline");
      }
    },
    isOnline(user) {
      return user.status == "online";
    },
    changeChannel(user) {
      let channelId = this.getChannelId(user.uid);
      let discuss = { id: channelId, username: user.username };

      this.$store.dispatch("setPrivate", true);
      this.$store.dispatch("setCurrentDiscuss", discuss);
    },
    isActive(user) {
      let channelId = this.getChannelId(user.uid);
      return this.currentChannel.id === channelId;
    },
    getChannelId(userId) {
      return userId < this.currentUser.uid
        ? userId + "/" + this.currentUser.uid
        : this.currentUser.uid + "/" + userId;
    },
    detachListeners() {
      this.usersRef.off();
      this.presenceRef.off();
      this.connectedRef.off();
    }
  },
  beforeDestroy() {
    this.detachListeners();
  }
};
</script>

<style scoped>
#hardcoded-badge {
  position: relative;
}

.username {
  position: relative;
  left: 20%;
  top: -22px;
}

.olive::after {
  content: "";
  position: absolute;
  top: 15px;
  right: -2px;
  font-size: 11px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 600;
  text-align: center;
  line-height: 23px;
  /* background: #ff4081;
    color: white; */
  width: 10px;
  height: 10px;
  border-radius: 50%;
  /* box-shadow: 1px 2px 5px #888; */
  background: olive;
}

.red::after {
  content: "";
  position: absolute;
  top: 15px;
  right: -2px;
  font-size: 11px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 600;
  text-align: center;
  line-height: 23px;
  /* background: #ff4081;
    color: white; */
  width: 10px;
  height: 10px;
  border-radius: 50%;
  /* box-shadow: 1px 2px 5px #888; */
  background: red;
}
</style>
