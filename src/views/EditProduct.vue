<template>

    <v-container>
        <v-row align="center" justify="space-around" no-gutters>
            <v-col sm="10">
                <v-card class="pa-5">
                    <v-card-title class="title">CẬP NHẬT SẢN PHẨM</v-card-title>
                    <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible
                        v-if="this.$route.params.message">
                        {{ this.$route.params.message }}
                    </v-alert>
                    <v-divider></v-divider>
                    <v-form ref="form" @submit.prevent="updateForm" class="pa-5" enctype="multipart/form-data">

                        <v-text-field label="Tên sản phẩm" v-model="product.name" prepend-icon="mdi-note"
                            :rules="namerules" required>
                        </v-text-field>


                        <v-select prepend-icon="mdi-note" v-model="product.category" label="Tên loại sản phẩm"
                            :items="categories" item-title="name" item-value="_id" :rules="categoryrules" required>
                        </v-select>

                        <v-text-field label="Giá sản phẩm" v-model="product.price" prepend-icon="mdi-view-list"
                            :rules="pricerules" required>
                        </v-text-field>

                        <v-textarea label="Nguyên liệu" v-model="product.description" prepend-icon="mdi-note-plus"
                            :rules="desrules" required>
                        </v-textarea>

                        <v-file-input @change="selectFile" label="Ảnh sản phẩm" show-size counter multiple
                            :rules="imagerules" required>
                        </v-file-input>

                        <v-img class="image" :src="`/${product.image}`" width="120"></v-img>

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
import axios from 'axios';
import API from '../services/api.product.js';
import APIA from '../services/api.category';
export default {
    data() {
        return {
            namerules: [
                value => !!value || "Tên sản phẩm không được để trống!",
            ],

            categoryrules: [
                value => !!value || "Loại sản phẩm không được để trống!",
            ],

            pricerules: [
                value => !!value || "Giá tiền sản phẩm không được để trống!",
            ],

            desrules: [
                value => !!value || "Mô tả sản phẩm không được để trống!",
            ],

            imagerules: [
                value => !!value || "Ảnh sản phẩm không được để trống!",
            ],
            product: {
                name: "",
                category: "",
                description: "",
                price: "",
                image: "",
            },
            image: "",

            categories: [],
        };
    },

    // async created() {
    //     const response = await APIA.getAllCategory();
    //     this.categories = response;
    //     // console.log(this.categories);
    // },

    async created() {
        const response = await API.getProductById(this.$route.params.id);
        const responsecategory = await APIA.getAllCategory();
        this.categories = responsecategory;
        this.product = response;
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
            formData.append("price", this.product.price);
            formData.append("category", this.product.category);
            formData.append("description", this.product.description);
            formData.append("name", this.product.name);
            formData.append("old_image", this.product.image);
            if (this.$refs.form.validate()) {
                const response = await API.updateProduct(this.$route.params.id, formData);
                this.$router.push({ params: { message: "Cập nhật thành công!" } });
                // this.$router.push({ name: 'Product',params: { message: "Cập nhật sản phẩm thành công" } });
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
