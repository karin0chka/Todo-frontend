import { isEmail } from "validator"

export const rules = {
  required: (val: string): boolean | string => !!val || "Required",
  email: (val: string): boolean | string => (!val.length ? true : isEmail(val)),
  emailMaxLength: (val: string): boolean | string => val?.length < 100,
  nameMinLength: (val: string) => val.length > 2,
  nameMaxLength: (val: string) => val.length < 40,
  strongPasswordCheck: (password: string): boolean | string => {
    const checking = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return checking.test(password) || "Password is too weak"
  },
  comparePasswords: (password: string, repeatPassword: string): boolean | string =>
    password === repeatPassword || "Your password doesn't match",
}

