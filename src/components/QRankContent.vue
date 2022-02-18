<template>
  <div class="container">
    <DistributionGraph
      :json-data=jsonData
      :y-log=true
      :height=graphHeight
      :width=graphWidth
      :key="'Graph QRank ' + graphWidth + '/' + graphHeight"
      v-if="jsonData !== ''"
    />
    <p v-else>Could not get QRank data.</p>
  </div>
</template>

<script>
import DistributionGraph from '@/components/DistributionGraph'

export default {
  name: 'QRank-content',
  props: {
    jsonData: String
  },
  data () {
    return {
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
      if (windowHeight < 500) {
        return (500 - 100) * 0.8
      } else {
        return (windowHeight - 100) * 0.8
      }
    },
    calculateGraphWidth (windowHeight, windowWidth) {
      if (windowWidth < 800) {
        return 800 * 0.8
      } else {
        return windowWidth * 0.8
      }
    }
  },
  mounted () {
    this.graphHeight = this.calculateGraphHeight(window.innerHeight, window.innerWidth)
    this.graphWidth = this.calculateGraphWidth(window.innerHeight, window.innerWidth)
  },
  created () {
    window.addEventListener('resize', this.resizeHandler)
  }

}
</script>

<style scoped>

.container {
  display: flex;
  justify-content: center;
}

</style>
