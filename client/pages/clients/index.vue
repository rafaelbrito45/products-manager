<template>
  <div class="mt-5 flex flex-col items-center p-2">
    <div class="ml-5 flex flex-row items-center mt">
      <div class="self-start md:self-end pt-1">
        <SearchBar title="🔎 search clients" @search-text="searchText" />
      </div>
      <button
        :class="
          showAddClient
            ? 'bg-red-500 ml-5 mt-1 md:mt-0 rounded py-1 px-2 self-start md:self-end w-28'
            : 'bg-sky-500 ml-5 mt-1 md:mt-0 rounded py-1 px-2 self-start md:self-end w-28'
        "
        @click="toggleAddClient"
      >
        {{ showAddClient ? 'Close form' : 'Add client' }}
      </button>
    </div>
    <div v-if="showAddClient" class="mt-5 ml-2 p-2 md:p-5 flex items-center">
      <AddClient @add-client="postClient" />
    </div>
    <div
      v-else
      class="p-5 flex flex-row w-full md:w-3/4 items-center justify-center"
    >
      <table
        class="table-auto border-collapse border-spacing-2 border border-gray-300 rounded w-full md:w-6/12"
      >
        <thead>
          <tr>
            <th class="text-left text-slate-500">Name</th>
            <th class="text-left text-slate-500">Surname</th>
            <th class="text-left text-slate-500">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="client in clients.clients"
            :key="client.id"
            class="text-gray-700"
          >
            <td class="border-y border-gray-300">
              <nuxt-link :to="`/clients/${client.id}`">
                {{ client.name }}
              </nuxt-link>
            </td>
            <td class="border-y border-gray-300">{{ client.surname }}</td>
            <td class="border-y border-gray-300">
              <nuxt-link :to="`/clients/${client.id}`">ℹ️</nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="w-96">
      <PaginationControls
        :total-pages="clients.totalPages"
        :current-page="clients.currentPage"
        @next-page="handlePagination"
        @previous-page="handlePagination"
        @change-items="changeItemsPerPage"
      />
    </div>
  </div>
</template>

<script>
import AddClient from '../../components/AddClient.vue'
import PaginationControls from '../../components/PaginationControls.vue'
import SearchBar from '../../components/SearchBar.vue'

export default {
  name: 'IndexClientsPage',
  components: { SearchBar, AddClient, PaginationControls },
  async asyncData({ $axios }) {
    const clients = await $axios.$get('/clients/paginate?limit=5&page=1')
    return {
      clients,
    }
  },
  data() {
    const showAddClient = false
    const itemsPerPage = 10
    return {
      showAddClient,
      itemsPerPage,
    }
  },
  methods: {
    async searchText(text) {
      const clients = await this.$axios.$get(`/clients/search?q=${text}`)
      this.clients = clients
    },
    toggleAddClient() {
      this.showAddClient = !this.showAddClient
    },
    async postClient(clientData) {
      await this.$axios.$post('/clients', {
        ...clientData,
        id: Math.floor(Math.random() * 1000000),
      })
      window.location.reload()
    },
    async handlePagination(action) {
      if (action === 'next') {
        if (this.clients.currentPage < this.clients.totalPages) {
          const clients = await this.$axios.$get(
            `/clients/paginate?limit=${this.itemsPerPage}&page=${
              this.clients.currentPage + 1
            }`
          )
          this.clients = clients
        }
      }

      if (action === 'previous') {
        if (this.clients.currentPage > 1) {
          const clients = await this.$axios.$get(
            `/clients/paginate?limit=${this.itemsPerPage}&page=${
              this.clients.currentPage - 1
            }`
          )
          this.clients = clients
        }
      }
    },
    async changeItemsPerPage(items) {
      this.itemsPerPage = items
      const clients = await this.$axios.$get(
        `/clients/paginate?limit=${this.itemsPerPage}&page=${this.clients.currentPage}`
      )
      this.clients = clients
    },
  },
}
</script>
