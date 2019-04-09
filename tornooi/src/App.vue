<template>
  <div id="app">
    <router-view :key="$route.fullPath" id="content"></router-view>
    <md-bottom-bar id="bottom-bar" md-active-item="wrong-value" :md-sync-route="false">
      <md-bottom-bar-item id="team" v-bind:class="{ activeBottonBarItem: activeRoute === 'team' }" :to="teamLink" md-label="Mijn Ploeg" md-icon="favorite"></md-bottom-bar-item>
      <md-bottom-bar-item id="group" v-bind:class="{ activeBottonBarItem: activeRoute === 'group' }" :to="{path:'/group'}" md-label="Groupen" md-icon="list"></md-bottom-bar-item>
      <md-bottom-bar-item id="round" v-bind:class="{ activeBottonBarItem: activeRoute === 'round' }" to="/round" md-label="Rondes" md-icon="access_time"></md-bottom-bar-item>
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
    activeRoute:'team'
  }  
  },
  watch:{
    $route: function(){
      if(this.$route.name){
        this.activeRoute = this.$route.name;
        const teamId = this.$route.params.id ? this.$route.params.id.toString() : '-99';
        if(this.activeRoute === 'team' && teamId !== window.localStorage.getItem(process.env.VUE_APP_LOCALSTORAGE_TEAM_ID_KEY_NAME) ){
          this.activeRoute = undefined
        }
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

#bottom-bar > div{
  justify-content: center;
}

.activeBottonBarItem{
  background-color: rgb(122, 157, 168);
}
</style>
