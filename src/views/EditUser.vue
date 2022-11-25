<template>

    <v-container>
        <v-row align="center" justify="space-around" no-gutters>
            <v-col sm="10">

                <v-card class="pa-5">
                    <v-card-title class="title">CẬP NHẬT NHÂN VIÊN</v-card-title>
                    <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible
                        v-if="this.$route.params.message">
                        {{ this.$route.params.message }}
                    </v-alert>
                    <v-divider></v-divider>
                    <v-form ref="form" @submit.prevent="updateForm" class="pa-5" enctype="multipart/form-data">
                        <v-text-field label="Họ tên nhân viên" v-model="user.fullname" prepend-icon="mdi-account"
                            :rules="fullnamerules" required>

                        </v-text-field>
                        <v-text-field label="email" v-model="user.email" prepend-icon="mdi-email" :rules="emailrules"
                            required>

                        </v-text-field>
                        <v-text-field label="Chức vụ" v-model="user.position" prepend-icon="mdi-account-edit"
                            :rules="positionrules" required>

                        </v-text-field>
                        <v-text-field label="Số điện thoại" v-model="user.phone" prepend-icon="mdi-phone"
                            :rules="phonerules" required>

                        </v-text-field>

                        <v-textarea label="Địa chỉ" v-model="user.address" prepend-icon="mdi-home" :rules="addressrules"
                            required>

                        </v-textarea>

                        <v-file-input @change="selectFile" label="Ảnh nhân viên" show-size counter multiple
                            :rules="imagerules" required>

                        </v-file-input>
                        <v-img class="image" :src="`/${user.image}`" width="120"></v-img>

                        <v-radio-group color="red" v-model="user.gender" prepend-icon="mdi-human-male-female"
                            :rules="genderrules" required>
                            <v-radio label="Nam" value="Nam"></v-radio>
                            <v-radio label="Nữ" value="Nữ"></v-radio>
                        </v-radio-group>

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

import API from '../services/api.user.js';

export default {
    data() {
        return {
            fullnamerules: [
                value => !!value || "Họ tên không được để trống!",
            ],
            positionrules: [
                value => !!value || "Chức vụ không được để trống!",
            ],

            addressrules: [
                value => !!value || "Địa chỉ không được để trống!",
            ],

            genderrules: [
                value => !!value || "Giới tính không được để trống!",
            ],

            imagerules: [
                value => !!value || "Ảnh nhân viên không được để trống!",
            ],

            phonerules: [
                value => !!value || "Số điện thoại không được để trống!",
                value => value.length == 10 || 'Số điện thoại có 10 chữ số'
            ],
            emailrules: [
                v => !!v || 'E-mail is không được để trống',
                v => /.+@.+/.test(v) || 'Email không hợp lệ (example@gmail.com)',
            ],
            user: {
                fullname: "",
                email: "",
                phone: "",
                address: "",
                gender: "",
                image: "",
                position: ""
            },
            image: "",
        };
    },
    async created() {
        const response = await API.getUserById(this.$route.params.id);
        this.user = response;
        const responselogin = await localStorage.getItem("user-login");
        if (!responselogin) {
            this.$router.push({ name: 'Login' });
        }
    },
    methods: {
        selectFile(file) {
            this.image = file.target.files[0];;
        },
        async updateForm() {
            const formData = new FormData();
            formData.append("image", this.image);
            formData.append("fullname", this.user.fullname);
            formData.append("email", this.user.email);
            formData.append("phone", this.user.phone);
            formData.append("address", this.user.address);
            formData.append("gender", this.user.gender);
            formData.append("old_image", this.user.image);
            formData.append("position", this.user.position);
            if (this.$refs.form.validate()) {
                const response = await API.updateUser(this.$route.params.id, formData);
                this.$router.push({ params: { message: "Cập nhật sản phẩm thành công" } });
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
.image{
    margin: 0px 0px 0px 40px;
}
</style>
