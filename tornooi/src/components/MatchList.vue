Vue.<script lang="ts">
import Vue from 'vue'
import Match from './Match.vue'

export default Vue.extend({
    name:'match-list',
     props: {
        matches : Array
    },
    computed:{
        orderedMatches : function (){
            return [ ... this.matches].sort((a,b) => {
                if(a.hour !== b.hour){
                    return a.hour - b.hour;
                } else if(a.minutes !== b.minutes){
                    return a.minutes - b.minutes;
                } else if(a.terrain - b.terrain){
                    return a.terrain - b.terrain;
                }
                return 0;
            });
        }
    },
    components:{
        Match
    }
    
})
</script>
<template>
    <div>
        <div  v-for="(match) in orderedMatches" :key="match.id">
            <match v-bind:match="match"></match>
        </div>
    </div>
</template>
