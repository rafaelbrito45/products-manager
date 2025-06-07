<template>
  <div class="mt-5 flex flex-col items-center p-2">
    <div class="ml-5 md:ml-0 lg:ml-5 flex flex-row items-center">
      <div class="pt-12 md:p-0">
        <SearchBar title="🔎 search products" @search-text="searchText" />
      </div>
      <button
        :class="
          showAddProduct
            ? 'bg-red-500 ml-5 rounded py-1 px-2 w-40 md:w-24'
            : 'bg-sky-500  md:ml-5 md:w-28  rounded py-1 px-2 w-40 mr-5 '
        "
        @click="toggleAddProduct"
      >
        {{ showAddProduct ? 'Close form' : 'Add product' }}
      </button>
    </div>
    <div
      v-if="showAddProduct"
      class="mt-5 p-5 md:pl-10 md:w-8/12 lg:w-full flex justify-center"
    >
      <AddProduct @on-add-product="postProduct" />
    </div>
    <div v-else class="p-5 flex flex-row md:w-3/4 items-center justify-center">
      <table
        class="table-auto border-collapse border-spacing-2 border border-gray-300 rounded w-full md:w-10/12"
      >
        <thead>
          <tr>
            <th class="text-left text-slate-500 text-sm md:text-base">Name</th>
            <th class="text-left text-slate-500 text-sm md:text-base">Price</th>
            <th class="text-left text-slate-500 text-sm md:text-base">Store</th>
            <th class="text-left text-slate-500 text-sm md:text-base">Sold</th>
            <th class="text-left text-slate-500 text-sm md:text-base">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in products.products"
            :key="product.id"
            class="text-gray-700"
          >
            <td class="border-y border-gray-300 text-xs md:text-base">
              <nuxt-link :to="`product/${product.id}`">
                {{ product.name }}
              </nuxt-link>
            </td>
            <td class="border-y border-gray-300 text-xs md:text-base">
              $ {{ product.price.toFixed(2) }}
            </td>
            <td class="border-y border-gray-300 text-xs md:text-base">
              {{ product.store_name }}
            </td>

            <td class="border-y border-gray-300 text-xs md:text-base">
              {{ product.totalAmount }}
            </td>

            <td class="border-y border-gray-300 text-xs md:text-base">
              <nuxt-link :to="`product/${product.id}`">ℹ️</nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="products.currentPage != -1" class="w-96">
      <PaginationControls
        :total-pages="products.totalPages"
        :current-page="products.currentPage"
        @next-page="handlePagination"
        @previous-page="handlePagination"
        @change-items="changeItemsPerPage"
      />
    </div>
  </div>
</template>

<script>
import AddProduct from '../components/AddProduct.vue'
import PaginationControls from '../components/PaginationControls.vue'
import SearchBar from '../components/SearchBar.vue'

export default {
  name: 'IndexPage',
  components: { SearchBar, AddProduct, PaginationControls },
  async asyncData({ $axios }) {
    const products = await $axios.$get(
      '/products/paginate?itemsPerPage=5&currentPage=1'
    )
    return {
      products,
    }
  },
  data() {
    const showAddProduct = false
    const itemsPerPage = 5
    return {
      showAddProduct,
      itemsPerPage,
    }
  },
  methods: {
    async searchText(text) {
      const products = await this.$axios.$get(`/products/search?q=${text}`)
      this.products = products
    },
    toggleAddProduct() {
      this.showAddProduct = !this.showAddProduct
    },
    postProduct(productData) {
      this.$axios
        .post('/products', {
          ...productData,
          id: Math.floor(Math.random() * 1000000),
        })
        .then(() => {
          window.location.reload()
        })
        .catch((err) => {
          window.alert(err)
        })
    },
    async handlePagination(action) {
      if (action === 'next') {
        if (this.products.currentPage < this.products.totalPages) {
          const products = await this.$axios.$get(
            `/products/paginate?limit=${this.itemsPerPage}&page=${
              this.products.currentPage + 1
            }`
          )
          this.products = products
        }
      }

      if (action === 'previous') {
        if (this.products.currentPage > 1) {
          const products = await this.$axios.$get(
            `/products/paginate?limit=${this.itemsPerPage}&page=${
              this.products.currentPage - 1
            }`
          )
          this.products = products
        }
      }
    },
    async changeItemsPerPage(items) {
      this.itemsPerPage = items
      const products = await this.$axios.$get(
        `/products/paginate?limit=${this.itemsPerPage}&page=${this.products.currentPage}`
      )

      this.products = products

      if (products.currentPage > this.products.totalPages) {
        const products = await this.$axios.$get(
          `/products/paginate?limit=${this.itemsPerPage}&page=1`
        )
        this.products = products
      }
    },
  },
}
</script>
