# Help, Account, and Onboarding

## Objective

Make the public prototype self-explanatory and validate safe account/onboarding experiences for drivers, parking providers, and operators without collecting real financial or identity data.

## Reference boundaries

- Use public EasyPark Spain navigation and onboarding concepts only as product-pattern research.
- Do not copy proprietary wording, images, icons, brand assets, or trade dress.
- Source patterns observed: short mobile onboarding, phone verification, vehicle registration, payment method setup, session control, history/receipts, and business account administration.
- Official references:
  - https://www.easypark.com/es-es
  - https://www.easypark.com/es-es/ayuda/empieza-a-aparcar-con-easypark/configuracion-de-la-cuenta-como-crear-tu-cuenta--26776175036572

## Constraints

- Spanish-first mobile prototype.
- No backend, SMS, payment processor, or banking integration.
- Never request or persist real PAN, CVV, bank account, tax, or identity credentials.
- Use preset fictitious payment/payout options and clearly marked sample commercial data.
- Persist only mock profile/preferences/display metadata in localStorage.
- Preserve guided role flows, Copilot, stable red reference labels, and deterministic transaction boundaries.

## Tasks

### T001 — Add project help center

- [x] Explain the project, user roles, supply types, Copilot boundary, guided flows, prototype limitations, and reference-label feedback process.
- [x] Add practical help topics for search, reservation, payment/receipt, active sessions, provider publication, and operator review.

Evidence: six `HELP-*` screens cover project purpose, roles, private/traditional/street supply, manual/Copilot paths, deterministic transaction boundaries, public-prototype safety, and Buzz feedback labels.

### T002 — Add safe account configuration

- [x] Add profile/contact and vehicle settings.
- [x] Add preset fictitious driver payment methods.
- [x] Add preset fictitious provider payout accounts.
- [x] Add sample commercial/fiscal fields, notifications, and privacy controls with prominent safety warnings.

Evidence: eight `ACCOUNT-*` screens persist only mock profile/preferences/display metadata. No full PAN, CVV, CBU/CVU/IBAN, real tax credential, password, or secret input exists.

### T003 — Add role-aware onboarding

- [x] Add welcome, role selection, mock verification, profile, vehicle/provider setup, preferences, and completion steps.
- [x] Route completed onboarding into the appropriate driver/provider/operator experience.
- [x] Preserve onboarding completion and safe mock account metadata locally.

Evidence: seven `ONB-*` screens use visible fixed code `2468`; incorrect codes block progression; completion routes conductor accounts to driver and provider-enabled accounts to the provider flow.

### T004 — Verify and publish

- [x] Run whitespace, embedded-script syntax, structural-flow, Spanish UI, secret-pattern, and sensitive-input checks.
- [x] Obtain independent read-only verification.
- [x] Request publication approval, commit, publish, and verify GitHub Pages.

Evidence: user approved publication; `git diff --check`, embedded `node --check`, 21-reference structural assertion, Spanish UI scan, sensitive-input scan, and secret scan passed. Independent verification passed all requested help/account/onboarding behaviors. A focused correction also escaped provider-derived display output before innerHTML; focused re-verification passed. Native RDD review was unavailable because no model is configured for `review-reliability`. Residual risk: static verification only; browser interaction has not been automated. Work-unit commit: `577d818cacd4831f5bf23e10a7d89bdddb50ceb9` (`feat: add help account and onboarding flows`).
