<template>
    
    <div class="ui container">
        <div class="ui middle aligned center aligned grid login__container">
            <div class="column">
                <h2 class=" ui teal image header">
                    <img src="https://semantic-ui.com/examples/assets/images/logo.png" class="image">
                    <div class="content">
                        Sign Up for an account
                    </div>
                </h2>
                <form class="ui large form" :class="{ 'error' : hasErrors }">
                    <div class="ui stacked segment">

                        <div class="field">
                            <div class="ui left icon input">
                                <i class="user icon"></i>
                                <input type="text" name="username" placeholder="Username" v-model.trim="username" required>
                            </div>
                        </div>


                        <div class="field">
                            <div class="ui left icon input">
                                <i class="envelope icon"></i>
                                <input type="email" name="Email" placeholder="Email" v-model.trim="email" required>
                            </div>
                        </div>
                        


                        <div class="field">
                            <div class="ui left icon input">
                                <i class="lock icon"></i>
                                <input type="password" name="Password" placeholder="Password" v-model="password" required>
                            </div>
                        </div>


                        <div class="field">
                            <div class="ui left icon input">
                                <i class="lock icon"></i>
                                <input type="password" name="password_confirmation" placeholder="Confirm Password" v-model="password_confirmation" required>
                            </div>
                        </div>


                        <div class="ui fluid large teal button" @click.prevent="register" :class="{ 'loading' : isLoading }">Register</div>
                    </div>

                    <div class="ui error message" v-if="hasErrors">
                        <p v-for="error in errors" :key="error">{{ error }}</p>
                    </div>

                </form>

                <div class="ui message">
                    Already have an account? <router-link to="/login">Sign In</router-link>
                </div>
            </div>
        </div>
    </div>
    

</template>


<script>

import md5 from 'md5'


export default {
    name: 'Register',
    data () {
        return {
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: [],
            usersRef: firebase.database().ref('users'),
            isLoading: false
        }
    },
    computed: {
        hasErrors () {
            return this.errors.length > 0
        }
    },
    methods: {
        register () {
            console.log("Register")
            this.errors = []

            if (this.isFormValid()) {
                this.isLoading = true
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then( user => {
                console.log("This is the user email " + this.email)


                var user = firebase.auth().currentUser
                user.updateProfile({
                    displayName: this.username,
                    photoURL: "https://www.gravatar.com/avatar/"+md5(this.email)+"?d=identicon"
                }).then( () => {

                    //
                    this.saveUserToUsersRef(user).then( () => {
                        this.$store.dispatch("setUser", user)
                        this.$router.push('/chatrooms/work')
                    })

                }, error => {
                    console.log(error)
                    this.errors.push(error.message)
                    this.isLoading = false
                })


                }).catch( error => {
                    console.log(error)
                    this.errors.push(error.message)
                    this.isLoading = false
                })
            }
        },
        saveUserToUsersRef (user) {
            return this.usersRef.child(user.uid).set({
                username: user.displayName,
                avatar: user.photoURL
            })
        },
        isEmpty () {
            if (this.username.length == 0 || this.email.length == 0 || this.password.length == 0 || this.password.password_confirmation == 0) {
                return true
            }
            return false
        },
        passwordValid () {
            if (this.password.length < 6 || this.password_confirmation < 6) {
                return false
            }
            if (this.password !== this.password_confirmation) {
                return false
            }
            return true
        },
        isFormValid () {
            if (this.isEmpty()) {
                this.errors.push("Fill Form to Register")
                return false
            }
            if (!this.passwordValid()) {
                this.errors.push("Passwords Incorrect")
                return false
            }
            return true
        }
    }
}
</script>


<style scoped>
.login__container {
    margin-top: 40px;
}

.column {
    max-width: 450px;
}
</style>
