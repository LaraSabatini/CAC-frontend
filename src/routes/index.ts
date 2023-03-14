const routes = {
  pricing: {
    name: "/pricing",
    queries: {},
  },
  login: {
    name: "/login",
    queries: {
      client: "user=client",
      admin: "user=admin",
      user: "user=",
      resetPassword: "reset_password=true",
      redirected: "redirected=true",
      email: "email=",
      sendEmail: "send_email=",
      password: "pass=",
      restorePassword: "restore_password=",
      success: "success",
      failure: "failure",
    },
  },
  profile: {
    name: "/profile",
    queries: {
      makePayment: "make_payment=true",
      changePassword: "change_password=true",
    },
  },
  dashboard: {
    name: "/dashboard",
    queries: {
      article: "articleId=",
    },
  },
  articles: {
    name: "/article",
    queries: {
      id: "id=",
    },
  },
  error: {
    name: "/error",
    queries: {
      title: "title=",
      type: "type=",
      description: "description=",
      span: "span=",
    },
  },
  payment: {
    name: "/payment",
    queries: {
      preferenceError: "preference_error=true",
    },
  },
  partners: {
    name: "/partners",
    queries: {},
  },
}

export default routes
