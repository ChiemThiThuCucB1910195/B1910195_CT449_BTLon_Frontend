<template>
  <v-container>
    <v-alert border="left" close-text dismissible dark color="green accent-4" v-if="this.$route.params.message">
      {{ this.$route.params.message }}
    </v-alert>

    <v-container>
      <v-row align="center" justify="space-around">

        <v-menu transition="scroll-y-transition">
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


        <v-col class="addProduct">
          <v-btn mandatory clearable flat solo-inverted hide-details elevation="10" fab :to="{ name: 'add-product' }"
            prepend-icon="mdi-database-plus" color="primary">Thêm sản phẩm</v-btn>
        </v-col>
      </v-row>

      <v-text-field class="search rounded-t-lg" clearable flat solo-inverted hide-details
        prepend-inner-icon="mdi-magnify" label="Tìm kiếm" v-model="search">
      </v-text-field>

      <v-table class="body">


        <thead>
          <tr>
            <th class="text-center">
              Tên
            </th>
            <th class="text-center">
              Ảnh
            </th>
            <th class="text-center">
              Giá
            </th>
            <th class="text-center">
              Loại sản phẩm
            </th>
            <th class="text-center">
              Nguyên liệu
            </th>
            <th>

            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in searchProducts " :key="post._id" height="80">
            <td class="text-capitalize">{{ post.name }}</td>
            <td >
              <v-img height="50" width="50" cover class="bg-grey-lighten-2" :src="`/${post.image}`"></v-img>
            </td>
            <td class="text-center">{{ post.price }}đ</td>

            <td class="text-capitalize ">
              <div v-for="category in categories">
                <div v-if="post.category == category._id">
                  {{ category.name }}
                </div>
              </div>
            </td>


            <td class="text-truncate">{{ post.description }}</td>
            <td class="btn text-center">

              <v-row justify="center">
                <v-btn :to="{ name: 'edit-product', params: { id: post._id } }" class="mdi" color="blue">
                  <span class="mdi mdi-lead-pencil"></span>
                </v-btn>
                <v-btn @click="removeProduct(post._id)" class="mdi" color="red">
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
import API from '../services/api.product';
import APIA from '../services/api.category';
export default {
  name: 'Product',
  data() {
    return {



      search: "",

      products: [

      ],

      categories: [],
    };
  },
  async created() {
    this.categories = await APIA.getAllCategory();
    this.products = await API.getAllProduct();
    const response = await localStorage.getItem("user-login");
    if (!response) {
      this.$router.push({ name: 'Login' });
    }
  },
  methods: {
    async removeProduct(id) {
      const response = await API.deleteProduct(id);
      this.$router.push({ params: { message: "Xoá sản phẩm thành công." } });
      this.created();
      this.show = true;
    },
    async created() {
      this.categories = await APIA.getAllCategory();
      this.products = await API.getAllProduct();
      const response = await localStorage.getItem("user-login");
      if (!response) {
        this.$router.push({ name: 'Login' });
      }
    },

    sortLowest() {
      this.products.sort((a, b) => a.name > b.name ? 1 : -1);
    },

    sortHightest() {
      this.products.sort((a, b) => a.name < b.name ? 1 : -1);
    }


  },
  computed: {

    searchProducts() {
      return this.products.filter(products => products.name.includes(this.search))
    },
  },
};
</script>

<style>
.text-truncate {
  max-width: 150px;
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