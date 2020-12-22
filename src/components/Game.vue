<template>
  <div class="game-field">
    <template v-if="solved.length !== field.length">
      <div class="card-cell" v-for="(num, idx) in field" :key="idx">
        <GameCard ref="cards" :number="num" @click="clickNumber(num, idx)" :disabled="checkCardDisabled(idx)" />
      </div>
    </template>
    <template v-else>
      <h1 class="game-win-message">You win!</h1>
    </template>
  </div>
</template>

<script>
import GameCard from '@/components/GameCard.vue'

export default {
  name: 'Game',
  computed: {
    field () {
      return this.$store.state.field
    },
    clicked () {
      return this.$store.state.clicked
    },
    solved () {
      return this.$store.state.solvedIndexes
    },
    freeze () {
      return this.$store.state.freeze
    },
    freezeTime () {
      return this.$store.state.freezeTime
    }
  },
  components: {
    GameCard
  },
  mounted () {
    this.$store.commit('INIT')
  },
  methods: {
    async clickNumber (number, index) {
      const res = await this.$store.dispatch('fieldClick', { number, index })
      if (res === -1) {
        this.$store.commit('FREEZE', true)
        setTimeout(() => {
          this.$refs.cards[this.clicked].toBackdrop()
          this.$refs.cards[index].toBackdrop()
          this.$store.commit('SET_CLICKED', -1)
          this.$store.commit('FREEZE', false)
        }, this.freezeTime * 1000)
      } else if (res === 1) {
        this.$store.commit('SET_CLICKED', -1)
      } else {
        this.$store.commit('SET_CLICKED', index)
      }
    },
    checkCardDisabled (index) {
      if (this.freeze || index === this.clicked || this.solved.includes(index)) {
        return true
      }
      return false
    }
  }
}
</script>

<style scoped>
.card-cell {
  display: flex;
  width: 25%;
  height: 25%;
}

.game-field {
  width: 100%;
  height: 90vh;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.game-win-message {
  color: rgba(0, 255, 0, 0.8);
  font-size: 5rem;
}
</style>
