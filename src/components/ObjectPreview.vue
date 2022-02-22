<template>
  <div class="container" v-if="itemData !== null && currentTooltipRank !== null" >
    <div class="image">
      <img v-if="itemData.results.bindings[0].image !== undefined" :src='itemData.results.bindings[0].image.value' width="160"  alt="Wikidata best image">
      <div v-else>No image available</div>
    </div>
    <div class="info">
      <p class="tag">{{ this.currentTag }}</p>
      <p class="label">{{ itemData.results.bindings[0].itemLabel.value ?? "no label available" }}</p>
      <p class="description">{{ getItemDescription(itemData.results.bindings[0]) }}</p>
    </div>
  </div>
</template>

<script>
import query from '@/assets/query.txt'
import axios from 'axios'
import debounce from 'lodash.debounce'
import { store } from '@/store'

export default {
  name: 'ObjectPreview',
  props: {
    jsonData: Object,
    currentTooltipRank: Number
  },
  data () {
    return {
      store,
      itemData: null,
      currentTag: ''
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
      if (currentValue !== null) {
        this.getInformationFromQTag(currentValue)
      }
    }, 500)
  },
  methods: {
    getValueFromJson (rank) {
      const item = this.jsonData.Samples.find(item => item[1] === rank)
      if (item === undefined) {
        return null
      } else {
        return item[0]
      }
    },
    getInformationFromQTag (qTag) {
      const endPoint = 'https://query.wikidata.org/sparql?query='
      const url = endPoint + query.replace('QTAG', qTag) + '&format=json'
      axios
        .get(encodeURI(url))
        .then(response => {
          this.itemData = response.data
          store.currentLink = response.data.results.bindings[0].item.value
        })
        .catch(error => console.log(error))
      this.currentTag = qTag
    },
    getItemDescription (item) {
      if (item.itemDescription !== undefined) {
        return item.itemDescription.value
      } else {
        return 'No description available'
      }
    }
  },
  beforeUnmount () {
    this.debouncedWatch.cancel()
  }
}
</script>

<style scoped>

.container {
  border: 1px solid grey;
  border-radius: 8px;
  display: flex;
  align-content: space-between;
  width: 400px;
}

.image {
  min-width: 160px;
  max-height: 150px;
  aspect-ratio: auto;
  padding: 16px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.info {
  padding: 16px 16px 16px 0;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  text-align: left;
}

img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.info p {
  margin: 0 0 5px 0;
  text-overflow: fade;
}

.tag {
  font-size: 0.8em;
}

.label {
  font-size: 1em;
  font-weight: bold;
}

.description {
  font-size: 1em;
  text-wrap: normal;
}

</style>
