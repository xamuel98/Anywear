<template>
    

    <div class="teams box">
        <p class="ui inverted center aligned">Teams</p>
        <!-- <connected-user></connected-user>

        <discuss></discuss> -->
    </div>

    <!-- <div class="sidebar">
        <h1 class="ui inverted center aligned header">messageR</h1>
        <connected-user></connected-user>


    </div> -->

</template>


<script>



export default {
    name: 'Sidebar'
}
</script>

<style scoped>
.sidebar {
    position: fixed;
    display: flex;
    flex-flow: column wrap;
    width: 300px;
    padding: 10px;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #795548;  
    padding-top: 110px;
}

.box {
  color: #fff;
  padding: 1em;
  text-align: center;
}

.teams {
  background-color: #362233;
}
</style>

