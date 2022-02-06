
import { extend } from 'vee-validate'
import { required, email, min, max, confirmed } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'این فیلد نباید خالی باشد'
})

extend('email', {
  ...email,
  message: 'ایمیل به درستی وارد نشده است'
})

extend('min', {
  ...min,
  message: 'تعداد کاراکتر ها کمتر از حد مجاز'
})

extend('confirmed', {
  ...confirmed,
  message: 'پسورد ها یکسان نیست'
})

extend('max', {
  ...max,
  message: 'تعداد کاراکتر ها بیشتر از حد کجاز'
})

extend('pass', (value) => {
  if (value.length < 8) {
    return 'حداقل تعداد کاراکتر 8 '
  }
  if (value.indexOf('part') === -1) {
    return 'باید از کلمه پارت استفاده شود'
  }
  const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})')
  if (!strongRegex.test(value)) {
    return 'علائم خاص ، عدد و حروف کوچک و بزرگ'
  }
  return strongRegex.test(value)
})

extend('nationalCode', (value) => {
  if (value.length < 10) {
    return 'حداقل تعداد کاراکتر 10 '
  }
  if (value.length !== 10 || /(\d)(\1){9}/.test(value)) return 'کد ملی صحیح نیست'

  let sum = 0
  const chars = value.split('')

  for (var i = 0; i < 9; i++) sum += +chars[i] * (10 - i)

  const remainder = sum % 11
  const lastDigit = remainder < 2 ? remainder : 11 - remainder
  if (+chars[9] !== lastDigit) {
    return 'کد ملی صحیح نیست'
  }
  return +chars[9] === lastDigit
})

// ^[a-zA-Z0-9_]*$

extend('username', (value) => {
  const usernameRegex = new RegExp('^[a-zA-Z0-9_]*$')
  if (!usernameRegex.test(value)) {
    return 'عدد و حروف انگلیسی مجاز است'
  }
  return usernameRegex.test(value)
})

extend('phone', (value) => {
  const strongRegex = new RegExp('^(0|\\+98|98|\\+|0098)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}$')
  if (!strongRegex.test(value)) {
    return 'شماره تلفن به درستی وارد نشده است'
  }
  return strongRegex.test(value)
})
