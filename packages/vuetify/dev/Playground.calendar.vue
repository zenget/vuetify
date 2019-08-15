<template>
  <v-container>
    <v-card>
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>{{ currentMonth }}</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn text @click="$refs.calendar.prev()"><v-icon left>mdi-arrow-left</v-icon> Previous month</v-btn>
          <v-divider vertical />
          <v-btn text @click="$refs.calendar.next()">Next month <v-icon right>mdi-arrow-right</v-icon></v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-card-text class="pa-0">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :event-margin-bottom="6"
          :now="today"
          :type="type"
        ></v-calendar>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    focus: (new Date()).toISOString().substr(0, 10),
    today: (new Date()).toISOString().substr(0, 10),
    events: [],
    type: 'month',
  }),
  computed: {
    currentMonth () {
      return new Date(this.focus).toLocaleDateString('en', {
        month: 'long',
        year: 'numeric',
      });
    },
  },
  methods: {
    getEventColor (event) {
      let color;
      if (event.type === 'release') {
        color = 'success';
      } else if (event.type === 'merge') {
        color = 'grey';
      } else if (event.type === 'freeze') {
        color = 'error';
      }
      if (event.branch === 'master') {
        color += ' lighten-1'
      } else if (event.branch === 'next') {
        color += ' darken-1'
      }
      return color
    },
    substractFromDate (date, days) {
      const dateObject = new Date(date)
      dateObject.setDate(dateObject.getDate() - days)
      return dateObject.toISOString().substr(0, 10)
    },
    generateMasterEvents (version, deadline) {
      return [{
        name: `${version} - release`,
        start: deadline,
        branch: 'master',
        type: 'release',
      }, {
        name: `${version} - PR deadline`,
        start: this.substractFromDate(deadline, 4),
        branch: 'master',
        type: 'freeze',
      }]
    },
    generateDevEvents (version, deadline) {
      return [{
        name: `${version} - major feature freeze`,
        start: this.substractFromDate(deadline, 15),
        branch: 'dev',
        type: 'freeze',
      }, {
        name: `${version}-beta - release`,
        start: this.substractFromDate(deadline, 14),
        branch: 'dev',
        type: 'release',
      }, {
        name: `${version} - minor feature freeze`,
        start: this.substractFromDate(deadline, 11),
        branch: 'dev',
        type: 'freeze',
      }, {
        name: `${version}-RC - release`,
        start: this.substractFromDate(deadline, 7),
        branch: 'dev',
        type: 'release',
      }, {
        name: `${version} - PR deadline`,
        start: this.substractFromDate(deadline, 4),
        branch: 'dev',
        type: 'freeze',
      }, {
        name: `${version} - release`,
        start: deadline,
        branch: 'dev',
        type: 'release',
      }]
    },
  },
  mounted () {
    this.events = [
      ...this.generateMasterEvents('2.0.5', '2019-08-06'),
      ...this.generateMasterEvents('2.0.6', '2019-08-13'),
      ...this.generateMasterEvents('2.0.7', '2019-08-20'),
      ...this.generateMasterEvents('2.0.8', '2019-08-27'),
      ...this.generateDevEvents('2.1.0', '2019-09-03'),
    ];
  }
}
</script>
