<template lang="pug">
  .block-wrapper
    BaseIcon(
      :fill='block.color'
      v-for='day in durationInDays'
      @click.native='selectActivity(block)'
      @mouseover.native='selectActivity(block)'
    )
</template>

<script>
import { mapSetters } from 'vuex'

export default {
  name: 'LifeBlock',
  props: {
    block: Object
  },
  data () {
    return {
      durationInDays: null
    }
  },
  methods: {
    getStartDate: () => {
      return new Date(this.startDate)
    },
    selectActivity(block) {
      this.$store.dispatch('selectActivity', block)
    }
  },
  beforeMount () {
    const oneDay = 24 * 60 * 60 * 1000
    const endDate = new Date(this.block.endDate)
    const startDate = new Date(this.block.startDate)
    this.durationInDays = Math.round(
      Math.abs((endDate.getTime() - startDate.getTime()) / oneDay)
    )
  }
}
</script>

<style lang="scss" scoped>
.block-wrapper {
  display: inline;
}
</style>
