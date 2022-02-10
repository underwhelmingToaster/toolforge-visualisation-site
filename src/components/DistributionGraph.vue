<template>
  {{ jsonData }}
</template>

<script>
import axios from 'axios'

export default {
  name: 'QRank-content',
  methods: {
    getJsonData (fileUrl) {
      axios.get(fileUrl).then(response => (this.jsonData = response.data))
      console.log('loaded')
    }
  },
  mounted () {
    this.getJsonData('https://qrank.wmcloud.org/download/osmviews-stats.json')
  },
  props: {
    fileUrl: String
  },
  data () {
    return {
      jsonData: []
    }
  }
}
</script>

<style scoped>

</style>
