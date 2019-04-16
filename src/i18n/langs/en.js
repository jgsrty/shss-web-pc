import enLocale from "element-ui/lib/locale/lang/en";
const en = {
  header: {
    logo: "Logo",
    router: {
      index: "Index",
      about: "About"
    }
  },
  user: {
    login: "Sign in",
    register: "Sign up",
    hasCount: "Already have an account?",
    noCount: "New user?",
    logOut: "Sign out",
    logSucc: "Sign in Success",
    place: {
      userName: "Please enter a user name",
      passWord: "Please enter your password",
      passWordAgain: "Please enter your password again",
      passNotMatch: "The two passwords do not match"
    }
  },
  code: {
    error: "error"
  },
  ...enLocale
};
export default en;
