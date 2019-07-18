<template>
    <v-container>
        <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-card-title primary-title>
                        <div class="headline">Login to your account</div>
                    </v-card-title>
                    <v-card-text>
                        <div v-if="errorMessage" style="color: red">{{ errorMessage }}</div>
                        <v-form
                            ref="form"
                            lazy-validation
                        >
                            <v-text-field
                            v-model="username"
                            :rules="usernameRules"
                            label="Username"
                            required
                            block
                            ></v-text-field>

                            <v-text-field
                            v-model="password"
                            :append-icon="show ? 'visibility' : 'visibility_off'"
                            :rules="passwordRules"
                            :type="show ? 'text' : 'password'"
                            name="input-10-1"
                            label="Normal with hint text"
                            hint="At least 8 characters"
                            counter
                            @click:append="show = !show"
                            ></v-text-field>

                            <v-btn
                            color="warning"
                            @click="submit"
                            class="mx-0"
                            >
                            Login
                            </v-btn>

                            <v-btn
                            flat
                            @click="register"
                            >
                            Register a new account
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import * as auth from '@/services/AuthServices'
export default {
    data() {
        return {
            show: false,
            errorMessage: null,
            username: '',
            password: '',
            usernameRules: [
                v => !!v || 'Username is required'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
            ],
        }
    },
    methods: {
        async submit() {
            const user = {
                username: this.username,
                password: this.password
            }
            await auth.login(user)
            .then(res => {
                console.log(res)
                this.$router.push({ name: 'home' })
            })
            .catch(err => {
                this.errorMessage = err.response.data.message
            })
        },
        register() {
            
        }
    }
}
</script>

