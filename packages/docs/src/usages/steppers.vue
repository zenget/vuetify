<template>
  <div style="width: 100%">
    <v-stepper
      v-model="e1"
      v-bind="attrs"
    >
      <template v-if="vertical">
        <template v-for="n in steps">
          <v-stepper-step
            :key="`${n}-step`"
            :complete="e1 > n"
            :step="n"
            :editable="editable"
          >
            Step {{ n }}
          </v-stepper-step>

          <v-stepper-content
            :key="`${n}-content`"
            :step="n"
          >
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="100px"
            />

            <v-btn
              color="primary"
              @click="nextStep(n)"
            >
              Continue
            </v-btn>

            <v-btn text>Cancel</v-btn>
          </v-stepper-content>
        </template>
      </template>
      <template v-else>
        <v-stepper-header>
          <template v-for="n in steps">
            <v-stepper-step
              :key="`${n}-step`"
              :complete="e1 > n"
              :step="n"
              :editable="editable"
            >
              Step {{ n }}
            </v-stepper-step>

            <v-divider
              v-if="n !== steps"
              :key="n"
            />
          </template>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content
            v-for="n in steps"
            :key="`${n}-content`"
            :step="n"
          >
            <v-card
              class="mb-12"
              color="grey lighten-1"
              height="100px"
            />

            <v-btn
              color="primary"
              @click="nextStep(n)"
            >
              Continue
            </v-btn>

            <v-btn text>Cancel</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </template>
    </v-stepper>
  </div>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
    data () {
      return {
        e1: 1,
        steps: 3,
        vertical: false,
        altLabels: false,
        editable: true,
      }
    },
    watch: {
      steps (val) {
        if (this.e1 > val) {
          this.e1 = val
        }
      },
      vertical () {
        this.e1 = 2
        requestAnimationFrame(() => this.e1 = 1) // Workarounds
      },
    },

    methods: {
      onInput (val) {
        this.steps = parseInt(val)
      },
      nextStep (n) {
        if (n === this.steps) {
          this.e1 = 1
        } else {
          this.e1 = n + 1
        }
      },
    },
  }
</script>
