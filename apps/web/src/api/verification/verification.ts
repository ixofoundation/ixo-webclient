import Axios from 'axios'

// WIP using fake API

export enum Channel {
  Email = 'email',
  Sms = 'sms',
}

const token = 'UQFHlmbzapeX6AhtcEJ9aQ'

export const sendVerificationNotification = async (to: string, channel: Channel): Promise<boolean> => {
  // const payload = {
  //   sid: 'VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  //   service_sid: 'VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  //   account_sid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  //   to,
  //   channel,
  //   status: 'pending',
  //   valid: false,
  //   date_created: '2015-07-30T20:00:00Z',
  //   date_updated: '2015-07-30T20:00:00Z',
  //   lookup: {
  //     carrier: {
  //       error_code: null,
  //       name: 'Carrier Name',
  //       mobile_country_code: '310',
  //       mobile_network_code: '150',
  //       type: 'mobile',
  //     },
  //   },
  //   amount: null,
  //   payee: null,
  //   send_code_attempts: [
  //     {
  //       time: '2015-07-30T20:00:00Z',
  //       channel: 'SMS',
  //       channel_id: null,
  //     },
  //   ],
  //   url: 'https://verify.twilio.com/v2/Services/VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Verifications/VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  // }

  // await Axios.post('https://app.fakejson.com/q', {
  //   token,
  //   payload,
  // })

  // TODO some proper logic here to check if email sent based on above result
  return true
}

export const verifyOTP = async (to: string, otp: string, channel: Channel): Promise<boolean> => {
  // const payload = {
  //   sid: 'VEXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  //   service_sid: 'VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  //   account_sid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  //   to,
  //   channel,
  //   status: 'approved',
  //   valid: true,
  //   amount: null,
  //   payee: null,
  //   date_created: '2020-01-30T20:00:00Z',
  //   date_updated: '2020-01-30T20:00:00Z',
  // }

  // await Axios.post('https://app.fakejson.com/q', {
  //   token,
  //   payload,
  // })

  // TODO some proper logic here to check if valid
  return otp === '123456'
}
