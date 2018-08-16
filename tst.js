(async () => {
  const { readFileSync } = require('fs')
  const openIdClient = require('./index')

  const clientOptions = {
    url: 'https://oidc-ver1.difi.no/',
    cert: readFileSync('./data/public.pem', 'utf-8'),
    privateKey: readFileSync('./data/private.key', 'utf-8'),
    /* privateKeyPassphrase: 'password', // uncomment if privateKey is encrypted */
    issuer: 'Din-id',
    scope: 'global/kontaktinformasjon.read'
  }

  try {
    const client = await openIdClient(clientOptions)
    const { token: { access_token: token } } = client.getConfig()
    const payload = { personidentifikatorer: [ '26118645145' ] }
    const data = await client.getData({ url: clientOptions.url + 'kontaktinfo-oauth2-server/rest/v1/personer', token, payload })
    console.log(JSON.stringify(data, null, 2))
  } catch (error) {
    console.error(error)
  }
})()
