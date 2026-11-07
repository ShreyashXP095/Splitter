import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '../components/Icon';

import { AuthStackParamList, AppTabParamList, RootStackParamList } from '../types';
import { Colors } from '../theme';
import { useAuthStore } from '../store/authStore';

// Auth screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import UsernameSetupScreen from '../screens/UsernameSetupScreen';

// App screens
import HomeScreen from '../screens/HomeScreen';
import FriendsScreen from '../screens/FriendsScreen';
import GroupDetailScreen from '../screens/GroupDetailScreen';
import AddPaymentScreen from '../screens/AddPaymentScreen';
import SettleUpScreen from '../screens/SettleUpScreen';
import QRScannerScreen from '../screens/QRScannerScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<AppTabParamList>();

// ─── Auth Stack ──────────────────────────────────────────────────────────────
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <AuthStack.Screen name="UsernameSetup" component={UsernameSetupScreen} />
    </AuthStack.Navigator>
  );
}

// ─── Bottom Tabs ─────────────────────────────────────────────────────────────
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.owedGreen,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginBottom: 4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Groups',
          tabBarIcon: ({ color }) => (
            <Icon name="LayoutList" size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          tabBarLabel: 'Friends',
          tabBarIcon: ({ color }) => (
            <Icon name="Users" size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// ─── Root Navigator ──────────────────────────────────────────────────────────
export default function RootNavigator() {
  const { firebaseUser, userProfile, isInitialized } = useAuthStore();

  // Splash: wait for Firebase to check persisted auth before rendering anything
  if (!isInitialized) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.background }}>
        <ActivityIndicator color={Colors.owedGreen} size="large" />
      </View>
    );
  }

  const isLoggedIn = !!firebaseUser;
  const hasUsername = !!userProfile?.username;

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          // Not authenticated — show Login/Register/ForgotPassword
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : !hasUsername ? (
          // Authenticated but username not set — go straight to UsernameSetup
          <RootStack.Screen
            name="Auth"
            component={UsernameSetupScreen}
            options={{ gestureEnabled: false }}
          />
        ) : (
          // Fully authenticated — show main app
          <>
            <RootStack.Screen name="App" component={AppTabs} />
            <RootStack.Screen
              name="GroupDetail"
              component={GroupDetailScreen}
            />
            <RootStack.Screen
              name="AddPayment"
              component={AddPaymentScreen}
              options={{ presentation: 'modal' }}
            />
            <RootStack.Screen
              name="SettleUp"
              component={SettleUpScreen}
              options={{ presentation: 'modal' }}
            />
            <RootStack.Screen
              name="QRScanner"
              component={QRScannerScreen}
              options={{ presentation: 'fullScreenModal' }}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
