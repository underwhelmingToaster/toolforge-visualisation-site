<template>
  <div class="container">
    <div>
      <DistributionViewer :json-data=jsonData :x-log=true :y-log=true />
    </div>
    <div>
      <Map class="Map"/>
    </div>
  </div>

</template>

<script>
import Map from '@/components/Map'
import DistributionViewer from '@/components/DistributionGraph'
import jsonData from '../assets/osmviews-stats.json'

export default {
  name: 'OSMViewsContent',
  components: {
    Map,
    DistributionViewer
  },
  data () {
    return {
      jsonData: jsonData,
      graphWidth: 0,
      graphHeight: 0
    }
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
        return windowHeight * 0.6
      }
    },
    calculateGraphWidth (windowHeight, windowWidth) {
      if (windowWidth < 800) {
        return 400
      } else {
        return windowWidth * 0.4
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

.Map {
  width: 300px;
  height: 100px;
}

.container {
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}
</style>
