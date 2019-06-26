<template>
    

    <div>
        <div class="ui icon" data-tooltip="Browse all discuss" data-inverted="" data-position="top left"> 
            Discuss 
        </div>
        <div class="ui icon button" data-toggle="modal" data-target="#exampleModalCenter" data-tooltip="Create a discuss" data-inverted="" data-position="top right"> 
            <img :src="require('@/assets/icons/plus-circle.svg')" alt="add icon" class="create__channel">
        </div>

        <div class="ui raised padded discuss__list">
            <ul>
                <li class="discuss__item text-truncate" 
                v-for="discuss in discusses" 
                :key="discuss.id" 
                :class="{ 'is_active': setDiscussActive(discuss) }"
                @click="changeDiscuss(discuss)">
                    <span>#</span> &nbsp; {{ discuss.name }}
                </li>
            </ul>
        </div>


        <!-- Modal for adding discuss channels -->
        <!-- <div class="ui basic modal" id="discussModal">
            <div class="ui icon header">
                Add Discuss
            </div>

            <div class="content">

                <div class="ui inverted form">
                    <div class="field">
                        <label for="new_discuss">New Discuss</label>
                        <input type="text" name="new_discuss" v-model="new_discuss" id="new_discuss">
                    </div>
                </div>

                <div class="ui error message">

                </div>

            </div>

            <div class="actions">
                <div class="ui red basic cancel inverted button">
                    <i class="remove icon"></i>Delete
                </div>
                <div class="ui green ok cancel inverted button">
                    <i class="checkmark icon"></i>Create
                </div>
            </div>

        </div> -->


        <!-- Button trigger modal -->
        <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
        Launch demo modal
        </button> -->

        <!-- Modal -->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-dark" id="exampleModalLongTitle">Add Discuss</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="content">

                        <div class="ui inverted form" :class="{'error': hasErrors}">
                            <div class="field">
                                <label class="text-dark" for="new_discuss" >New Discuss</label>
                                <input class="border border-dark" type="text" name="new_discuss" v-model="new_discuss" id="new_discuss">
                            </div>
                        </div>

                        <div class="ui error message" v-if="hasErrors">
                            <p v-for="error in errors" :key="error">{{ error }}</p>
                        </div>

                    </div>
                </div>
                <div class="modal-footer">
                    <div class="ui red cancel inverted button" data-dismiss="modal">
                        <i class="remove icon"></i>Delete
                    </div>
                    <div class="ui green ok inverted button" @click="addDiscuss" data-dismiss="modal">
                        <i class="checkmark icon"></i>Create
                    </div>
                </div>
                <!-- <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div> -->
                </div>
            </div>
        </div>

    </div>

</template>


<script>

import $ from 'jquery'
import { mapGetters } from 'vuex'

export default {
    name: 'Discuss',
    data () {
        return {
            discusses: [],
            new_discuss: '',
            discussesRef: firebase.database().ref('discusses'),
            errors: [],
            firstLoad: true
        }
    },
    computed: {
        ...mapGetters (['currentChannel']),
        hasErrors () {
            return this.errors.length > 0
        }
    },
    mounted () {
        this.addListeners()
    },
    methods: {
        addListeners () {
            this.discussesRef.on('child_added', snap => {
                this.discusses.push(snap.val())

                if (this.firstLoad && this.discusses.length > 0) {
                    this.$store.dispatch("setCurrentDiscuss", this.discusses[0])
                }

                this.firstLoad = false

            })
        },
        addDiscuss () {
            let key = this.discussesRef.push().key


            let newDiscuss = {id: key, name: this.new_discuss}
            this.discussesRef.child(key).update(newDiscuss).then ( () => {

                this.new_discuss = ''

            }).catch ( error => {
                this.errors.push(error.message)
            })
        },
        changeDiscuss (discuss) {
            this.$store.dispatch('setPrivate', false)
            this.$store.dispatch("setCurrentDiscuss", discuss)
        },
        detachListners () {
            this.discussesRef.off()
        },
        setDiscussActive (discuss) {
            return discuss.id === this.currentChannel.id
        }
    },
    beforeDestroy () {
        this.detachListners()
    }
}
</script>


<style scoped>
.create__channel {
    width: 19px;
}
.ui.button {
    background: transparent;
    float: right;
    position: relative;
    top: -18px;
    padding: 0 .78571429em .78571429em;
}

.ui.button:hover {
    background: transparent;
}

.discuss__list {
    min-height: 100px;
    max-height: 300px !important;
    overflow-y: auto !important;
}

.discuss__list ul {
    padding: 0;
    margin: 0;
}

.discuss__item {
    height: 30px;
    margin-top: 8px;
    list-style-type: none;
    cursor: pointer;
    line-height: 30px;
    font-size: 1.1em;
}

/* .discuss__item:hover {
    background-color:  #362233;
    padding-left: 10px;
} */

.is_active {
    background-color: #3e24fb;
    padding-left: 10px;
}

.ui.inverted.button {
    margin-top: 15px;
    padding: 10px;
}
</style>
