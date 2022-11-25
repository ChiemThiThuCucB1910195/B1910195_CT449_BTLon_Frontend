
<template >

  <v-app id="inspire">
    <template v-if="$route.name != 'Login'">
      <v-navigation-drawer v-model="drawer">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-content class="logo">
              Coffee & Tea
            </v-list-item-content>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.link" link active-color="primary">
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn  depressed color="red" @click="Logout" block>
              Đăng Xuất
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>


      <v-app-bar>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>
    </template>



    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    theme: "light",
    drawer: null,
    items: [
      { title: 'Quản lý tài khoản', icon: 'mdi-account-box', link: "/account" },
      { title: 'Quản lý nhân viên', icon: 'mdi-account', link: "/user" },
      { title: 'Quản lý loại sản phẩm', icon: 'mdi-buffer', link: "/category" },
      { title: 'Quản lý sản phẩm', icon: 'mdi-coffee', link: "/product" },
    ],
  }),
  methods: {

    async Logout() {
      localStorage.clear();
      router.push({name: '/'});
      location.reload(localStorage);
    },

    // async changeTheme(){
    //   console.log("I am changing theme");
    //   this.theme = this.theme === "dark" ? "light" : "dark"  ;
    // }

  },
}

</script>

<style >
.logo {
  font-weight: bold;
  font-size: 30px;
  color: green;
}

/* .light-theme{
  background-color: white;
  color: black;
}

.dark-theme{
  background-color: black;
  color: white;
} */
</style>
