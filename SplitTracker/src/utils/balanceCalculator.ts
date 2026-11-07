/**
 * Balance Calculator
 *
 * Recalculates group balances from scratch based on all payments and settlements.
 * Called after any write to ensure balances stay consistent.
 *
 * Balance semantics:
 *   positive = this user is owed money by others
 *   negative = this user owes money to others
 */

interface PaymentData {
  paidBy: string;
  splits: Record<string, number>; // userId -> amount they owe (including payer's own share)
}

interface SettlementData {
  fromUserId: string;
  toUserId: string;
  amount: number;
}

export function recalculateBalances(
  memberIds: string[],
  payments: PaymentData[],
  settlements: SettlementData[]
): Record<string, number> {
  // Initialize all members with 0
  const balances: Record<string, number> = {};
  memberIds.forEach((uid) => {
    balances[uid] = 0;
  });

  // Process payments
  for (const payment of payments) {
    const { paidBy, splits } = payment;

    for (const [uid, owedAmount] of Object.entries(splits)) {
      if (!balances.hasOwnProperty(uid)) continue;

      // This user owes `owedAmount` of this payment
      balances[uid] = (balances[uid] ?? 0) - owedAmount;

      // The payer gets credited for covering this person's share
      if (uid !== paidBy) {
        balances[paidBy] = (balances[paidBy] ?? 0) + owedAmount;
      }
    }
  }

  // Process settlements (cash payments between members)
  for (const settlement of settlements) {
    const { fromUserId, toUserId, amount } = settlement;
    if (balances.hasOwnProperty(fromUserId)) {
      balances[fromUserId] = (balances[fromUserId] ?? 0) + amount;
    }
    if (balances.hasOwnProperty(toUserId)) {
      balances[toUserId] = (balances[toUserId] ?? 0) - amount;
    }
  }

  // Round to 2 decimal places to avoid floating point drift
  for (const uid of Object.keys(balances)) {
    balances[uid] = Math.round((balances[uid] ?? 0) * 100) / 100;
  }

  return balances;
}

/**
 * Aggregate balances across multiple groups for the home dashboard.
 * Returns { totalOwed, totalOwe } from the perspective of `currentUserId`.
 */
export function aggregateBalances(
  groupBalances: Array<Record<string, number>>,
  currentUserId: string
): { totalOwed: number; totalOwe: number } {
  let totalOwed = 0; // others owe you
  let totalOwe = 0;  // you owe others

  for (const balances of groupBalances) {
    const myBalance = balances[currentUserId] ?? 0;
    if (myBalance > 0) {
      totalOwed += myBalance;
    } else if (myBalance < 0) {
      totalOwe += Math.abs(myBalance);
    }
  }

  return {
    totalOwed: Math.round(totalOwed * 100) / 100,
    totalOwe: Math.round(totalOwe * 100) / 100,
  };
}

/**
 * Format a currency amount with the correct symbol.
 */
export function formatCurrency(amount: number, currency: string): string {
  const symbols: Record<string, string> = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
  };
  const symbol = symbols[currency] ?? currency + ' ';
  return `${symbol}${Math.abs(amount).toFixed(2)}`;
}
