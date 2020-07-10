<template lang='pug'>
  .wrapper
    .life-header
      SelectedActivityBar
    .life-block(v-for='(block, idx) in blocks' :key='idx')
      LifeBlock(:block='block')
</template>

<script>
import ActivityService from '@/services/ActivityService'
import LifeBlock from '@/components/LifeBlock'
import SelectedActivityBar from '@/components/SelectedActivityBar'

export default {
  name: 'LifeBlocks',
  components: {
    LifeBlock,
    SelectedActivityBar
  },
  data() {
    return {
      blocks: []
    }
  },
  methods: {},
  mounted() {
    this.blocks = this.blocks.sort((a, b) => {
      new Date(a.startDate) - new Date(b.startDate)
    })
    // this.minYear = Number(this.blocks[0].startDate.slice(-4))
  },
  created() {
    ActivityService.getActivities()
      .then((response) => {
        const activities = response.data.sort((a, b) => {
          return new Date(a.startDate) - new Date(b.startDate)
        })
        // refactor in proper way to maintain tidyness
        const startYear = activities[0].startDate.slice(-4)
        const startDate = `01/01/${startYear}`
        const endYear = activities[activities.length - 1].startDate.slice(-4)
        const endDate = `12/31/${endYear}`
        if(startDate !== activities[0].startDate) {
          // adds empty period since the beginning of the year
          let secondStartDate = new Date(activities[0].startDate)
          secondStartDate.setDate(secondStartDate.getDate() - 1)
          this.blocks.push({
            id: null,
            type: 'empty',
            startDate: new Date(startDate),
            endDate: secondStartDate,
            weekdaysOnly: false,
            title: '',
            description: '',
            color: '#434343'
          })
        }
        for (let idx = 0; idx < activities.length; idx++) {
          this.blocks.push({
            ...activities[idx],
            startDate: new Date(activities[idx].startDate),
            endDate: new Date(activities[idx].endDate)
          })
          if(activities[idx + 1] !== undefined) {
            this.blocks.push({
              id: null,
              type: 'empty',
              startDate: new Date(activities[idx].endDate),
              endDate: new Date(activities[idx + 1].startDate),
              weekdaysOnly: false,
              title: '',
              description: '',
              color: '#434343'
            })
          }
        }
        if(endDate !== activities[activities.length - 1].endDate) {
          // adds empty period till the end of the year
          let lastEndDate = new Date(activities[activities.length - 1].endDate)
          lastEndDate.setDate(lastEndDate.getDate() + 1)
          this.blocks.push({
            id: null,
            type: 'empty',
            startDate: lastEndDate,
            endDate: new Date(endDate),
            weekdaysOnly: false,
            title: '',
            description: '',
            color: '#434343'
          })
        }
        console.log(this.blocks[0])
      }).catch(error => {
        console.error(error)
      })
  }
}
</script>

<style scoped>
.wrapper {
  max-width: 100vw;
  overflow: hidden;
}
</style>
