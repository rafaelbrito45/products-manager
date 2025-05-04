<template>
  <form @submit.prevent="onSubmit">
    <input
      v-model="name"
      type="text"
      placeholder="name"
      class="border-zinc-700 border py-1 px-2 mr-3 mb-3 rounded"
    />
    <input
      v-model="price"
      type="number"
      placeholder="price"
      class="border-zinc-700 border py-1 px-2 mr-3 mb-3 rounded"
    />
    <input
      v-model="store_name"
      type="text"
      placeholder="store name"
      class="border-zinc-700 border py-1 px-2 mr-24 md:mr-3 mb-3 rounded"
    />
    <input
      type="submit"
      value="Add product"
      class="bg-sky-500 py-1 px-2 rounded"
    />

    <div v-if="fieldsRequired" class="flex justify-center m-1">
      <span class="text-sm text-red-400">All the fields are required</span>
    </div>
  </form>
</template>

<script>
export default {
  name: 'AddProduct',
  data() {
    return {
      name: '',
      price: '',
      store_name: '',
      fieldsRequired: false,
    }
  },
  methods: {
    onSubmit() {
      if (!this.name.trim() || !this.store_name.trim() || !this.price) {
        this.fieldsRequired = true
      } else {
        const data = {
          name: this.name,
          price: Number(this.price),
          store_name: this.store_name,
        }
        this.$emit('on-add-product', data)

        this.name = ''
        this.price = ''
        this.store_name = ''
      }
    },
  },
}
</script>

<style></style>
