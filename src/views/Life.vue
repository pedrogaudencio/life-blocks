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
          new Date(a.startDate) - new Date(b.startDate)
        })
        console.log(activities)
        const startYear = activities[0].startDate.slice(-4)
        const startDate = `01/01/${startYear}`
        const endYear = activities[activities.length - 1].startDate.slice(-4)
        const endDate = `12/31/${endYear}`
        if(startDate !== activities[0].startDate) {
          this.blocks.push({
            id: null,
            type: 'empty',
            startDate: startDate,
            endDate: activities[0].startDate,
            weekdaysOnly: false,
            title: '',
            description: '',
            color: '#434343'
          })
        }
        for (let idx = 0; idx < activities.length; idx++) {
          this.blocks.push(activities[idx])
          if(response.data[idx + 1] !== undefined) {
            this.blocks.push({
              id: null,
              type: 'empty',
              startDate: response.data[idx].endDate,
              endDate: response.data[idx + 1].startDate,
              weekdaysOnly: false,
              title: '',
              description: '',
              color: '#434343'
            })
          }
        }
        if(endDate !== activities[activities.length - 1].endDate) {
          this.blocks.push({
            id: null,
            type: 'empty',
            startDate: activities[activities.length - 1].endDate,
            endDate: endDate,
            weekdaysOnly: false,
            title: '',
            description: '',
            color: '#434343'
          })
        }
      }).catch(error => {
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
