<template>
  <main>
    <Hero :background="anime.coverImage" :season="anime.season"></Hero>
    <section class="container">
      <div class="columns">
        <div class="column is-narrow is-paddingless">
          <Sidebar></Sidebar>
        </div>
        <div class="column is-paddingless">
          <Crux :title="anime.name" :synopsis="anime.synopsis" :episodes="anime.episodes"></Crux>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Hero } from '@/components';
import Sidebar from './Sidebar.vue';
import Crux from './Crux.vue';
import { mapState } from 'vuex';
import AnimeModule from '@/app/anime/store';

@Component({
  components: {
    Hero,
    Sidebar,
    Crux,
  },
  computed: mapState('Anime', ['anime']),
  beforeRouteLeave: (to, from, next) => {
    AnimeModule.CleanAnime();
    next();
  },
  beforeRouteUpdate: async (to, from, next) => {
    if (to.name === 'anime' && to.params.slug !== '') {
      await AnimeModule.GetAnimeBySlug(to.params.slug).catch(alert);
    }

    next();
  },
})
export default class Anime extends Vue {
  private async created() {
    if (this.$route.params.slug !== null) {
      await AnimeModule.GetAnimeBySlug(this.$route.params.slug).catch(alert);
    }
  }
}
</script>

<style lang='scss' scoped>
.columns {
  margin-top: 0;
}

.column {
  position: relative;
  top: -140px;
}
</style>
