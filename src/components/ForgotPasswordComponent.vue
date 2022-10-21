<script setup>
import { defineComponent, reactive } from "vue";
import useNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";
import InputEmailComponent from "src/components/InputEmailComponent.vue";
import useSupabase from "src/boot/supabase";


defineComponent({ name: "SignInComponent" });

const router = useRouter();
const { notifyError, notifySuccess } = useNotify();
const form = reactive({ email: "", password: "" });
const { supabase } = useSupabase();

const handleReset = async (email) => {
    router.push({
      name: "forgotPasswordConfirmationPage",
    });
    let { data, error } = await supabase.auth.api.resetPasswordForEmail(email);

  };
</script>

<template lang="pug">
q-form.row.justify-center(@submit.prevent="handleReset(form.email)")
  .col-md-4.col-sm-6.col-xs-10.q-gutter-y-md
    InputEmailComponent(v-model="form.email")
    .full-width.q-pt-md
      q-btn.bg-purple-9.full-width(
        label="Reset Password",
        color="white",
        rounded,
        type="submit"
        )
</template>
