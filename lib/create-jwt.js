const jwt = require('jsonwebtoken')
const uuid = require('uuid/v1')
const cleanCert = cert => [ cert.replace(/(-----(BEGIN|END) (CERTIFICATE|PRIVATE KEY)-----|\n)/g, '').replace(/\n/g, '') ]

module.exports = options => {
  if (!options) {
    throw Error('Missing required input: options')
  }
  if (!options.cert) {
    throw Error('Missing required input: options.cert')
  }
  if (!options.privateKey) {
    throw Error('Missing required input: options.privateKey')
  }
  if (!options.audience) {
    throw Error('Missing required input: options.audience')
  }
  if (!options.algorithm) {
    throw Error('Missing required input: options.algorithm')
  }
  if (!options.issuer) {
    throw Error('Missing required input: options.issuer')
  }

  const jwtOptions = {
    audience: options.audience,
    algorithm: options.algorithm,
    issuer: options.issuer,
    expiresIn: 120,
    header: {
      x5c: cleanCert(options.cert)
    }
  }

  const payload = {
    scope: options.scope,
    jti: uuid()
  }

  try {
    const token = jwt.sign(payload, { key: options.privateKey, passphrase: options.privateKeyPassphrase }, jwtOptions)
    /* Uncomment to debug jwt
      console.log(jwt.decode(token, {complete: true}))
    */
    return token
  } catch (error) {
    throw error
  }
}
