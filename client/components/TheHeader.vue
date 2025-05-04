<template>
  <div class="w-full flex flex-row bg-sky-400 p-5">
    <h1 class="text-xl mr-6">Product Manager</h1>
    <div class="w-40 p-1">
      <ul class="flex flex-row justify-around">
        <li><nuxt-link to="/">Products</nuxt-link></li>
        <li><nuxt-link to="/clients">Clients</nuxt-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheHeader',
}
</script>

<style></style>
