<template>
  <Navbar />
  <router-view :key="$route.fullPath"/>
</template>

<script>

import Navbar from "./components/Navbar";

export default {
  name: 'App',
  components: {
    Navbar

  }
}
</script>

<style>

</style>
