<template>
    
    
    <div class="ui container">
        <div class="ui middle aligned center aligned grid login__container">
            <div class="column">
                <h2 class=" ui teal image header">
                    <img src="https://semantic-ui.com/examples/assets/images/logo.png" class="image">
                    <div class="content">
                        Sign In to your account
                    </div>
                </h2>
                <form class="ui large form" :class="{ 'error' : hasErrors }">
                    <div class="ui stacked segment">

                        <div class="field">
                            <div class="ui left icon input">
                                <i class="envelope icon"></i>
                                <input type="email" name="Email" placeholder="Email" v-model.trim="email" required>
                            </div>
                        </div>
                        


                        <div class="field">
                            <div class="ui left icon input">
                                <i class="lock icon"></i>
                                <input type="password" name="Password" placeholder="Password" v-model.trim="password" required>
                            </div>
                        </div>


                        <div class="ui fluid large teal button" @click.prevent="login" :class="{ 'loading' : isLoading }">Login</div>
                    </div>

                    <div class="ui error message" v-if="hasErrors">
                        <p v-for="error in errors" :key="error">{{ error }}</p>
                    </div>

                </form>

                <div class="ui message">
                    New here? <router-link to="/register">Sign Up</router-link>
                </div>
            </div>
        </div>
    </div>


</template>


<script>


export default {
    name: 'Login',
    data () {
        return {
            email: '',
            password: '',
            errors: [],
            isLoading: false
        }
    },
    computed: {
        hasErrors () {
            return this.errors.length > 0
        }
    },
    methods: {
        login () {
            console.log("login")
            this.errors = []


            if (this.isFormValid()) {
                this.isLoading = true


                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then( user => {

                    this.$store.dispatch('setUser', user)
                    this.$router.push('/chatrooms/work')

                }).catch( error => {
                    this.errors.push(error.message)
                    this.isLoading = false
                })
            }
        },
        isFormValid () {
            if (this.email.length > 0 && this.password.length > 0) {
                return true
            }
            return false
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
