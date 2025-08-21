import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginDashboard() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Success',
        'Welcome back!',
        [{ text: 'OK', onPress: () => console.log('Login successful') }]
      );
    }, 2000);
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Password reset link has been sent to your email',
      [{ text: 'OK' }]
    );
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert(
      'Social Login',
      `Continue with ${provider}`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-900">
      <View className="flex-1 bg-blue-900">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            showsVerticalScrollIndicator={false}
            className="px-4 py-6"
          >
            {/* Header */}
            <View className="items-center mb-8 mt-4">
              <Text className="text-4xl font-bold text-white mb-4 text-center">GanApp</Text>
              <Text className="text-lg font-bold text-white mb-3 text-center">Welcome Back!</Text>
              <Text className="text-base text-white opacity-90 text-center px-4">Sign in to your account</Text>
            </View>

            {/* Login Form */}
            <View className="bg-white rounded-2xl p-6 shadow-lg mx-2">
              {/* Email Input */}
              <View className="mb-4">
                <Text className="text-base font-semibold text-black mb-2">Username or Email Address</Text>
                <View className="flex-row items-center border border-gray-300 rounded-xl px-4 bg-gray-50">
                  <Ionicons name="mail-outline" size={20} color="#1e3a8a" style={{ marginRight: 8 }} />
                  <TextInput
                    className="flex-1 h-12 text-base text-black"
                    placeholder="Enter your username or email"
                    placeholderTextColor="#666"
                    value={formData.email}
                    onChangeText={(text) => handleInputChange('email', text)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className="mb-4">
                <Text className="text-base font-semibold text-black mb-2">Password</Text>
                <View className="flex-row items-center border border-gray-300 rounded-xl px-4 bg-gray-50">
                  <Ionicons name="lock-closed-outline" size={20} color="#1e3a8a" style={{ marginRight: 8 }} />
                  <TextInput
                    className="flex-1 h-12 text-base text-black"
                    placeholder="Enter your password"
                    placeholderTextColor="#666"
                    value={formData.password}
                    onChangeText={(text) => handleInputChange('password', text)}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="p-1"
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color="#1e3a8a"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Remember Me and Forgot Password Row */}
              <View className="flex-row items-center justify-between mb-5">
                {/* Remember Me Checkbox */}
                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <View className={`w-5 h-5 border-2 rounded mr-3 items-center justify-center ${rememberMe ? 'bg-blue-800 border-blue-800' : 'border-gray-400'}`}>
                    {rememberMe && (
                      <Ionicons name="checkmark" size={14} color="white" />
                    )}
                  </View>
                  <Text className="text-sm text-black">Remember Me</Text>
                </TouchableOpacity>

                {/* Forgot Password */}
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text className="text-blue-800 text-sm underline">Forgot Password?</Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                className={`bg-blue-800 rounded-xl py-4 items-center mb-5 ${isLoading ? 'bg-gray-400' : ''}`}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <Text className="text-white text-base font-bold">
                  {isLoading ? 'Logging In...' : 'Sign In'}
                </Text>
              </TouchableOpacity>

              {/* Divider */}
              <View className="flex-row items-center mb-5">
                <View className="flex-1 h-px bg-gray-300" />
                <Text className="px-3 text-gray-600 text-sm">or</Text>
                <View className="flex-1 h-px bg-gray-300" />
              </View>

              {/* Create New Account Button */}
              <TouchableOpacity
                className="border border-blue-800 rounded-xl py-4 items-center"
                onPress={() => router.push('/registration')}
              >
                <Text className="text-blue-800 text-base font-bold">Create New Account</Text>
              </TouchableOpacity>
            </View>
            
            {/* Bottom Spacing */}
            <View className="h-6" />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
