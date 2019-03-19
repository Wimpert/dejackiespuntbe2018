vue.<script lang="ts">
import Vue from 'vue'
import axios from 'axios'


export default Vue.extend({
    name: 'my-team',
    data () {
        return {info:null}
    },
    mounted () {
    // fetch the data when the view is created and the data is
    // already being observed
      axios
            .get('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then(response => (this.info = response))
    },
    methods: {
       
    }
})
</script>
<template>
    <div>{{info}}</div>
</template>

