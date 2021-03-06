<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-6 is-offset-3">
            <h1 class="title">Register an Account</h1>
            <form class="box" @submit.prevent="register">
              <label class="label">Username</label>
              <p class="control">
                <input v-model="registerForm.username" @keyup="checkUsernameDebounced" class="input" type="text" placeholder="Luffy" />
              </p>
              <p v-show="isUsernameVisible && isUsernameAvailable" class="help is-success">This username is available</p>
              <p v-show="isUsernameVisible && !isUsernameAvailable" class="help is-danger">This username is not available</p>
              <label class="label">Email</label>
              <p class="control">
                <input v-model="registerForm.email" @keyup="checkEmailDebounced" class="input" type="text" placeholder="luffy@onepiece.com" />
              </p>
              <p v-show="isEmailVisible && isEmailAvailable" class="help is-success">This email is available</p>
              <p v-show="isEmailVisible && !isEmailAvailable" class="help is-danger">This email is not available</p>
              <hr />
              <label class="label">Password</label>
              <p class="control">
                <input v-model="registerForm.password" class="input" type="password" placeholder="●●●●●●●" />
              </p>
              <label class="label">Confirm Password</label>
              <p class="control">
                <input v-model="registerForm.confirmPassword" @keyup="passwordsMatch" class="input" type="password" placeholder="●●●●●●●" />
              </p>
              <p v-show="!doPasswordsMatch" class="help is-danger">The passwords does not match</p>
              <hr />
              <p class="control">
                <button class="button is-default">Cancel</button>
                <button class="button is-pulled-right">Register</button>
              </p>
            </form>
            <p class="links has-text-centered">
              <router-link :to="{ name: 'login' }">Login </router-link>|
              <a href="#">Need help?</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mapState, mapGetters } from 'vuex';
import UserModule, { IUserState, IAccountState } from '@/app/account/store';
import { Register as RegisterForm } from '@/models/account';
import Helper from '@/utils/helper';
import { AccountService } from '@/services';
import { debounce } from 'debounce';

// TODO: Use this for the error messages.
// TODO: Add option for value is not an email (that includes empty string or spaces)
enum ErrorCode {
  PasswordTooShort,
  PasswordRequiresNonAlphanumeric,
  PasswordRequiresDigit,
  PasswordRequiresUpper,
}

// TODO: Apply the same rules as the backend is applying for the username/email
@Component({
  computed: {
    ...mapState('User', ['account']),
    ...mapGetters('User', ['isAuthenticated']),
  },
})
export default class Register extends Vue {
  private registerForm = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  } as RegisterForm;

  private account!: IAccountState;
  private isAuthenticated!: boolean;

  private isUsernameVisible = false;
  private isUsernameAvailable = false;
  private checkUsernameDebounced = debounce(this.checkUsername, 500);

  private isEmailVisible = false;
  private isEmailAvailable = false;
  private checkEmailDebounced = debounce(this.checkEmail, 500);

  private doPasswordsMatch = true;

  private created() {
    if (this.isAuthenticated) {
      this.$router.push({ name: 'home' });
    }
  }

  private passwordsMatch() {
    this.doPasswordsMatch = this.registerForm.password === this.registerForm.confirmPassword;
  }

  private async register() {
    await UserModule.Register(this.registerForm)
      .then(async (value) => {
        await UserModule.LoadUser();

        Helper.Cookie.Create(Helper.Cookie.ACCOUNTSTATECOOKIE, this.account);

        this.$router.push({ name: 'home' });
      })
      .catch((reason) => {
        // fill errors.
      });
  }

  private async checkEmail() {
    const email = this.registerForm.email.trim();

    if (email === '') {
      // TODO: Update error message with value is not an email
      this.isEmailAvailable = false;
      this.isEmailVisible = true;
      return;
    }

    this.isEmailAvailable = await AccountService.IsEmailAvailable(email);
    this.isEmailVisible = true;
  }

  private async checkUsername() {
    const username = this.registerForm.username.trim();

    if (username === '') {
      // TODO: Update error message with value cannot be empty string
      this.isUsernameAvailable = false;
      this.isUsernameVisible = true;
      return;
    }

    this.isUsernameAvailable = await AccountService.IsUsernameAvailable(username);
    this.isUsernameVisible = true;
  }
}
</script>

<style lang='scss' scoped>
.hero {
  @include themed() {
    background-image: t($background-gradient);
  }
}

.title {
  @include themed() {
    color: findColorInvert(t($background));
  }
}

.box {
  @include themed() {
    background-color: t($background);
  }

  .label {
    @include themed() {
      color: findColorInvert(t($background));
    }
  }
}

.input {
  @include themed() {
    background-color: t($background-header-bis);
    color: findColorInvert(t($background-header-bis));
  }

  &::placeholder {
    @include themed() {
      color: findColorInvert(t($background-header-bis));
    }
  }
}

.control {
  margin-bottom: 0.5em;
}

.links {
  a:hover {
    @include themed() {
      color: t($primary);
    }
  }
}
</style>
