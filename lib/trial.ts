const DAY_MS = 24 * 60 * 60 * 1000;

export function isTrialActive(trialEndsAt: number, now = Date.now()): boolean {
  return now <= trialEndsAt;
}

export function trialDaysRemaining(trialEndsAt: number, now = Date.now()): number {
  if (now >= trialEndsAt) return 0;
  return Math.ceil((trialEndsAt - now) / DAY_MS);
}

export function formatTrialBannerMessage(trialEndsAt: number, now = Date.now()): string {
  if (!isTrialActive(trialEndsAt, now)) {
    return "Your trial has ended. Upgrade to keep writing and uploading context.";
  }
  const days = trialDaysRemaining(trialEndsAt, now);
  if (days <= 0) {
    return "Less than a day left on your trial.";
  }
  if (days === 1) {
    return "1 day left on your trial.";
  }
  return `${days} days left on your trial.`;
}
