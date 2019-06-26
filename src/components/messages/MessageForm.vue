<template>
    

    <div class="ui left fluid action input box">

        <!-- <div class="ui left icon button">
            <i class="cloud upload icon"></i>
        </div> -->

        <!-- <div class="ui right pointing dropdown icon button">
            <i class="settings icon"></i>
        </div> -->

        <!-- Default dropleft button -->
        <div class="dropdown">
            <button class="btn btn-secondary " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img :src="require('@/assets/icons/plus.svg')" alt="">
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="transform: translate3d(0px, -183px, 0px);">
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <file-upload></file-upload>
            </div>
        </div>

        <input type="text" class="border-t-b-f__radius" @keyup.enter="sendMessage" v-model.trim="message" placeholder="Type Message Here...">
        <div class="ui button" @click.prevent="sendMessage">Send</div>

    </div>


</template>


<script>

import { mapGetters } from 'vuex'
import FileUpload from './FileUpload'

export default {
    name: 'message-form',
    components: { FileUpload },
    data () {
        return {
            message: '',
            errors: []
        }
    },
    computed: {
        ...mapGetters(['currentChannel', 'currentUser'])
    },
    methods: {
        sendMessage () {
            
            
            if (this.currentChannel !== null) {

                if (this.message.length > 0) {

                    this.$parent.getMessageRef().child(this.currentChannel.id).push().set(this.createMessage()).then ( () => {

                    }).catch ( error => {
                        this.errors.push(error.message)
                    })

                    this.message = ""

                }
                 
            }

        },
        createMessage () {

            return {
                content: this.message,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: {
                    username: this.currentUser.displayName,
                    avatar: this.currentUser.photoURL,
                    id: this.currentUser.uid
                }
            }

        }
        // uploadFile (file, metadata) {
        //     console.log('upload')
        //     if (file === null) return false

        //     let pathToUpload = this.currentChannel.id
        // }
    }
}
</script>


<style scoped>
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

.btn-secondary {
    color: #fff;
    background-color: transparent;
    border-color: transparent;
}

.btn-secondary:not(:disabled):not(.disabled):active {
    background: transparent;
}

.btn-secondary:focus, .btn-focus {
    outline: none;
    box-shadow: none;
}

.btn-secondary:hover {
    background: transparent;
}

.dropdown-item {
    cursor: pointer;
    padding: 15px 25px;
}
</style>
