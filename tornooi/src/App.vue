<template>
  <div id="app">
    <router-view :key="$route.fullPath" id="content"></router-view>
    <md-bottom-bar id="bottom-bar" md-sync-route md-type="fixed">
      <md-bottom-bar-item to="/" md-label="Tornooi" md-icon="home"></md-bottom-bar-item>
      <md-bottom-bar-item :to="teamLink" md-label="Mijn Ploeg" md-icon="favorite"></md-bottom-bar-item>
      <md-bottom-bar-item to="/bar" md-label="Alle Matchen" md-icon="access_time"></md-bottom-bar-item>
    </md-bottom-bar>
  </div>
</template>

<script>

export default {
  name: 'app',
  data: function (){ 
    return {
    get teamLink(){
      return `/team${window.localStorage.getItem(process.env.VUE_APP_LOCALSTORAGE_TEAM_ID_KEY_NAME)?'/'+window.localStorage.getItem(process.env.VUE_APP_LOCALSTORAGE_TEAM_ID_KEY_NAME):''}`
    } 
  }
    
  }
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
  width: 100%;
  overflow: scroll;
  margin-bottom: 56px;
}
#content{
  flex-grow: 1;
  width: 100%;
}
#bottom-bar{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: lightblue;
  border-top: 1px solid darkslategray;
  z-index: 200;
}
#bottom-bar > div{
  justify-content: center;
}
</style>
