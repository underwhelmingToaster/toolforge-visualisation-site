<template>
  <DistributionGraph :json-data=jsonData :y-log=true :height=graphHeight :width=graphWidth :key= "graphWidth + '/' + graphHeight" />
</template>

<script>
import DistributionGraph from '@/components/DistributionGraph'
import jsonData from '../assets/qrank-stats.json'
export default {
  name: 'QRank-content',
  data () {
    return {
      jsonData: jsonData,
      graphWidth: 0,
      graphHeight: 0
    }
  },
  components: {
    DistributionGraph
  },
  methods: {
    resizeHandler () {
      this.graphHeight = this.calculateGraphHeight(window.innerHeight, window.innerWidth)
      this.graphWidth = this.calculateGraphWidth(window.innerHeight, window.innerWidth)
    },
    calculateGraphHeight (windowHeight, windowWidth) {
      if (windowWidth < 800) {
        return 300
      } else {
        return windowHeight * 0.7
      }
    },
    calculateGraphWidth (windowHeight, windowWidth) {
      if (windowWidth < 800) {
        return 400
      } else {
        return windowWidth * 0.8
      }
    }
  },
  created () {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted () {
    this.graphHeight = this.calculateGraphHeight(window.innerHeight, window.innerWidth)
    this.graphWidth = this.calculateGraphWidth(window.innerHeight, window.innerWidth)
  }

}
</script>

<style scoped>

</style>
