<template>
  <div class="media-summary">
    <h5 class="is-size-5 is-5 has-text-weight-semibold">
      <span>Details:</span>
    </h5>
    <div>
      <ul>
        <li v-if="anime.episodes">
          <strong class="has-text-weight-bold">Episodes: </strong>
          <span>{{ anime.episodes.length }}</span>
        </li>
        <li>
          <strong class="has-text-weight-bold">Status: </strong>
          <span>{{ anime.status }}</span>
        </li>
        <li>
          <strong class="has-text-weight-bold">Aired: </strong>
          <span>{{ anime.startDate | DateFull }}</span>
        </li>
        <li>
          <strong class="has-text-weight-bold">Season: </strong>
          <span>{{ anime.season }}</span>
        </li>
        <li class="links">
          <strong class="has-text-weight-bold">Links: </strong>
          <a :href="`https://kitsu.io/anime/${anime.slug}`" target="_blank">
            <img class="kitsuLogo" :src="kitsuLogo" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Anime } from '@/models';
import { DateFull } from '@/utils/filter';
import { mapState } from 'vuex';

@Component({
  filters: { DateFull },
  computed: mapState('Anime', ['anime']),
})
export default class Info extends Vue {
  private get kitsuLogo() {
    return require('@/assets/kitsu.png');
  }
}
</script>

<style lang='scss' scoped>
.media-summary {
  margin-top: 20px;
  padding: 20px;
  border-radius: 3px;
  @include themed() {
    border: 1px solid t($primary);
  }

  h5 {
    display: flex;
    justify-content: center;
    position: relative;
    top: -37px;

    span {
      padding: 0 10px;
      font-family: $font-asap-condensed;
      @include themed() {
        color: t($primary);
        background-color: t($background);
      }
    }
  }

  div {
    position: relative;
    margin-top: -35px;

    strong {
      @include themed() {
        color: t($primary);
      }

      + span {
        @include themed() {
          color: findColorInvert(t($background));
        }
      }
    }

    .links {
      display: flex;
      align-items: center;

      .kitsuLogo {
        height: 30px;
        width: 30px;
      }
    }
  }
}
</style>
