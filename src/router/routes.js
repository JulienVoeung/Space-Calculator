const routes = [
  {
    name: "MainLayout",
    path: "/",
    component: () => import("src/layouts/MainLayout.vue"),
    children: [
      {
        name: "home",
        path: "",
        component: () => import("src/pages/IndexPage.vue"),
      },
      {
        name: "signInPage",
        path: "signInPage",
        component: () => import("src/pages/SignInPage.vue"),
      },
      {
        name: "signUpPage",
        path: "signUpPage",
        component: () => import("src/pages/SignUpPage.vue"),
      },
      {
        name: "forgotPasswordPage",
        path: "forgotPasswordPage",
        component: () => import("src/pages/ForgotPasswordPage.vue"),
      },
      {
        name: "forgotPasswordConfirmationPage",
        path: "forgotPasswordConfirmationPage",
        component: () => import("src/pages/ForgotPasswordConfirmation.vue"),
      },
      {
        name: "resetPasswordPage",
        path: "resetPasswordPage",
        component: () => import("src/pages/ResetPasswordPage.vue"),
      },
      {
        name: "emailConfirmationPage",
        path: "emailConfirmationPage/:email",
        props: true,
        component: () => import("src/pages/EmailConfirmationPage.vue"),
      },
      {
        name: "errorPageNotFound",
        path: ":catchAll(.*)*",
        component: () => import("src/pages/ErrorPageNotFound.vue"),
      },
    ],
  },
];
export default routes;
