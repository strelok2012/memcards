<template>
  <div class="card-scene" @click="click">
    <div class="card" :class="{ 'card--flipped': isFlipped, 'card--unflip': isUnflip }">
      <div class="card-face card-backing">
      </div>
      <div class="card-face card-front">
        <h1>
          {{ number }}
        </h1>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isFlipped: false,
      isUnflip: false
    }
  },
  props: {
    number: {
      type: Number,
      default: () => 0
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    click () {
      if (this.disabled) {
        return
      }

      if (this.isFlipped) {
        this.toBackdrop()
      } else {
        this.isFlipped = true
      }

      this.$emit('click')
    },
    toBackdrop () {
      this.isUnflip = true
      setTimeout(() => {
        this.isFlipped = false
        this.isUnflip = false
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-scene {
  width: 100%;
  perspective: 600px;
  animation: cardAppear 1.4s forwards;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@keyframes cardAppear {
  0% {
    transform: rotate3d(0,0,1,15deg) translate3d(0,-100vh,0);
  }
  30% {
    transform: rotate3d(0,0,0,0deg) translate3d(0,0,0);
  }
  65% {
    transform: rotate3d(0,0,0,0deg) translate3d(0,0,0) scale3d(1,1,1);
  }
  80% {
    transform: rotate3d(0,0,1,-5deg) scale3d(1.05,1.05,1);
  }
}

.card {
  height: 100%;
  width: 60%;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateY(180deg);
  &.card--flipped {
    animation: cardFlip .275s forwards linear;
  }
  &.card--unflip {
    animation: cardUnFlip .275s forwards linear;
  }
}

@keyframes cardFlip {
  0% {
    transform: rotateZ(0deg) rotateY(180deg);
  }
  50% {
    transform: rotateZ(-10deg) rotateY(90deg);
  }
  100% {
    transform: rotateZ(0deg) rotateY(0deg);
  }

}

@keyframes cardUnFlip {
  0% {
    transform: rotateZ(0deg) rotateY(0deg);
  }
  50% {
    transform: rotateZ(-10deg) rotateY(90deg);
  }
  100% {
    transform: rotateZ(0deg) rotateY(180deg);
  }

}

.card-front {
  background-image: url('../assets/card_front.png');
  background-size: contain;
}

.card-backing {
  background-image: url('../assets/card_back.png');
  background-size: cover;
  transform: rotateY(180deg);
}

.card-face {
  background-size: cover;
  position: absolute;
  backface-visibility: hidden;
  box-shadow: 0 0 3px 2px #4e4e4e;
  height: 100%;
  width: 100%;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
