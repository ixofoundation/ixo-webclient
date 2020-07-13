import Axios from 'axios'

// *** fake the api calls until we get real api ***

const token = 'UQFHlmbzapeX6AhtcEJ9aQ'

export const sendVerificationEmail = async (
  email: string,
): Promise<boolean> => {
  const payload = {
    sid: 'VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    service_sid: 'VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    account_sid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    to: email,
    channel: 'email',
    status: 'pending',
    valid: false,
    date_created: '2015-07-30T20:00:00Z',
    date_updated: '2015-07-30T20:00:00Z',
    lookup: {
      carrier: {
        error_code: null,
        name: 'Carrier Name',
        mobile_country_code: '310',
        mobile_network_code: '150',
        type: 'mobile',
      },
    },
    amount: null,
    payee: null,
    send_code_attempts: [
      {
        time: '2015-07-30T20:00:00Z',
        channel: 'SMS',
        channel_id: null,
      },
    ],
    url:
      'https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Verifications/VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  }

  await Axios.post('https://app.fakejson.com/q', {
    token,
    payload,
  })

  // TODO some proper logic here to check if email sent based on above result
  return true
}

export const verifyEmailOTP = async (
  email: string,
  otp: string,
): Promise<boolean> => {
  const payload = {
    sid: 'VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    service_sid: 'VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    account_sid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    to: email,
    channel: 'email',
    status: 'approved',
    valid: true,
    amount: null,
    payee: null,
    date_created: '2020-01-30T20:00:00Z',
    date_updated: '2020-01-30T20:00:00Z',
  }

  await Axios.post('https://app.fakejson.com/q', {
    token,
    payload,
  })

  // TODO some proper logic here to check if valid
  return otp === '123456'
}
