import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useLoginStyles } from "./styles";
import { useState } from "react";
import { useAppStore } from "../../../store/useAppStore";
import { useTheme } from "../../../hooks/useTheme";
import { Eye, EyeOff } from "lucide-react-native";

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const login = useAppStore((state) => state.login);
    const styles = useLoginStyles() ?? {};
    const { colors, spacing } = useTheme();

    const handleLogin = () => {
        let isValid = true;

        // Reset old errors
        setUsernameError('');
        setPasswordError('');

        // Username validation
        if (!username.trim()) {
            setUsernameError('Username or email is required.');
            isValid = false;
        }

        // Password validation
        if (!password) {
            setPasswordError('Password field cannot be empty.');
            isValid = false;
        } 
        // else if (password.length < 4) {
        //     setPasswordError('Password must be at least 4 characters.');
        //     isValid = false;
        // }

        if (isValid) {
            login(username); // Fires global state login
        }
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.innerContainer}>

                {/* Logo & Header Branding */}
                <View style={styles.headerSection}>
                    <View style={styles.dummy}></View>
                    <View style={styles.logoMock}>
                        <Text style={styles.logoText}>Q</Text>
                    </View>
                    <Text style={styles.appName}>Qafeer</Text>
                    <Text style={styles.appSubtitle}>Merchant Pay Solutions</Text>
                </View>

                {/* Form Controls */}
                <View style={styles.formSection}>
                    <Text style={styles.inputLabel}>Username or Email</Text>
                    <TextInput
                        style={[
                            styles.input,
                            { borderColor: usernameError ? colors.error : colors.border, marginBottom: usernameError ? 0 : spacing.md }
                        ]}
                        placeholder="Enter your credential"
                        placeholderTextColor={colors.textMuted}
                        value={username}
                        onChangeText={(text) => {
                            setUsername(text);
                            if (text.trim()) setUsernameError(''); // Clear error on change
                        }}
                        autoCapitalize="none"
                    />
                    {usernameError ? <Text style={[styles.errorText, { color: colors.error }]}>{usernameError}</Text> : null}

                    <Text style={styles.inputLabel}>Password</Text>
                    <View style={[
                        styles.passwordWrapper,
                        { borderColor: passwordError ? colors.error : colors.border }
                    ]}>
                        <TextInput
                            style={[styles.passwordInput, { color: colors.textMain }]}
                            placeholder="••••••••"
                            placeholderTextColor={colors.textMuted}
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text);
                                if (text) setPasswordError(''); // Clear error on change
                            }}
                            secureTextEntry={!isPasswordVisible}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity
                            style={styles.eyeButton}
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        >
                            {isPasswordVisible ? (
                                <EyeOff color={colors.textMuted} size={20} />
                            ) : (
                                <Eye color={colors.textMuted} size={20} />
                            )}
                        </TouchableOpacity>
                    </View>
                    {passwordError ? <Text style={[styles.errorText, { color: colors.error }]}>{passwordError}</Text> : null}

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    {/* Login Action Button */}
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Sign In</Text>
                    </TouchableOpacity>
                </View>

                {/* Footer Branding */}
                <View style={styles.footerSection}>
                    <Text style={styles.footerText}>Powered by Qafeer Payment Network</Text>
                    <View style={styles.goldDivider} />
                </View>

            </View>
        </KeyboardAvoidingView>
    )
}