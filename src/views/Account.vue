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
                    <v-btn elevation="10" fab :to="{ name: 'add-account' }" prepend-icon="mdi-database-plus"
                        color="primary">Thêm tài khoản
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
                            Email
                        </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post in searchAccount" :key="post._id" height="80">
                        <td class="text-capitalize">{{ post.fullname }}</td>
                        <td>{{ post.email }}</td>
                        <td class="text-center">
                            <v-row  justify="center">
                                <v-btn :to="{ name: 'edit-account', params: { id: post._id } }" class="mdi"
                                    color="blue">
                                    <span class="mdi mdi-lead-pencil"></span>
                                </v-btn>
                                <v-btn @click="removeAccount(post._id)" class="mdi" color="red">
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

import API from '../services/api.account';

export default {
    name: 'Account',
    data() {
        return {
            search: "",
            accounts: [],
        };
    },
    async created() {
        this.accounts = await API.getAllAccount();
        const response = await localStorage.getItem("user-login");
        if (!response) {
            this.$router.push({ name: 'Login' });
        }
    },
    methods: {
        async removeAccount(id) {
            const response = await API.deleteAccount(id);
            this.$router.push({ params: { message: "Xoá tài khoản thành công." } });
            this.created();
            this.show = true;
        },

        async created() {
            this.accounts = await API.getAllAccount();
            const response = await localStorage.getItem("user-login");
            if (!response) {
                this.$router.push({ name: 'Login' });
            }
        },

        sortLowest() {
            this.accounts.sort((a, b) => a.fullname > b.fullname ? 1 : -1);
        },

        sortHightest() {
            this.accounts.sort((a, b) => a.fullname < b.fullname ? 1 : -1);
        },
    },

    computed: {

        searchAccount() {
            return this.accounts.filter(accounts => accounts.fullname.includes(this.search));
        },
    },
};
</script>

