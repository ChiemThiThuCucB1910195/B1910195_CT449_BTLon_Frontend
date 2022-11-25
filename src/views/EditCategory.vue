<template>

    <v-container>
        <v-row align="center" justify="space-around" no-gutters>
            <v-col sm="10">

                <v-card class="pa-5">
                    <v-card-title class="title">CẬP NHẬT LOẠI SẢN PHẨM</v-card-title>
                    <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible
                        v-if="this.$route.params.message">
                        {{ this.$route.params.message }}
                    </v-alert>
                    <v-divider></v-divider>
                    <v-form ref="form" @submit.prevent="updateForm" class="pa-5" enctype="multipart/form-data">
                        <v-text-field label="Tên loại sản phẩm" v-model="category.name" prepend-icon="mdi-note"
                            :rules="namerules" required>

                        </v-text-field>
                        <v-textarea label="Mô tả" v-model="category.description" prepend-icon="mdi-note-plus"
                            :rules="desrules" required>

                        </v-textarea>

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
import API from '../services/api.category';

export default {
    data() {
        return {
            namerules: [
                value => !!value || "Tên sản phẩm không được để trống!",
            ],

            desrules: [
                value => !!value || "Mô tả sản phẩm không được để trống!",
            ],

            category: {
                name: "",
                description: "",
            },
        };
    },
    async created() {
        const response = await API.getCategoryById(this.$route.params.id);
        this.category = response;
        const responselogin = await localStorage.getItem("user-login");
        if (!responselogin) {
            this.$router.push({ name: 'Login' });
        }
    },
    methods: {
        async updateForm() {
            const formData = new FormData();
            formData.append("description", this.category.description);
            formData.append("name", this.category.name);
            if (this.$refs.form.validate()) {
                const response = await API.updateCategory(this.$route.params.id, formData);
                this.$router.push({ params: { message: "Cập nhật loại sản phẩm thành công" } });
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
