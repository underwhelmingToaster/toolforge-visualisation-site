<template>
  <div class="container" v-if="itemData !== null" >
    <div class="image">

    </div>
    <div class="info">
      <h1>{{ itemData.results.bindings[0].itemLabel.value }}</h1>
    </div>
  </div>
  <div v-else class="noData">
    todo
  </div>
</template>

<script>
import query from '@/assets/query.txt'
import axios from 'axios'
import debounce from 'lodash.debounce'

export default {
  name: 'ObjectPreview',
  props: {
    jsonData: Object,
    currentTooltipRank: Number
  },
  data () {
    return {
      itemData: null
    }
  },
  watch: {
    currentTooltipRank (...args) {
      this.debouncedWatch(...args)
    }
  },
  created () {
    this.debouncedWatch = debounce((val, _) => {
      const currentValue = this.getValueFromJson(val)
      this.getInformationFromQTag(currentValue)
    }, 2000)
  },
  methods: {
    getValueFromJson (rank) {
      const item = this.jsonData.Samples.find(item => item[1] === rank)
      return item[0]
    },
    getInformationFromQTag (qTag) {
      const endPoint = 'https://query.wikidata.org/sparql?query='
      const url = endPoint + query.replace('QTAG', qTag) + '&format=json'
      axios
        .get(encodeURI(url))
        .then(response => (this.itemData = response.data))
        .catch(error => console.log(error))
    },
    getInformationFromArray (coords) {

    }
  },
  beforeUnmount () {
    this.debouncedWatch.cancel()
  }
}
</script>

<style scoped>

.noData {
  box-sizing: border-box;
  border: 3px solid black;
  width: 300px;
  height: 100px;
}

</style>
