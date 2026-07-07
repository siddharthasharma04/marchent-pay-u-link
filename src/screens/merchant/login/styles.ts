import { Platform, StyleSheet } from "react-native";
import { useTheme } from "../../../hooks/useTheme";
import { StatusBar } from "expo-status-bar";

export const useLoginStyles = () => {
  const { colors, spacing, borderRadius } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    innerContainer: {
      flex: 1,
      padding: spacing.xl,
      justifyContent: 'space-between',
       paddingTop: Platform.OS === 'android' ? (StatusBar as any).currentHeight + spacing.md : spacing.md,
    },
    headerSection: {
      alignItems: 'center',
      marginTop: spacing.xl,
     
    },
    dummy: {padding: spacing.xl},
    logoMock: {
      width: 70,
      height: 70,
      borderRadius: borderRadius.round,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    logoText: {
      fontSize: 32,
      color: colors.textSecondary
    },
    appName: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.primary,
    },
    appSubtitle: {
      fontSize: 14,
      color: colors.textMuted,
      marginTop: spacing.xs,
    },
    formSection: {
      // marginVertical: spacing.xl,
      marginTop: -90

    },
    inputLabel: {
      fontSize: 14,
      fontWeight: '600',
      color: colors.textMain,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.textBoxBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: 16,
    color: colors.textInput,
  },
  // Password Input Styles
  passwordWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 8, paddingRight: 12 },
  passwordInput: { flex: 1, padding: 12, fontSize: 16 },
  eyeButton: { padding: 4, justifyContent: 'center', alignItems: 'center' },
  
  // Inline Error Text
  errorText: { fontSize: 12, marginTop: 4, fontWeight: '500', paddingLeft: 2, marginBottom: spacing.md },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.xl,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: colors.secondary, // Gives a sleek gold accent ridge to the main action button
  },
  loginButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
  footerSection: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  footerText: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  goldDivider: {
    width: 60,
    height: 3,
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.sm,
  },
});}