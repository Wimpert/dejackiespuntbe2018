Vue.<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import MatchList from './MatchList.vue'
import GroupRank from './GroupRank.vue'

export default Vue.extend({
    name:'Group',
    components:{
        MatchList, GroupRank
    },
    data(){
        return{
            group:undefined
        }
    },
    mounted(){
        axios
            .get(`${process.env.VUE_APP_API_BASE_URL}/group/${this.$route.params.id}`,
                {withCredentials:true}
            )
            .then(response => 
                {
                    this.group = response.data
                }
                )
    }

})
</script>
<template>
<div v-if="group && group.teams">
    <div>Group {{group.name}}:</div>
    <group-rank v-bind:teams="group.teams"></group-rank>
    <match-list v-bind:matches="group.matches"></match-list>
</div>
</template>

