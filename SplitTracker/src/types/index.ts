// ─── Firestore Document Types ───────────────────────────────────────────────

export interface UserProfile {
  uid: string;
  username: string;
  email: string;
  displayName: string;
  photoURL: string;
  friendIds: string[];
  expoPushToken?: string;
  createdAt: number;
}

export interface Group {
  id: string;
  name: string;
  memberIds: string[];
  createdBy: string;
  createdAt: number;
  status: 'active' | 'archived';
  currency: string;
  balances: Record<string, number>; // positive = owed to you, negative = you owe
}

export type SplitMethod = 'equal' | 'percentage' | 'manual';

export interface Payment {
  id: string;
  groupId: string;
  description: string;
  totalAmount: number;
  paidBy: string; // userId
  splitMethod: SplitMethod;
  involvedMembers: string[]; // userIds of members who share this bill
  splits: Record<string, number>; // userId -> amount they owe
  createdBy: string;
  createdAt: number;
  updatedAt: number;
}

export interface Settlement {
  id: string;
  groupId: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  createdBy: string;
  createdAt: number;
}

export type ActivityType =
  | 'payment_added'
  | 'payment_edited'
  | 'payment_deleted'
  | 'settlement_added'
  | 'member_added'
  | 'group_archived';

export interface Activity {
  id: string;
  groupId: string;
  type: ActivityType;
  actorId: string;
  payload: Record<string, unknown>;
  createdAt: number;
}

// ─── Debt / Balance Types ────────────────────────────────────────────────────

export interface DebtTransaction {
  from: string; // userId who owes
  to: string;   // userId who is owed
  amount: number;
}

// ─── Navigation Param Types ──────────────────────────────────────────────────

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  UsernameSetup: undefined;
};

export type AppTabParamList = {
  Home: undefined;
  Friends: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
  GroupDetail: { groupId: string };
  AddPayment: { groupId: string };
  SettleUp: { groupId: string };
  QRScanner: undefined;
};
