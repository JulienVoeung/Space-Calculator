<script setup>
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";
import { state } from "src/stores/countersState";

defineComponent({ name: "RoutingTabs" });

const router = useRouter();
const { isSignedIn, signOut, user } = useAuthUser();
const { notifyError, notifySuccess } = useNotify();

const handleSignOut = async () => {
  try {
    const oldUser = await signOut();
    notifySuccess(`Successful sign out as ${oldUser.email}!`);
    console.log(`isSignedIn: ${isSignedIn}`);
    router.push({ name: "home" });
    state.signOutCleaning();
  } catch (error) {
    notifyError(error.message);
  }
};
</script>

<template lang="pug">
q-tabs.text-yellow-2(
  dense,
  no-caps,
  indicator-color="purple-9",
  active-color="deep-orange-7",
  active-bg-color="blue-2"
  )
  .flex.flex-center
    .homebutton
      q-route-tab(label="Home", icon="home", to="/")
    .signupbutton
      q-route-tab(v-if="!isSignedIn", label="Sign Up", icon="app_registration", to="/signUpPage")
    .signinbutton
      q-route-tab(v-if="!isSignedIn", label="Sign In", icon="login", to="/signInPage")
    template(v-if="isSignedIn")

      q-route-tab(label="Sign Out", icon="logout", to="/", @click="handleSignOut")
      q-tab(disable,:label="user.user_metadata.name", icon="person")
</template>
