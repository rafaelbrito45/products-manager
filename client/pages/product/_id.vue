<template>
  <div class="w-screen flex justify-center">
    <div
      class="container p-5 mt-20 flex flex-col border border-gray-300 rounded w-6/12 bg-gray-100"
    >
      <h1 class="text-lg text-center mb-5 text-slate-900">
        {{ product.name }}
      </h1>

      <div class="flex justify-around text-slate-500 text-md">
        <p class="mb-4">
          <span class="text-slate-900">Price:</span> $
          {{ product.price }}
        </p>
        <p>
          <span class="text-slate-900">Sold by:</span> {{ product.store_name }}
        </p>
      </div>

      <div class="flex justify-around text-slate-500">
        <p class="mb-4">
          <span class="text-slate-900">Units sold:</span>
          {{ product.totalAmount }}
        </p>
      </div>
      <div class="flex justify-center">
        <button
          class="bg-red-500 w-20 rounded py-1 text-white"
          @click="deleteUser(id)"
        >
          delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const id = params.id

    const product = await $axios.$get(`/products/${id}`)
    return {
      product,
      id,
    }
  },
  methods: {
    deleteUser(id) {
      this.$axios
        .delete(`/products/${id}`)
        .then((response) => {
          this.$router.push('/')
        })
        .catch((err) => {
          window.alert(err)
        })
    },
  },
}
</script>

<style></style>
