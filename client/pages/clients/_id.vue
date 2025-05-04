<template>
  <div class="container p-5 mt-5">
    <h1 class="text-3xl mb-5">{{ client.name }} {{ client.surname }}</h1>

    <div>
      <div
        v-if="orders.length === 0"
        class="text-gray-700 mb-5 bg-gray-100 flex justify-between flex-row p-5 border border-gray-100 rounded w-full md:w-1/2"
      >
        <p class="text-2xl">This client has no orders 😞</p>
      </div>
      <div
        v-for="order in orders"
        :key="order.customer_id"
        class="text-gray-700 mb-5 bg-gray-100 flex justify-between flex-row p-5 border border-gray-100 rounded text-sm md:text-base w-full md:w-1/2"
      >
        <div class="flex flex-col">
          <div v-for="product in order.products" :key="product.id">
            <p>{{ product.name }} - $ {{ product.price }}</p>
          </div>
        </div>

        <div>
          <p>📆 {{ order.date }}</p>
          <p>order id - {{ order.order_id }}</p>
        </div>
      </div>
    </div>

    <div>
      <button
        class="bg-red-500 w-20 rounded py-1 w-28 text-white"
        @click="deleteClient(id)"
      >
        Delete client
      </button>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const id = params.id

    const client = await $axios.$get(`/clients/${id}`)

    const orders = await $axios.$get(`/clients/${id}/orders`)

    return {
      client,
      orders,
      id,
    }
  },
  methods: {
    deleteClient(id) {
      this.$axios
        .delete('/clients/delete', {
          id,
        })
        .then((response) => {
          this.$router.push('/clients')
        })
        .catch((err) => {
          window.alert(err)
        })
    },
  },
}
</script>

<style></style>
