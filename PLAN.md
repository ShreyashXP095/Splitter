# Bill Split App — Full Implementation Plan

## Instructions
1. Create a `PLAN.md` file in the workspace root with the full plan below (the exact content of this document).
2. Create a `CONTEXT.md` file in the workspace root to track progress. Format:
   - **What's been built** (with brief why)
   - **What's coming next**
   - Update this file after every task completes.
3. Execute each task sequentially. After each task, update CONTEXT.md before moving to the next.

---

## Problem Statement
A cross-platform mobile app (iOS & Android) for friends to track and split shared expenses. Users sign in with Google, create groups from their friends list, add payments with flexible split methods, exclude specific members from individual payments, and track who owes whom — with an activity feed and push notifications.

---

## Finalized Requirements

### Auth & Users
- Gmail (Google OAuth) sign-in via Firebase Auth
- Every user must set a unique username after first login
- Friends added by username search only (must be friends to add to a group)

### Groups
- Create a group, add members from friends list only
- Any member can add a payment to the group
- Payments record: who paid, total amount, which members are involved, split method
- Currency set once per group at creation time (single currency per group)

### Split Methods (per payment)
- Equal split among involved members
- Percentage-based split
- Manual amount per person
- Any member can be excluded (debared) from a specific payment; remaining members split the full amount using the chosen method

### Debt Tracking
- Raw view: each individual debt shown as-is
- Simplified view: minimize total transactions (debt simplification algorithm)
- User can toggle between views per group

### Settle Up
- Any member can log a manual "Settle Up" action (e.g. "A paid B ₹500 cash")
- This adjusts balances just like a payment

### Payment Permissions
- The person who added a payment can edit it
- Only the group creator/admin can delete any payment

### Group Lifecycle
- Archive (mark settled, read-only history) — only group creator
- Delete (remove all data) — only group creator

### Offline Behavior
- Block writes (add payment, settle up, edit) when offline with a clear "no internet" toast
- Reads/views work via Firestore's default offline cache

### Notifications (Standard)
- Notify you when you are added to a new payment (you owe money)
- Notify you when someone settles a debt with you

### UX & Design
- Home screen: total balance summary (you owe / are owed) → group list → activity feed
- Activity feed per group: log of all payments, edits, and settlements
- Clean, minimal light theme (Splitwise-like) using React Native Paper

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | React Native + Expo (Expo Go compatible) | No Android Studio needed, test on device |
| Language | TypeScript | Type safety across the codebase |
| Auth | Firebase Auth (Google OAuth) | One-tap Google sign-in |
| Database | Firestore (Firebase) | Real-time sync, no server to manage |
| Push Notifications | Expo Notifications + FCM | Works with Expo out of the box |
| Navigation | React Navigation v6 | Industry standard for RN |
| State Management | Zustand | Lightweight, works well with Firestore |
| UI Components | React Native Paper | Clean Material-style, minimal setup |

---

## Firestore Data Model

```
users/{userId}
  - username: string (unique)
  - email: string
  - displayName: string
  - photoURL: string
  - friendIds: string[]
  - expoPushToken: string

groups/{groupId}
  - name: string
  - memberIds: string[]
  - createdBy: string (userId)
  - createdAt: timestamp
  - status: "active" | "archived"
  - currency: string (e.g. "INR", "USD")
  - balances: { userId: number } (positive = owed, negative = owes)

payments/{paymentId}
  - groupId: string
  - description: string
  - totalAmount: number
  - paidBy: string (userId)
  - splitMethod: "equal" | "percentage" | "manual"
  - involvedMembers: string[] (excludes debared members)
  - splits: { userId: number } (amount each person owes)
  - createdBy: string
  - createdAt: timestamp
  - updatedAt: timestamp

settlements/{settlementId}
  - groupId: string
  - fromUserId: string (who paid)
  - toUserId: string (who received)
  - amount: number
  - createdBy: string
  - createdAt: timestamp

activity/{activityId}
  - groupId: string
  - type: "payment_added" | "payment_edited" | "payment_deleted" | "settlement_added" | "member_added" | "group_archived"
  - actorId: string
  - payload: object (description of what changed)
  - createdAt: timestamp
```

---

## Task Breakdown

### Task 1: Project Setup & Navigation Shell ✅
**Objective:** Bootstrap the Expo project with all dependencies and a working navigation skeleton.

### Task 2: Firebase Setup & Google Auth
**Objective:** Implement full authentication flow with Google OAuth and username setup.

### Task 3: Friends System
**Objective:** Users can search for others by username and add them as friends.

### Task 4: Group Creation & Management
**Objective:** Users can create groups from friends, view them on Home, and manage group settings.

### Task 5: Add Payment with Split Logic
**Objective:** Core payment feature with all three split methods and member exclusion.

### Task 6: Debt Tracking & Balance Views
**Objective:** Show who owes whom with toggle between raw and simplified views.

### Task 7: Settle Up Feature
**Objective:** Members can log manual cash settlements, which adjust group balances.

### Task 8: Activity Feed
**Objective:** Each group has a chronological log of all events.

### Task 9: Push Notifications
**Objective:** Users get notified when added to a payment or when someone settles with them.

### Task 10: Polish, Edge Cases & Final QA
**Objective:** Production-ready app with all edge cases handled and consistent UX.
