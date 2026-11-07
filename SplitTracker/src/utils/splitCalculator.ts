/**
 * Split Calculator Utility
 *
 * Pure functions for all split methods. Each function returns a map of
 * { userId: amountTheyOwe }. The paidBy user's share is included — callers
 * use this to update group balances (paidBy gets credited, everyone gets debited).
 */

export interface SplitResult {
  splits: Record<string, number>;
  error?: string;
}

/**
 * Equal split: divide total evenly among involved members.
 * Floating point remainder goes to the first member.
 */
export function calculateEqualSplit(
  total: number,
  involvedMembers: string[]
): SplitResult {
  if (involvedMembers.length === 0) {
    return { splits: {}, error: 'At least one member must be involved.' };
  }
  if (total <= 0) {
    return { splits: {}, error: 'Amount must be greater than zero.' };
  }

  const perPerson = Math.floor((total / involvedMembers.length) * 100) / 100;
  const remainder =
    Math.round((total - perPerson * involvedMembers.length) * 100) / 100;

  const splits: Record<string, number> = {};
  involvedMembers.forEach((uid, index) => {
    splits[uid] = index === 0 ? perPerson + remainder : perPerson;
  });

  return { splits };
}

/**
 * Percentage split: each member gets a custom % of the total.
 * percentages must be a map of { userId: percentage } and should sum to 100.
 */
export function calculatePercentageSplit(
  total: number,
  involvedMembers: string[],
  percentages: Record<string, number>
): SplitResult {
  if (involvedMembers.length === 0) {
    return { splits: {}, error: 'At least one member must be involved.' };
  }
  if (total <= 0) {
    return { splits: {}, error: 'Amount must be greater than zero.' };
  }

  const percentageSum = involvedMembers.reduce(
    (sum, uid) => sum + (percentages[uid] ?? 0),
    0
  );

  if (Math.abs(percentageSum - 100) > 0.01) {
    return {
      splits: {},
      error: `Percentages must sum to 100%. Current sum: ${percentageSum.toFixed(1)}%`,
    };
  }

  const splits: Record<string, number> = {};
  involvedMembers.forEach((uid) => {
    const pct = percentages[uid] ?? 0;
    splits[uid] = Math.round((total * pct) / 100 * 100) / 100;
  });

  // Fix rounding drift — assign remainder to first member
  const splitSum = Object.values(splits).reduce((a, b) => a + b, 0);
  const drift = Math.round((total - splitSum) * 100) / 100;
  if (drift !== 0 && involvedMembers[0]) {
    splits[involvedMembers[0]] =
      Math.round((splits[involvedMembers[0]] + drift) * 100) / 100;
  }

  return { splits };
}

/**
 * Manual split: each member gets a custom fixed amount.
 * amounts must be a map of { userId: amount } and should sum to total.
 */
export function calculateManualSplit(
  total: number,
  involvedMembers: string[],
  amounts: Record<string, number>
): SplitResult {
  if (involvedMembers.length === 0) {
    return { splits: {}, error: 'At least one member must be involved.' };
  }
  if (total <= 0) {
    return { splits: {}, error: 'Amount must be greater than zero.' };
  }

  const amountSum = involvedMembers.reduce(
    (sum, uid) => sum + (amounts[uid] ?? 0),
    0
  );

  if (Math.abs(amountSum - total) > 0.01) {
    const diff = Math.round((total - amountSum) * 100) / 100;
    return {
      splits: {},
      error: `Amounts must sum to ${total}. Difference: ${diff > 0 ? '+' : ''}${diff}`,
    };
  }

  const splits: Record<string, number> = {};
  involvedMembers.forEach((uid) => {
    splits[uid] = amounts[uid] ?? 0;
  });

  return { splits };
}
