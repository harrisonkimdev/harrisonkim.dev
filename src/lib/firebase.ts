import { Firestore } from '@google-cloud/firestore'
import { ExternalAccountClient } from 'google-auth-library'
import { getVercelOidcToken } from '@vercel/oidc'

let database: Firestore | undefined

export function getFirestoreDb() {
  const projectId = process.env.FIREBASE_PROJECT_ID
  if (!projectId) throw new Error('FIREBASE_PROJECT_ID is required')
  if (database) return database

  const provider = process.env.FIREBASE_WIF_PROVIDER
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_EMAIL
  if (!process.env.FIRESTORE_EMULATOR_HOST && provider && serviceAccount) {
    const authClient = ExternalAccountClient.fromJSON({
      type: 'external_account',
      audience: `//iam.googleapis.com/${provider}`,
      subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
      token_url: 'https://sts.googleapis.com/v1/token',
      service_account_impersonation_url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${serviceAccount}:generateAccessToken`,
      subject_token_supplier: { getSubjectToken: () => getVercelOidcToken() },
    })
    if (!authClient) throw new Error('Invalid Firebase workload identity configuration')
    database = new Firestore({ projectId, authClient })
  } else {
    // The emulator needs no credentials; local cloud access uses ADC.
    database = new Firestore({ projectId })
  }
  return database
}
