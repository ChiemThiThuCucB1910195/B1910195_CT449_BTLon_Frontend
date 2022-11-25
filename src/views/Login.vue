<template>

    <v-container class="formlogin" fluid fill-height>



        <v-card>
            <v-toolbar class="title" dark color="primary">
                <v-toolbar-title>ĐĂNG NHẬP</v-toolbar-title>
            </v-toolbar>



            <v-card-text>
                <v-alert class="alert" border="left" close-text dismissible dark color="error accent-4"
                    v-if="this.$route.params.message">
                    {{ this.$route.params.message }}
                </v-alert>
                <v-form>
                    <v-text-field type="text" v-model="email" prepend-icon="mdi-account" name="email" label="Email">
                    </v-text-field>
                    <v-text-field type="password" v-model="password" prepend-icon="mdi-lock" name="password"
                        label="Mật khẩu">
                    </v-text-field>
                </v-form>
            </v-card-text>

                <div class="login">
                    <v-spacer></v-spacer>
                    <v-btn color="blue" v-on:click="Login">Đăng Nhập</v-btn>
                </div>

            </v-card>


    </v-container>

</template>

<script>
import API from '../services/api.account';

export default {
    // emailMatch: () => (`The email and password you entered don't match`),
    name: "Login",
    data() {
        return {
            email: '',
            password: ''
        }

    },

    methods: {
        async Login() {
            const response = await API.getAccountByEmailPassword(this.email, this.password)

            console.warn(response.length);

            if (response.length > 0) {
                localStorage.setItem("user-login", JSON.stringify(response));
                this.$router.push({ name: 'Product' });
            } else {
                this.$router.push({ params: { message: "Email hoặc mật khẩu không chính xác!." } });
            }

        }
    }
};

</script>

<style>
.formlogin {
    padding-top: 100px;
    width: 700px;
}

.title {
    text-align: center;
}

.alert {
    margin-bottom: 10px;
}

.login {
    text-align: right;
    margin: 0px 10px 10px 0px;
}
</style>
