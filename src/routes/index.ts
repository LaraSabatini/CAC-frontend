const routes = {
  pricing: {
    name: "/pricing",
    queries: {},
  },
  login: {
    name: "/login",
    queries: {
      client: "client=true",
      admin: "admin=true",
      resetPassword: "reset-password=true",
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
    queries: {},
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
}

export default routes
