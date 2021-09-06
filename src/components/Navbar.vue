<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
          <a class="navbar-brand" href="#">Catalog Cars</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li :key="link.url" v-for="link in links" class="nav-item">
              <router-link class="nav-link" :to="link.url">
                {{link.title}}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  setup () {
    const links = [
      { title: 'Главная', url: '/', icon: 'payment', exact: true},
      { title: 'Добавить Автомобиль', url: '/addCar' },
    ]

    return { links }
  }
}
</script>

<style scoped>

</style>