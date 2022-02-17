<template>
  <div class="graph-container">
    <UplotVue
      :data="data"
      :options="opts"
      @create="resize"
      @resize="resize"
    />
  </div>
</template>

<script>

import UplotVue from 'uplot-vue'
import 'uplot/dist/uPlot.min.css'

export default {
  name: 'QRank-content',
  props: {
    jsonData: {
      type: Object,
      required: true
    },
    xLog: {
      type: Boolean,
      default: false
    },
    yLog: {
      type: Boolean,
      default: false
    }
  },
  components: {
    UplotVue
  },
  methods: {
    getJsonData (fileUrl) {
      // axios.get(fileUrl).then(response => (this.jsonData = response.data))
    },
    generateDataSeries () {
      return [
        this.jsonData.Samples.map((item) => {
          return item[1]
        }),
        this.jsonData.Samples.map((item) => {
          return item[2]
        })
      ]
    },
    resize () {
      // TODO resize doesnt work
      this.opts.height = window.innerWidth - 400
      this.opts.width = window.innerHeight - 200
    }
  },
  beforeMount () {
    this.data = this.generateDataSeries()
    if (this.xLog) {
      this.opts.scales.x = 3
    }
    if (this.yLog) {
      this.opts.scales.y.distr = 3
    }
  },
  data () {
    return {
      data: [],
      opts: {
        title: 'View Distribution',
        height: 600,
        width: 1400,
        axes: [
          {
            space: 100
          },
          {
            size: 100,
            grid: {
              show: false
            }
          }
        ],
        scales: {
          y: {
            distr: 1
          },
          x: {
            distr: 1,
            time: false
          }
        },
        series: [
          {
            label: 'Rank'
          },
          {
            label: 'Views',
            points: { show: false },
            stroke: 'blue',
            fill: 'blue'
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.graph-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

</style>
