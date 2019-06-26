<template>
    

    <div>
        <!-- <div class="header box">Header</div>
        <div class="messages box">
            <ul class="message-list">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div> -->

        <div class="messages__container">
            <div class="messages__content">
                <div class="ui inverted center aligned header" style="color: #000;"># Nous du channel</div>
                <div class="ui segment">
                    <div class="ui comments">
                        <!-- Single messages component -->

                        <!-- <span v-for="message in messages" :key= message> {{ message.content }}</span> -->
                        <transition-group tag="div" name="list">
                            <single-message :message= "message" v-for="message in messages" :key= message.id></single-message>
                        </transition-group>
                    </div>
                </div>


            </div>


            <!--  -->
            <!-- <message-form></message-form> -->

        </div>
    </div>


</template>


<script>


import MessageForm from './MessageForm'
import SingleMessage from './SingleMessage'
import { mapGetters } from 'vuex'

export default {
    name: 'Messages',
    components: {
        MessageForm,
        SingleMessage 
    },
    data () {
        return {
            messagesRef: firebase.database().ref('messages'),
            privateMessagesRef: firebase.database().ref('privateMessages'),
            messages: [],
            discuss: null
        }
    },
    computed: {
        ...mapGetters(['currentChannel', 'currentUser', 'isPrivate'])
    },
    watch: {
        currentChannel () {
            this.messages = []

            this.detachListeners()

            this.addListeners()

            this.discuss = this.currentChannel
        }
    },
    methods: {
        addListeners () {
            let ref = this.getMessageRef()

            ref.child(this.currentChannel.id).on('child_added', snap => {
                let message = snap.val()
                message['id'] = snap.key
                this.messages.push(message)
            })
        },
        detachListeners () {
            if (this.discuss !== null) {
                this.messagesRef.child(this.discuss.id).off('child_added')
            }
        },
        getMessageRef () {
            if (this.isPrivate) {
                return this.privateMessagesRef
            } else {
                return this.messagesRef
            }
        }
    },
    beforeDestroy () {
        this.detachListeners()
    }
}
</script>

<style scoped>
/* .messages__container {
    position: relative;
    background-color: #2e2e2e;
    padding: 10px 30px 210px 30px;
    margin-left: 300px;
    min-height: 100%;
}

.messages__container .comments {
    font-size: 1.2em;
} */

.list-enter-active {
    transition: all 0.3s;
}

.list-enter, .list-leave-active {
    opacity: 0;
    transform: translateY(30px);
}
</style>

