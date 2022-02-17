<template>
  <DistributionGraph :json-data=jsonData :y-log=true :height=graphHeight :width=graphWidth  />
</template>

<script>
import DistributionGraph from '@/components/DistributionGraph'
import jsonData from '../assets/qrank-stats.json'
export default {
  name: 'QRank-content',
  data () {
    return {
      jsonData: jsonData,
      graphWidth: 1000,
      graphHeight: 600
    }
  },
  components: {
    DistributionGraph
  },
  methods: {
    resizeHandler (e) {
      this.graphHeight = window.innerHeight - 400
      this.graphWidth = window.innerWidth - 400
    }
  },
  created () {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted () {
    this.graphHeight = window.innerHeight
    this.graphWidth = window.innerWidth
  }

}
</script>

<style scoped>

</style>
