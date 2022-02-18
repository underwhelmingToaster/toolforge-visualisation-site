<template>
  <UplotVue
    :data="graphData"
    :options="opts"
  />
</template>

<script>

import UplotVue from 'uplot-vue'
import 'uplot/dist/uPlot.min.css'
import { store } from '@/store'

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
    },
    width: {
      type: Number,
      default: 1000
    },
    height: {
      type: Number,
      default: 600
    }
  },
  components: {
    UplotVue
  },
  methods: {
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
    tooltipsPlugin () {
      function init (u, opts) {
        const over = u.over
        u.seriestt = opts.series.map((s, i) => {
          if (i === 0) return
          const tt = document.createElement('div')
          tt.className = 'tooltip'
          tt.textContent = 'Tooltip!'
          tt.style.pointerEvents = 'none'
          tt.style.position = 'absolute'
          tt.style.background = 'rgba(0,0,0,0.1)'
          tt.style.marginTop = '-1.5em'
          tt.style.color = s.color
          tt.style.display = s.show ? null : 'none'
          over.appendChild(tt)
          return tt
        })

        function hideTips () {
          u.seriestt.forEach((tt, i) => {
            if (i === 0) return
            tt.style.display = 'none'
          })
        }

        function showTips () {
          u.seriestt.forEach((tt, i) => {
            if (i === 0) return
            const s = u.series[i]
            tt.style.display = s.show ? null : 'none'
          })
        }

        over.addEventListener('mouseleave', () => {
          if (!u.cursor.lock) {
            hideTips()
          }
        })

        over.addEventListener('mouseenter', () => {
          showTips()
        })

        hideTips()
      }

      function setCursor (u) {
        const { idx } = u.cursor
        u.seriestt.forEach((tt, i) => {
          if (i === 0) return
          const s = u.series[i]
          if (s.show) {
            const xVal = u.data[0][idx]
            const yVal = u.data[i][idx]

            store.currentTooltipRank = xVal
            tt.textContent = '(Rank: ' + xVal + ' / Views: ' + yVal + ')'
            tt.style.left = Math.round(u.valToPos(xVal, 'x')) + 'px'
            tt.style.top = Math.round(u.valToPos(yVal, s.scale)) + 'px'
          }
        })
      }
      return {
        hooks: {
          init,
          setCursor
        }
      }
    }
  },
  beforeMount () {
    this.graphData = this.generateDataSeries()
    if (this.xLog) {
      this.opts.scales.x.distr = 3
    }
    if (this.yLog) {
      this.opts.scales.y.distr = 3
    }
    this.opts.width = this.width
    this.opts.height = this.height
  },
  data () {
    return {
      graphData: [],
      opts: {
        title: 'View Distribution',
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
            points: {
              fill: 'blue',
              show: false
            },
            stroke: 'blue'
          }
        ],
        plugins: [
          this.tooltipsPlugin()
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
