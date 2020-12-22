import Vue from 'vue'
import Vuex from 'vuex'

import { randomElement } from '@/utils'

Vue.use(Vuex)

const FIELD_SIZE = 4

const initialState = {
  field: [],
  clicked: -1,
  solvedIndexes: [],
  freeze: false,
  freezeTime: 2
}

export default new Vuex.Store({
  state: initialState,
  mutations: {
    INIT (state) {
      const field = Array(FIELD_SIZE * FIELD_SIZE).fill(0)
      let currentNumber = 1
      let numberAdded = false
      for (let i = 0; i < FIELD_SIZE * FIELD_SIZE; i++) {
        const freeIndexes = field.map((_, idx) => idx).filter(idx => field[idx] === 0)
        const newIndex = randomElement(freeIndexes)
        field[newIndex] = currentNumber

        if (numberAdded) {
          numberAdded = false
          currentNumber += 1
          continue
        }

        numberAdded = true
      }
      state.field = field
      console.log(field)
    },
    SET_CLICKED (state, index) {
      state.clicked = index
    },
    PUSH_SOLVED (state, index) {
      state.solvedIndexes.push(index)
    },
    FREEZE (state, freeze) {
      state.freeze = freeze
    }
  },
  actions: {
    fieldClick ({ state, commit }, { number, index }) {
      if (state.clicked !== -1) {
        if (state.field[state.clicked] === state.field[index]) {
          /* remember */
          commit('PUSH_SOLVED', state.clicked)
          commit('PUSH_SOLVED', index)
          return 1
        } else {
          /* drop */
          return -1
        }
      } else {
        return 0
      }
    }
  }
})
