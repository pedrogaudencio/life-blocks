<template lang='pug'>
  .wrapper
    .life-header
      SelectedEventBar
    .life-block(v-for='(block, idx) in blocks' :key='idx')
      LifeBlock(:block='block')
</template>

<script>
import EventService from '@/services/EventService'
import LifeBlock from '@/components/LifeBlock'
import SelectedEventBar from '@/components/SelectedEventBar'

export default {
  name: 'LifeBlocks',
  components: {
    LifeBlock,
    SelectedEventBar
  },
  data() {
    return {
      blocks: []
    }
  },
  methods: {
    newEmptyBlock(start, end) {
      start = typeof start === Object ? start : new Date(start)
      end = typeof end === Object ? end : new Date(end)

      return {
        id: null,
        type: 'empty',
        startDate: start,
        endDate: end,
        weekdaysOnly: false,
        title: '',
        description: '',
        color: '#434343'
      }
    }
  },
  mounted() {
    this.blocks = this.blocks.sort((a, b) => {
      new Date(a.startDate) - new Date(b.startDate)
    })
  },
  created() {
    EventService.getEvents()
      .then(response => {
        // fetch events
        const events = response.data.sort((a, b) => {
          return new Date(a.startDate) - new Date(b.startDate)
        })

        // TODO: refactor in proper way to maintain tidyness
        const startYear = events[0].startDate.slice(-4)
        const startDate = `01/01/${startYear}`
        const endYear = events[events.length - 1].startDate.slice(-4)
        const endDate = `12/31/${endYear}`

        if (startDate !== events[0].startDate) {
          // adds empty period since the beginning of the year
          let secondStartDate = new Date(events[0].startDate)
          secondStartDate.setDate(secondStartDate.getDate() - 1)
          this.blocks.push(this.newEmptyBlock(startDate, secondStartDate))
        }
        for (let idx = 0; idx < events.length; idx++) {
          this.blocks.push({
            ...events[idx],
            startDate: new Date(events[idx].startDate),
            endDate: new Date(events[idx].endDate)
          })
          if (events[idx + 1] !== undefined) {
            this.blocks.push(
              this.newEmptyBlock(events[idx].endDate, events[idx + 1].startDate))
          }
        }
        if (endDate !== events[events.length - 1].endDate) {
          // adds empty period till the end of the year
          let lastEndDate = new Date(events[events.length - 1].endDate)
          lastEndDate.setDate(lastEndDate.getDate() + 1)
          this.blocks.push(this.newEmptyBlock(lastEndDate, endDate))
        }
      })
      .catch(error => {
        console.error(error)
      })
  }
}
</script>

<style scoped>
.wrapper {
  max-width: 100vw;
}
</style>
