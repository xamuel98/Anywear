<template>
  <div class="channels box">
    <p class="ui inverted center aligned">Anywear</p>
    <connected-user></connected-user>

    <discuss></discuss>

    <div class="ui dividers"></div>
    <users></users>
  </div>
</template>


<script>
import ConnectedUser from "./ConnectedUser";
import Discuss from "./Discuss";
import Users from "./Users";

export default {
  name: "Channels",
  components: { ConnectedUser, Discuss, Users }
};
</script>


<style scoped>
.box {
  color: #fff;
  padding: 1em;
  text-align: left;
}

.channels {
  background-color: #52364e;
}
</style>
