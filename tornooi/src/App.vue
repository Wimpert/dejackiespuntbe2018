<template>
  <div id="app">
    <router-view :key="$route.fullPath" id="content"></router-view>
    <md-bottom-bar id="bottom-bar" :md-active-item="activeRoute" md-type="fixed">
      <md-bottom-bar-item id="team" :to="teamLink" md-label="Mijn Ploeg" md-icon="favorite"></md-bottom-bar-item>
      <md-bottom-bar-item id="group" :to="{path:'/group'}" md-label="Groupen" md-icon="list"></md-bottom-bar-item>
      <md-bottom-bar-item id="round" to="/round" md-label="Rondes" md-icon="access_time"></md-bottom-bar-item>
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
    },
    activeRoute:undefined
  }  
  },
  watch:{
    $route: function(){
      if(this.$route.name){
        this.activeRoute = this.$route.name
      } else {
        this.activeRoute = undefined;
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
  overflow: auto;
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

.md-bottom-bar.md-theme-default.md-type-fixed .md-bottom-bar-item.md-active .md-icon{
  color: white;
}

.md-bottom-bar.md-type-fixed .md-bottom-bar-item.md-active .md-bottom-bar-label{
  color: white;
}

#bottom-bar > div{
  justify-content: center;
}
</style>
