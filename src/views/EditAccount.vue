<template>

    <v-container>
        <v-row align="center" justify="space-around" no-gutters>
            <v-col sm="10">

                <v-card class="pa-5">
                    <v-card-title class="title">CẬP NHẬT TÀI KHOẢN</v-card-title>
                    <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible
                        v-if="this.$route.params.message">
                        {{ this.$route.params.message }}
                    </v-alert>
                    <v-divider></v-divider>
                    <v-form ref="form" @submit.prevent="updateForm" class="pa-5" enctype="multipart/form-data">
                        <v-text-field label="Tên tài khoản" v-model="account.fullname" prepend-icon="mdi-note"
                            :rules="fullnamerules" required>

                        </v-text-field>

                        <v-text-field label="email" v-model="account.email" prepend-icon="mdi-note-plus"
                            :rules="emailrules" required>

                        </v-text-field>

                        <v-text-field label="Mật khẩu" v-model="account.password" prepend-icon="mdi-note"
                            :rules="passwordrules" required>

                        </v-text-field>

                        <div class="text-right">
                            <v-btn type="submit" class="mt-3" color="primary">
                                Cập Nhật
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

export default {
    data() {
        return {
            fullnamerules: [
                value => !!value || "Họ tên không được để trống!",
            ],
            passwordrules: [
                value => !!value || "Mật khẩu không được để trống!",
            ],
            emailrules: [
                v => !!v || 'E-mail is không được để trống',
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
        const response = await API.getAccountById(this.$route.params.id);
        this.account = response;
        const responselogin = await localStorage.getItem("user-login");
        if (!responselogin) {
            this.$router.push({ name: 'Login' });
        }
    },
    methods: {
        async updateForm() {
            const formData = new FormData();
            formData.append("email", this.account.email);
            formData.append("fullname", this.account.fullname);
            formData.append("password", this.account.password);
            if (this.$refs.form.validate()) {
                const response = await API.updateAccount(this.$route.params.id, formData);
                this.$router.push({ params: { message: "Cập nhật tài khoản thành công" } });
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
