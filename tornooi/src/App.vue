<template>
  <div id="app">
  <router-view id="content"></router-view>
    <md-bottom-bar id="bottom-bar" md-sync-route md-type="fixed">
      <md-bottom-bar-item to="/" md-label="Tornooi" md-icon="home"></md-bottom-bar-item>
      <md-bottom-bar-item to="/my-team" md-label="Mijn Ploeg" md-icon="favorite"></md-bottom-bar-item>
      <md-bottom-bar-item to="/bar" md-label="Alle Matchen" md-icon="access_time"></md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
#content{
  flex-grow: 1;
}
#bottom-bar > div{
  justify-content: center;
}
</style>
