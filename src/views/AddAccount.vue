<template>

    <v-container>
        <v-row align="center" justify="space-around" no-gutters>
            <v-col sm="10">

                <v-card class="pa-5">
                    <v-card-title class="title">THÊM TÀI KHOẢN</v-card-title>
                    <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible
                        v-if="this.$route.params.message">
                        {{ this.$route.params.message }}
                    </v-alert>
                    <v-divider></v-divider>
                    <v-form v-model="valid" ref="form" @submit.prevent="submitForm" class="pa-5"
                        enctype="multipart/form-data">
                        <v-text-field label="Tên tài khoản" v-model="account.fullname" prepend-icon="mdi-note"
                            :rules="fullnamerules" required>

                        </v-text-field>

                        <v-text-field label="email" v-model="account.email" prepend-icon="mdi-note-plus"
                            :rules="emailrules" required>

                        </v-text-field>

                        <v-text-field label="Mật khẩu" v-model="account.password" prepend-icon="mdi-note-plus"
                            :rules="passwordrules" required>

                        </v-text-field>

                        <div class="text-right">
                            <v-btn  type="submit" color="primary">
                                Thêm
                            </v-btn>
                        </div>

                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import API from '../services/api.account';
import * as rules from '@vee-validate/rules';

export default {




    data() {
        return {

            fullnamerules: [
                value => !!value || "Tên không được để trống!",
            ],

            emailrules: [
                value => !!value || "Email không được để trống!",
                v => /.+@.+/.test(v) || 'Email không hợp lệ (example@gmail.com)',
            ],


            account: {
                fullname: "",
                email: "",
                password: "",
            },
        };
    },

    async created() {
        // this.categories = await API.getAllCategory();
        const response = await localStorage.getItem("user-login");
        if (!response) {
            this.$router.push({ name: 'Login' });
        }
    },
    methods: {

        async submitForm() {
            const formData = new FormData();
            formData.append("email", this.account.email);
            formData.append("password", this.account.password);
            formData.append("fullname", this.account.fullname);
            if (this.$refs.form.validate()) {
                const response = await API.addAccount(formData);
                this.$router.push({ params: { message: "Thêm tài khoản thành công" } });
            }
        }


    },

};

</script>
<style>
.title {
    text-align: center;
    font-weight: bold;
    font-size: 25px;
    color: blue;
}
</style>

