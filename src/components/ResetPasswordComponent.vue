<script setup>
import { defineComponent, reactive } from "vue";
import useNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";
import useSupabase from "src/boot/supabase";
import InputPasswordComponent from "src/components/InputPasswordComponent.vue";
import useAuthUser from "src/composables/UseAuthUser";

defineComponent({ name: "SignInComponent" });

const router = useRouter();
const { notifyError, notifySuccess } = useNotify();
const form = reactive({ firstPassword: "", secondPassword: ""});
const { supabase } = useSupabase();
const { isSignedIn } = useAuthUser();

// To block unlogged users from accessing the page
if(!isSignedIn.value){
  router.push({
      name: "home",
    });
}

const handleReset = async (value) => {
    if(form.firstPassword != form.secondPassword){
      notifyError("Passwords did not match")
      return;
    }
    if(form.secondPassword.length < 6){
      notifyError("Password must be at least 6 characters")
      return;
    }
    router.push({
      name: "home",
    });
    const { user, error } = await supabase.auth.update({
      password: value,
    })
    notifySuccess("Password updated successfully.")
  };
</script>

<template lang="pug">
q-form.row.justify-center(@submit.prevent="handleReset(form.secondPassword)")
  .col-md-4.col-sm-6.col-xs-10.q-gutter-y-md
    .col
      .text-h5.text-purple-9 Reset your password
      hr
    .col
      InputPasswordComponent(v-model="form.firstPassword" label="Enter new password")
    .col
      InputPasswordComponent(v-model="form.secondPassword" label="Enter new password again")
    .full-width.q-pt-md
      q-btn.bg-purple-9.full-width(
        label="Reset Password",
        color="white",
        rounded,
        type="submit"
        )
</template>
