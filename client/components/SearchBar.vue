<template>
  <form @submit.prevent="onSubmit">
    <input
      v-model="text"
      :placeholder="title"
      type="text"
      class="border-zinc-700 border py-1 px-2 mr-3 rounded"
    />
    <input
      type="submit"
      value="Search"
      class="bg-sky-500 py-1 px-2 rounded mt-4 md:mt-0"
    />
  </form>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    title: {
      type: String,
      default: 'Search',
    },
  },
  data() {
    return {
      text: '',
    }
  },
  methods: {
    onSubmit() {
      this.$emit('search-text', this.text)
      this.text = ''
    },
  },
}
</script>

<style></style>
