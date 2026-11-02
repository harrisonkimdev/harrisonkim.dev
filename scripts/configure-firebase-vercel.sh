#!/usr/bin/env bash
# Run only after approval to create the dedicated identity and grant Vercel access.
set -euo pipefail
site_project='harrisonkim-dev'
site_number='928591935958'
site_account="vercel-firestore@${site_project}.iam.gserviceaccount.com"
site_provider="projects/${site_number}/locations/global/workloadIdentityPools/vercel/providers/vercel"
site_team='hhkimmm9s-projects'
site_vercel_project='prj_IpaS2P7ZCfsRJWFqCXzNCXiaCEI9'

if ! gcloud iam service-accounts describe "$site_account" --project="$site_project" >/dev/null 2>&1; then
  gcloud iam service-accounts create vercel-firestore --display-name='Harrison Website Vercel Firestore' --project="$site_project" --quiet
fi
gcloud projects add-iam-policy-binding "$site_project" --member="serviceAccount:${site_account}" --role=roles/datastore.user --condition=None --quiet >/dev/null

if ! gcloud iam workload-identity-pools describe vercel --location=global --project="$site_project" >/dev/null 2>&1; then
  gcloud iam workload-identity-pools create vercel --location=global --display-name='Harrison website Vercel' --project="$site_project" --quiet
fi
if ! gcloud iam workload-identity-pools providers describe vercel --workload-identity-pool=vercel --location=global --project="$site_project" >/dev/null 2>&1; then
  gcloud iam workload-identity-pools providers create-oidc vercel --workload-identity-pool=vercel --location=global --project="$site_project" \
    --issuer-uri="https://oidc.vercel.com/${site_team}" --allowed-audiences="https://vercel.com/${site_team}" \
    --attribute-mapping='google.subject=assertion.sub' \
    --attribute-condition="assertion.sub == 'owner:${site_team}:project:${site_project}:environment:production'" --quiet
fi
for site_environment in production; do
  site_subject="owner:${site_team}:project:${site_project}:environment:${site_environment}"
  gcloud iam service-accounts add-iam-policy-binding "$site_account" --project="$site_project" \
    --role=roles/iam.workloadIdentityUser \
    --member="principal://iam.googleapis.com/projects/${site_number}/locations/global/workloadIdentityPools/vercel/subject/${site_subject}" --quiet >/dev/null
  for site_variable in FIREBASE_PROJECT_ID FIREBASE_WIF_PROVIDER FIREBASE_SERVICE_ACCOUNT_EMAIL; do
    case "$site_variable" in
      FIREBASE_PROJECT_ID) site_value="$site_project" ;;
      FIREBASE_WIF_PROVIDER) site_value="$site_provider" ;;
      FIREBASE_SERVICE_ACCOUNT_EMAIL) site_value="$site_account" ;;
    esac
    printf '%s\n' "$site_value" | VERCEL_TELEMETRY_DISABLED=1 npm exec --yes --package=vercel@65.7.0 -- vercel env add "$site_variable" --environment "$site_environment" --project "$site_vercel_project" --scope "$site_team" --no-sensitive --yes --force
  done
done
printf '%s\n' 'https://www.harrisonkim.dev' | VERCEL_TELEMETRY_DISABLED=1 npm exec --yes --package=vercel@65.7.0 -- vercel env add NEXTAUTH_URL --environment production --project "$site_vercel_project" --scope "$site_team" --no-sensitive --yes --force
