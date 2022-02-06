// import {  percent, jobActivity } from '@/common/utility/form-validations';
export default [
  {
    title: 'سوابق شغلی',
    type: 'multiple',
    minItemLength: 0,
    schema: {
      workExperience: {
        jobTitle: {
          mode: 'select',
          label: 'عنوان شغل',
          md: 4,
          value: null,
          options: {
            rules: [],
            items: [
              'بیکار', 'بازنشسته', 'کارگر', 'خانه دار', 'کارمند', 'محصل', 'دانشجوی دانشگاه', 'نظامی', 'پزشک', 'فعال اقتصادی', 'مهندس', 'وکیل', 'پرستار',
              'خدماتی', 'معلم', 'تکنسین فنی', 'راننده', 'مکانیک', 'فروشنده', 'تاجر', 'بهیار', 'استاد دانشگاه', 'کاسب', 'فعال حوزه صنعت', 'تولیدی', 'بازرگانی', 'کشاورزی', 'علمی', 'شغل آزاد', 'سایر'
            ]
          },
        },
        jobActivity: {
          mode: 'text',
          label: ' عنوان محل فعالیت',
          md: 4,
          value: null,
          options: {
            rules: [],
          },
        },
        jobAddress: {
          mode: 'text',
          label: ' آدرس و شماره تماس',
          md: 4,
          value: null,
          options: {
            rules: [],
          },
        },
        jobDurationActivity: {
          mode: 'text',
          label: 'مدت زمان فعالیت',
          md: 4,
          value: null,
          cssClasses: ['small-append-icon'],
          options: {
            // rules: [ jobActivity],
            hint: 'براساس ماه',
            type: 'number',
            min: 0,
            covertToNumber: true,
            appendIcon: 'ماه',
          },
        },
      },
    },
  },
  {
    title: 'وضعیت درآمدی',
    schema: {
      incomeStatus: {
        possibleChanges: {  
          mode: 'money',
          label: 'مجموع درآمدهای اصلی و مستمر سال گذشته',
          md: 6,
          value: null,
          cssClasses: ['small-append-icon'],
          options: {
            rules: [],
            type: 'number',
            options: {
              suffix: 'ریال',
              length: 11,
              precision: 0,
            },
          },
        },
        totalAnnualIncome: {
          mode: 'money',
          label: 'مجموع هزینه های اصلی و مستمر گذشته',
          md: 6,
          value: null,
          cssClasses: ['small-append-icon'],
          options: {
            rules: [],
            type: 'number',
            options: {
              suffix: 'ریال',
              length: 11,
              precision: 0,
            },
          },
        },
        totalAnnualCost: {
          mode: 'money',
          label: 'تغییرات احتمالی در یکسال آینده',
          md: 6,
          value: null,
          cssClasses: ['small-append-icon'],
          options: {
            rules: [],
            type: 'number',
            options: {
              suffix: 'ریال',
              length: 11,
              precision: 0,
            },
          },
        },
      },
    },
  },
  {
    title: 'هدف از سرمایه گذاری',
    schema: {
      thePurposeOfTheInvestment: {
        purposeInvestment: {
          mode: 'radio-group',
          md: 12,
          value: null,
          options: {
            rules: [],
          },
          items: [
            {
              label: 'تامین هزینه های جاری زندگی و پرداخت بدهی',
              value: 'تامین هزینه های جاری زندگی و پرداخت بدهی',
            },
            {
              label: 'حفظ ارزش دارایی',
              value: 'حفظ ارزش دارایی',
            },
            {
              label: 'افزایش ثروت',
              value: 'افزایش ثروت',
            },
            {
              label: 'ارتقای سطح رفاه زندگی',
              value: 'ارتقای سطح رفاه زندگی',
            },
          ],
        },
        comment: {
          mode: 'textarea',
          label: 'برنامه های آتی شما در مورد سرمایه گذاری',
          md: 12,
          value: null,
          cssClasses: ['mt-5'],
          options: {
            rules: [],
            rows: 3,
          },
        },
      },
    },
  },
  {
    title: 'تجربیات سرمایه گذاری',
    type: 'multiple',
    minItemLength: 0,
    schema: {
      investmentExperiences: {
        type: {
          mode: 'text',
          label: 'نوع',
          md: 4,
          value: null,
          options: {
            rules: [],
          },
        },
        amount: {
          mode: 'money',
          label: 'مبلغ',
          md: 4,
          value: null,
          options: {
            rules: [],
            options: {
              suffix: 'ریال',
              length: 11,
              precision: 0,
            },
          },
        },
        duration: {
          mode: 'text',
          label: 'مدت سرمایه',
          md: 4,
          value: null,
          options: {
            rules: [],
          },
        },
        amountOfProfitOrLoss: {
          mode: 'money',
          label: 'مبلغ سود یا ضرر',
          md: 4,
          value: null,
          options: {
            rules: [],
            options: {
              suffix: 'ریال',
              length: 11,
              precision: 0,
            },
          },
        },
        comment: {
          mode: 'select',
          label: 'توصیف شما از سود یا ضرر سرمایه گذاری',
          md: 8,
          value: null,
          options: {
            rules: [],
            items: ['سود زیاد', 'سود کم', 'بدون سود و زیان', 'ضرر کم', 'ضرر زیاد'],
          },
        },
        reasonForLeaving: {
          mode: 'textarea',
          label: 'نوع سرمایه گذاری',
          md: 12,
          value: null,
          options: {
            rules: [],
          },
        },
      },
    },
  },
  // {
  //   title: 'دارایی ها و ترکیب آن ها',
  //   type: 'table',
  //   staticRowsData: [
  //     {
  //       title: 'ساختمان و ملک',
  //     },
  //     {
  //       title: 'خودرو',
  //     },
  //     {
  //       title: 'طلا و ارز',
  //     },
  //     {
  //       title: 'سهام',
  //     },
  //     {
  //       title: 'اوراق با درآمد ثابت',
  //     },
  //     {
  //       title: 'وجه نقد / مطالبات از سایر اشخاص / حساب پسانداز و سپرده بانکی',
  //     },
  //     {
  //       title: 'سایر دارایی ها',
  //     },
  //   ],
  //   schema: {
  //     assetComposition: {
  //       title: {
  //         mode: 'label',
  //         label: 'نوع',
  //         value: null,
  //       },
  //       assetValue: {
  //         mode: 'money',
  //         label: 'ارزش روز دارایی ها',
  //         value: null,
  //         default: 0,
  //         options: {
  //           hideDetails: true,
  //         },
  //       },
  //       percent: {
  //         mode: 'text',
  //         label: 'درصد از کل دارایی ها',
  //         value: null,
  //         default: 0,
  //         options: {
  //           // rules: [percent],
  //           type: 'number',
  //           hideDetails: true,
  //           min: 0,
  //           max: 100,
  //         },
  //       },
  //     },
  //   },
  // },
  {
    title: 'بدهی ها و سررسید آنها',
    type: 'multiple',
    minItemLength: 0,
    schema: {
      debts: {
        title: {
          mode: 'text',
          label: 'عنوان بدهی',
          md: 4,
          value: null,
          options: {
            rules: [],
          },
        },
        amount: {
          mode: 'money',
          label: 'مبلغ بدهی',
          md: 4,
          value: null,
          options: {
            type: 'number',
            rules: [],
            options: {
              suffix: 'ریال',
              length: 11,
              precision: 0,
            },
          }
        },
        date: {
          mode: 'date-picker',
          label: 'تاریخ سر رسید بدهی',
          md: 4,
          value: null,
          options: {
            rules: [],
          },
        },
      },
    },
  },
  {
    title: 'مبلغ و افق سرمایه گذاری',
    schema: {
      investmentAmount: {
        value: {
          mode: 'money',
          label: 'مبلغ سرمایه گذاری مورد نظر در حال حاضر',
          md: 6,
          value: null,
          options: {
            type: 'number',
            rules: [],
            options: {
              suffix: 'ریال',
              length: 11,
              precision: 0,
            },
          },
        },
      },
    },
  },
  {
    title: 'برداشت احتمالی طی یکسال آینده',
    type: 'multiple',
    minItemLength: 0,
    schema: {
      possibleWithdrawal: {
        amount: {
          mode: 'money',
          label: 'مبلغ برداشت',
          md: 4,
          value: null,
          options: {
            type: 'number',
            rules: [],
            options: {
              suffix: 'ریال',
              length: 11,
              precision: 0,
            },
          },
        },
        date: {
          mode: 'date-picker',
          label: 'تاریخ احتمالی برداشت',
          md: 4,
          value: null,
          options: {
            rules: [],
          },
        },
        comment: {
          mode: 'textarea',
          label: 'علت برداشت از سرمایه گذاری',
          md: 12,
          value: null,
          options: {
            rules: [],
          },
        },
      },
    },
  },
  {
    title: 'افزایش سرمایه احتمالی طی یکسال آینده',
    type: 'multiple',
    minItemLength: 0,
    schema: {
      possibleDeposit: {
        amount: {
          mode: 'money',
          label: 'مبلغ سرمایه گذاری',
          md: 4,
          value: null,
          options: {
            type: 'number',
            rules: [],
            options: {
              suffix: 'ریال',
              length: 11,
              precision: 0,
            },
          },
        },
        date: {
          mode: 'date-picker',
          label: 'تاریخ احتمالی سرمایه گذاری',
          md: 4,
          value: null,
          options: {
            rules: [],
          },
        },
        comment: {
          mode: 'textarea',
          label: 'منبع تأمین وجه سرمایه گذاری',
          md: 12,
          value: null,
          options: {
            rules: [],
          },
        },
      },
    },
  },
  {
    title: 'مشخصات افراد تحت تکفل',
    type: 'multiple',
    minItemLength: 0,
    schema: {
      underTutelage: {
        fullName: {
          mode: 'text',
          label: 'نام و نام خانوادگی',
          md: 4,
          value: null,
          options: {
            rules: [],
          },
        },
        relative: {
          mode: 'text',
          label: 'نسبت شخص تحت تکفل',
          md: 4,
          value: null,
          options: {
            rules: [],
          },
        },
        birthDate: {
          mode: 'date-picker',
          label: 'تاریخ تولد ',
          md: 4,
          value: null,
          options: {
            rules: [],
          },
        },
        job: {
          mode: 'text',
          label: 'شغل',
          md: 4,
          value: null,
          options: {
            rules: [],
          },
        },
        income: {
          mode: 'text',
          label: 'متوسط هزینه ماهانه ',
          md: 4,
          value: null,
          options: {
            rules: [],
            type: 'number',
            min: 0,
          },
        },
        cost: {
          mode: 'text',
          label: 'متوسط درآمد ماهانه',
          md: 4,
          value: null,
          options: {
            rules: [],
            type: 'number',
            min: 0,
          },
        },
      },
    },
  },
];