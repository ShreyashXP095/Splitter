import { DebtTransaction } from '../types';

/**
 * Debt Simplification Algorithm
 *
 * Takes a balances map { userId: netBalance } and returns the minimum set of
 * transactions needed to settle all debts.
 *
 * Algorithm: greedy matching of largest creditor against largest debtor.
 * Positive balance = owed money (creditor), negative = owes money (debtor).
 */
export function simplifyDebts(
  balances: Record<string, number>
): DebtTransaction[] {
  const transactions: DebtTransaction[] = [];

  // Filter out users with zero balance and make mutable copies
  const credits: Array<{ uid: string; amount: number }> = [];
  const debts: Array<{ uid: string; amount: number }> = [];

  for (const [uid, balance] of Object.entries(balances)) {
    const rounded = Math.round(balance * 100) / 100;
    if (rounded > 0.01) {
      credits.push({ uid, amount: rounded });
    } else if (rounded < -0.01) {
      debts.push({ uid, amount: Math.abs(rounded) });
    }
  }

  // Sort descending for greedy approach
  credits.sort((a, b) => b.amount - a.amount);
  debts.sort((a, b) => b.amount - a.amount);

  let ci = 0;
  let di = 0;

  while (ci < credits.length && di < debts.length) {
    const creditor = credits[ci];
    const debtor = debts[di];

    const settleAmount = Math.min(creditor.amount, debtor.amount);
    const roundedSettle = Math.round(settleAmount * 100) / 100;

    if (roundedSettle > 0.01) {
      transactions.push({
        from: debtor.uid,
        to: creditor.uid,
        amount: roundedSettle,
      });
    }

    creditor.amount = Math.round((creditor.amount - settleAmount) * 100) / 100;
    debtor.amount = Math.round((debtor.amount - settleAmount) * 100) / 100;

    if (creditor.amount < 0.01) ci++;
    if (debtor.amount < 0.01) di++;
  }

  return transactions;
}

/**
 * Get raw per-payment debts (what each person owes the payer for each payment).
 * Used for the "Raw" debt view toggle.
 */
export interface RawDebt {
  from: string;     // owes
  to: string;       // owed (the payer)
  amount: number;
  description: string;
  paymentId: string;
}

export function getRawDebts(
  payments: Array<{
    id: string;
    description: string;
    paidBy: string;
    splits: Record<string, number>;
  }>
): RawDebt[] {
  const debts: RawDebt[] = [];

  for (const payment of payments) {
    for (const [uid, amount] of Object.entries(payment.splits)) {
      // The payer doesn't owe themselves
      if (uid !== payment.paidBy && amount > 0.01) {
        debts.push({
          from: uid,
          to: payment.paidBy,
          amount: Math.round(amount * 100) / 100,
          description: payment.description,
          paymentId: payment.id,
        });
      }
    }
  }

  return debts;
}
