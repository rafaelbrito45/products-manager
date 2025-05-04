<template>
  <form @submit.prevent="onSubmit">
    <input
      v-model="name"
      placeholder="name"
      type="text"
      class="border-zinc-700 border py-1 px-2 mr-3 rounded mb-3"
    />
    <input
      v-model="surname"
      placeholder="surname"
      type="text"
      class="border-zinc-700 border py-1 px-2 mr-3 rounded mb-3"
    />
    <input
      type="submit"
      value="Add client"
      class="bg-sky-500 py-1 px-2 rounded"
    />
    <div v-if="fieldsRequired" class="flex justify-center m-1">
      <span class="text-sm text-red-400">All the fields are required</span>
    </div>
  </form>
</template>

<script>
export default {
  name: 'AddClient',
  data() {
    return {
      name: '',
      surname: '',
      fieldsRequired: false,
    }
  },
  methods: {
    onSubmit() {
      if (!this.name.trim() || !this.surname.trim()) {
        this.fieldsRequired = true
      } else {
        this.$emit('add-client', { name: this.name, surname: this.surname })

        this.name = ''
        this.surname = ''
      }
    },
  },
}
</script>

<style></style>
