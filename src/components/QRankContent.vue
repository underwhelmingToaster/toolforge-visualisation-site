<template>
  <div class="container" v-if="jsonData !== null">
    <div class="graph">
      <DistributionGraph
        :json-data=jsonData
        :y-log=true
        :height=graphHeight
        :width=graphWidth
        :key="'Graph QRank ' + graphWidth + '/' + graphHeight"
      />
    </div>
    <div class="objectPreview">
      <ObjectPreview :json-data=jsonData :currentTooltipRank=this.store.currentTooltipRank />
    </div>
  </div>
  <p v-else>Could not get QRank data.</p>
</template>

<script>
import DistributionGraph from '@/components/DistributionGraph'
import ObjectPreview from '@/components/ObjectPreview'
import { store } from '@/store'

export default {
  name: 'QRank-content',
  props: {
    jsonData: Object
  },
  data () {
    return {
      store,
      graphWidth: 0,
      graphHeight: 0
    }
  },
  components: {
    DistributionGraph,
    ObjectPreview
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
}

.graph {
  display: flex;
  justify-content: center;
}

.objectPreview {
  display: flex;
  justify-content: center;
}

</style>
