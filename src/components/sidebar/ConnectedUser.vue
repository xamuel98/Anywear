<template>
    
    <div class="connectedUser__container">
    
        <div class="ui items">
            <div class="item">
                <div class="ui mini image">
                    <img :src="currentUser.photoURL" alt="profile image">
                </div>

                <div class="middle aligned content">
                    <div class="ui container">
                        <div class="ui inverted username">
                            {{ currentUser.displayName }}
                        </div>
                    </div>
                </div>

                <!-- <div class="extra">
                    <button class="ui circular icon right floated button" @click="logout">
                        <i class="icon sign-out"></i>
                    </button>
                </div> -->
            </div>
        </div>
    
    </div>


</template>


<script>

import { mapGetters } from 'vuex'

export default {
    name: 'connected-user',
    data () {
        return {
            presenceRef: firebase.database().ref('presence')
        }
    },
    computed: {
        ...mapGetters(['currentUser'])
    },
    methods: {
        logout () {
            this.presenceRef.child(this.currentUser.uid).remove()
            firebase.auth().signOut()
            this.$store.dispatch("setUser", null)
            this.$router.push('/login')
        }
    }
}
</script>


<style scoped>
.connectedUser__container {
    position: relative;
    top: 81%;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 8px;
}

.username {
    font-family: Quicksand, sans-serif; 
    font-weight: 500px; 
    font-size: 16px;
    text-align: left;
    color: #fff;
}
</style>
