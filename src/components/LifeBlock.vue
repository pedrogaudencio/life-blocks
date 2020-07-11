<template lang="pug">
  .block-wrapper
    transition-group(name='block-effect', mode='in-out')
      BaseIcon(
        :fill='block.color'
        v-for='units in duration' :key='Math.random(10000)'
        @click.native='selectEvent(block)'
        @mouseover.native='hoverSelectEvent(block)'
      )
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LifeBlock',
  props: {
    block: Object
  },
  computed: {
    ...mapState(['lifeView']),
    duration () {
      const endDate = new Date(this.block.endDate)
      const startDate = new Date(this.block.startDate)
      const oneDay = 24 * 60 * 60 * 1000
      let unit

      switch (this.lifeView) {
        case 'weeks':
          unit = oneDay * 7
          break
        case 'months':
          unit = oneDay * 30
          break
        case 'years':
          unit = oneDay * 365
          break
        case 'days':
        default:
          unit = oneDay
          break
      }

      return Math.round(
        Math.abs((endDate.getTime() - startDate.getTime()) / unit)
      )
    }
  },
  methods: {
    hoverSelectEvent(block) {
      setTimeout(() => {
        this.$store.dispatch('selectEvent', {
          ...block,
          duration: this.duration
        })
      }, 500)
    },
    selectEvent(block) {
      this.$store.dispatch('selectEvent', {
        ...block,
        duration: this.duration
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.block-wrapper {
  display: inline;
}

// .block-effect {

// }

// .block-effect-enter-active,
// .block-effect-leave-active {
//   transition: transform .5s linear;
// }

// .block-effect-enter,
// .block-effect-leave-to {
//   transform: translate3d(100vw, 34vw, 0);
// }

</style>
