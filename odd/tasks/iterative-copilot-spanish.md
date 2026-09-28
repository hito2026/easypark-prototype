# Iterative Copilot and Spanish Localization

## Objective

Validate a Spanish-first, explainable parking copilot that iteratively derives driver priorities from chat or voice, confirms those deductions, recommends strategic parking options from available supply, and hands the selected option to deterministic reservation and payment flows.

## Constraints

- Prototype-only, with no LLM provider, API key, backend, or remote inference.
- Use deterministic local rules and mock environmental context.
- Deductions must remain visible, editable, and user-confirmed.
- Voice input must gracefully fall back to text and must not store audio.
- The copilot remains advisory and cannot reserve, charge, or author transactional truth.
- Preserve stable red reference labels and payment safety boundaries.

## Tasks

### T001 — Localize the prototype

- [x] Translate all user-facing navigation, driver, provider, operator, payment, receipt, and feedback copy to Spanish.
- [x] Preserve stable reference IDs and technical behavior.

Evidence: targeted English UI scan found no remaining selected English interface strings; all existing stable reference IDs remain present.

### T002 — Add iterative chat and voice assistance

- [x] Add Copilot entry from the driver use-case selection.
- [x] Add chat history, quick-reply chips, text input, microphone control, visible transcription, and speech fallback messaging.
- [x] Derive urgency, multi-stop intent, walking tolerance, coverage, vehicle, and budget preferences with deterministic local rules.
- [x] Show deductions for explicit confirmation or correction.

Evidence: `AI-ENTRY-01`, `AI-CHAT-01`, `AI-VOICE-01`, `AI-CONTEXT-01`, `AI-ITINERARY-01`, and `AI-REFINE-01` are present; voice input/output use browser APIs with visible fallback and no audio persistence; chat text is escaped before HTML rendering.

### T003 — Recommend and hand off a strategy

- [x] Rank available supply into fast, strategic, and economical alternatives.
- [x] Explain tradeoffs, uncertainty, and why each option is recommended.
- [x] Support iterative refinement and a multi-stop guided scenario.
- [x] Hand the chosen reservable option into the existing deterministic payment/reservation flow.

Evidence: `AI-STRATEGY-01`, `AI-EXPLAIN-01`, and `AI-HANDOFF-01` are present; all derived preferences influence selection, explanation, or ordering; guidance-only supply cannot enter payment; published reservable supply hands off at driver detail before deterministic payment.

### T004 — Verify and publish

- [x] Run whitespace, embedded-script syntax, structural-flow, and secret-pattern checks.
- [x] Obtain independent read-only verification.
- [x] Request publication approval, commit, publish, and verify GitHub Pages.

Evidence: user approved publication; `git diff --check`, embedded `node --check`, nine-label structural assertion, Spanish UI scan, and secret scan passed. Independent verification initially found walking tolerance did not affect strategies; correction made it affect option selection, explanation, and ordering, and focused re-verification passed. Native RDD review was unavailable because no model is configured for `review-reliability`. Residual risk: static verification only; browser interaction has not been automated. Work-unit commit: `cb9cda884c7fa7684f448c84db9ad519ec70b545` (`feat: add Spanish iterative parking copilot`).
