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
                    <v-btn elevation="10" fab :to="{ name: 'add-user' }" prepend-icon="mdi-database-plus"
                        color="primary">Thêm nhân viên
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
                            Họ tên
                        </th>
                        <th class="text-center">
                            Ảnh
                        </th>
                        <th class="text-center">
                            Email
                        </th>
                        <th class="text-center">
                            Chức vụ
                        </th>
                        <th class="text-center">
                            Số điện thoại
                        </th>
                        <th class="text-center">
                            Quê quán
                        </th>
                        <th class="text-center">
                            Giới tính
                        </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post in searchUsers" :key="post._id" height="80">
                        <td class="text-capitalize">{{ post.fullname }}</td>
                        <td>
                            <v-img height="50" width="50" cover class="bg-grey-lighten-2" :src="`/${post.image}`">
                            </v-img>
                        </td>
                        <td class="text-center">{{ post.email }}</td>
                        <td class="text-capitalize">{{ post.position }}</td>
                        <td class="text-center">{{ post.phone }}</td>
                        <td class="text-center">
                            <div class="text-truncate">
                                {{ post.address }}
                            </div>
                        </td>
                        <td class="text-center">{{ post.gender }}</td>
                        <td class="text-center">
                            <v-row justify="center">
                                <v-btn :to="{ name: 'edit-user', params: { id: post._id } }" class="mdi"
                                    color="blue">
                                    <span class="mdi mdi-lead-pencil"></span>
                                </v-btn>
                                <v-btn @click="removeUser(post._id)" class="mdi" color="red">
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
import API from '../services/api.user';
export default {
    name: 'User',
    data() {
        return {
            search: "",
            users: [],
        };
    },
    async created() {
        this.users = await API.getAllUser();
        const response = await localStorage.getItem("user-login");
        if (!response) {
            this.$router.push({ name: 'Login' });
        }
    },
    methods: {
        async removeUser(id) {
            const response = await API.deleteUser(id);
            this.$router.push({ params: { message: "Xoá sản phẩm thành công." } });
            this.created();
            this.show = true;
        },

        async created() {
            this.users = await API.getAllUser();
            const response = await localStorage.getItem("user-login");
            if (!response) {
                this.$router.push({ name: 'Login' });
            }
        },

        sortLowest() {
            this.users.sort((a, b) => a.fullname > b.fullname ? 1 : -1);
        },

        sortHightest() {
            this.users.sort((a, b) => a.fullname < b.fullname ? 1 : -1);
        }
    },
    computed: {

        searchUsers() {
            return this.users.filter(users => users.fullname.includes(this.search))
        },
    },
};
</script>

<style>
.text-truncate {
    max-width: 100px;
}
</style>