<template>
    <v-container>
        <v-alert border="left" close-text="Close Alert" color="red accent-4" dark dismissible
            v-if="this.$route.params.message">
            {{ this.$route.params.message }}
        </v-alert>

        <v-container>
            <v-row align="center" justify="space-around">

                <v-menu sm="12" class="d-flex justify-start" transition="scroll-y-transition">
                    <template v-slot:activator="{ props }">
                        <v-btn color="primary" class=" sortby" elevation="10" fab v-bind="props">
                            Sắp xếp theo tên
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item link>
                            <v-list-item-title v-model="sortDesc" mandatory :value="false" @click="sortLowest">Tăng dần
                            </v-list-item-title>

                        </v-list-item>
                        <v-list-item link>

                            <v-list-item-title :value="true" @click="sortHightest">Giảm dần</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

                <v-col class="d-flex justify-end">
                    <v-btn elevation="10" fab :to="{ name: 'add-category' }" prepend-icon="mdi-database-plus" color="primary">
                        Thêm loại sảnphẩm
                    </v-btn>
                </v-col>
            </v-row>

            <v-text-field class="search rounded-t-lg" clearable flat solo-inverted hide-details
                prepend-inner-icon="mdi-magnify" label="Tìm kiếm" v-model="search">
            </v-text-field>


            <v-table>
                <thead>
                    <tr>
                        <th class="text-center">
                            Tên
                        </th>
                        <th class="text-center">
                            Mô tả
                        </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post in searchCategories" :key="post._id" height="80">
                        <td class="text-capitalize">{{ post.name }}</td>
                        <td class="text-truncate">{{ post.description }}</td>
                        <td class="text-center">

                            <v-row justify="center">

                                <v-btn :to="{ name: 'edit-category', params: { id: post._id } }" class="mdi"
                                    color="blue">
                                    <span class="mdi mdi-lead-pencil"></span>
                                </v-btn>
                                <v-btn @click="removeCategory(post._id)" class="mdi" color="red">
                                    <span class="mdi mdi-delete"></span>
                                </v-btn>
                            </v-row>

                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-container>

    </v-container>
</template>
  
<script>
import API from '../services/api.category';
export default {
    name: 'Category',
    data() {
        return {
            search: "",
            categories: [],
        };
    },
    async created() {
        this.categories = await API.getAllCategory();
        const response = await localStorage.getItem("user-login");
        if (!response) {
            this.$router.push({ name: 'Login' });
        }
    },
    methods: {
        async removeCategory(id) {
            const response = await API.deleteCategory(id);
            this.$router.push({ params: { message: "Xoá loại sản phẩm thành công." } });
            this.created();
            this.show = true;
        },

        async created() {
            this.categories = await API.getAllCategory();
        },

        sortLowest() {
            this.categories.sort((a, b) => a.name > b.name ? 1 : -1);
        },

        sortHightest() {
            this.categories.sort((a, b) => a.name < b.name ? 1 : -1);
        },
    },

    computed: {

        searchCategories() {
            return this.categories.filter(categories => categories.name.includes(this.search))
        },
    },
};
</script>

<style>
.text-truncate {
    max-width: 800px;
}

.addProduct {
    text-align: right;
    margin: 0px 5px 0px 0px;
}

.mdi {
    font-size: 20px;
}

.search {
    background-color: rgb(241, 239, 239);
    margin: 20px 0px 0px 0px;

}

.sortby {

    margin: 10px 10px 10px 15px;
}
</style>