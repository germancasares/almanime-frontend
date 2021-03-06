<template>
  <section>
    <div class="container">
      <div class="column is-narrow">
        <h3 class="title">Profile</h3>
      </div>
      <form @submit.prevent="save">
        <div class="avatar is-flex">
          <Avatar v-if="isAvatarEmpty" color="black" :size="200" :username="`${username}`"></Avatar>
          <Avatar v-else :size="200" :src="`${avatarImage}`"></Avatar>
        </div>
        <div class="file-upload is-flex">
          <b-field class="file">
            <b-upload v-model="avatar" @input="onAvatarChanged">
              <span class="button is-medium">
                <b-icon icon="upload" size="is-small"></b-icon>
                <span>Click to upload</span>
              </span>
            </b-upload>
            <span class="file-name" v-if="avatar.size > 0">{{ avatar.name }}</span>
          </b-field>
        </div>
        <div class="save is-flex">
          <button class="button is-medium">Save</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import UserModule, { IUserState } from '@/app/account/store';
import { mapState, mapGetters } from 'vuex';
import Helper from '@/utils/helper';

import Avatar from 'vue-avatar';

@Component({
  components: { Avatar },
  computed: {
    ...mapState('User', ['avatarUrl']),
    ...mapGetters('User', ['username', 'hasAvatar']),
  },
})
export default class Profile extends Vue {
  private avatar: File = new File([''], '');
  private avatarUrl!: URL;
  private hasAvatar!: boolean;
  private avatarPreview = '';

  private onAvatarChanged(file: File) {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target == null) {
        return;
      }
      this.avatarPreview = event.target.result as string;
    };

    reader.readAsDataURL(file);
  }

  private async save() {
    await UserModule.UpdateAvatar(this.avatar);
  }

  private get isAvatarEmpty() {
    return !this.hasAvatar && this.avatarPreview === '';
  }

  private get avatarImage() {
    if (this.avatarPreview !== '') {
      return this.avatarPreview;
    }

    return this.avatarUrl;
  }
}
</script>

<style lang='scss' scoped>
.title {
  @include themed() {
    color: t($title);
  }
}

.avatar {
  justify-content: center;
}

.file-upload {
  padding-top: 10px;
  justify-content: center;
}

.file-name {
  height: 100%;
  display: flex;
}

.save {
  padding-top: 50px;
  padding-bottom: 100px;
  justify-content: flex-end;
}
</style>