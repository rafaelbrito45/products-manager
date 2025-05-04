<template>
  <div class="flex flex-row justify-around bg-gray-100 rounded p-2">
    <div class="flex flex-row">
      <p class="text-sm mr-1 p-1">items per page</p>
      <select
        v-model="itemsPerPage"
        class="bg-gray-100"
        @change="changeItemsPerPage"
      >
        <option selected>5</option>
        <option>10</option>
        <option>20</option>
      </select>
    </div>
    <button
      :disabled="currentPage === 1"
      class="disabled:opacity-50"
      @click="previousPage"
    >
      previous
    </button>
    <button
      :disabled="currentPage === totalPages"
      class="disabled:opacity-50"
      @click="nextPage"
    >
      next
    </button>
  </div>
</template>

<script>
export default {
  name: 'PaginationControls',
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    totalPages: {
      type: Number,
      default: 4,
    },
  },
  data() {
    return {
      itemsPerPage: 5,
    }
  },
  methods: {
    nextPage() {
      this.$emit('next-page', 'next')
    },
    previousPage() {
      this.$emit('previous-page', 'previous')
    },
    changeItemsPerPage() {
      this.$emit('change-items', this.itemsPerPage)
    },
  },
}
</script>

<style></style>
