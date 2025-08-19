import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function QRScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const router = useRouter();

  const simulateQRScan = () => {
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      Alert.alert(
        'QR Code Scanned!',
        'Event ID: EVT-001\n\nRedirecting to survey...',
        [
          {
            text: 'Continue',
            onPress: () => {
              // Navigate to survey screen with event data
              router.push({
                pathname: '/survey',
                params: { eventId: 'EVT-001' }
              });
            }
          }
        ]
      );
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 mx-4 my-2">
        {/* Header */}
        <View className="flex-row items-center justify-between p-6 pt-12 mt-6 bg-black rounded-2xl mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 bg-white bg-opacity-90 rounded-full items-center justify-center shadow-lg"
          >
            <Ionicons name="arrow-back" size={20} color="#1e3a8a" />
          </TouchableOpacity>
          
          <View className="flex-row items-center">
            <Ionicons name="qr-code" size={18} color="white" />
            <Text className="text-white text-lg font-bold ml-3">Scan QR Code</Text>
          </View>
          
          <View className="w-10" />
        </View>

        {/* Scanner Interface */}
        <View className="flex-1 justify-center items-center px-4 sm:px-8">
          {/* Scanner Frame */}
          <View className="w-48 h-48 sm:w-64 sm:h-64 border-2 border-white rounded-lg mb-8 sm:mb-10">
            {/* Corner Indicators */}
            <View className="absolute top-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-l-4 border-t-4 border-blue-400 rounded-tl-lg" />
            <View className="absolute top-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-r-4 border-t-4 border-blue-400 rounded-tr-lg" />
            <View className="absolute bottom-0 left-0 w-6 h-6 sm:w-8 sm:h-8 border-l-4 border-b-4 border-blue-400 rounded-bl-lg" />
            <View className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 border-r-4 border-b-4 border-blue-400 rounded-br-lg" />
            
            {/* Center Icon */}
            <View className="absolute inset-0 justify-center items-center">
              <Ionicons name="qr-code" size={48} color="white" className="sm:hidden" />
              <Ionicons name="qr-code" size={64} color="white" className="hidden sm:block" />
            </View>
          </View>
          
          {/* Instructions */}
          <View className="items-center mb-8 sm:mb-10 px-4">
            <Text className="text-white text-center text-base sm:text-lg font-semibold mb-3">
              Position QR Code in Frame
            </Text>
            <Text className="text-white text-center text-sm sm:text-base opacity-80 mb-6 sm:mb-8 text-center">
              Hold your device steady to scan the event QR code
            </Text>
            
            {/* Simulate Scan Button */}
            <TouchableOpacity
              onPress={simulateQRScan}
              disabled={isScanning}
              className={`px-8 sm:px-10 py-4 sm:py-5 rounded-lg ${
                isScanning ? 'bg-gray-600' : 'bg-blue-500'
              }`}
            >
              <Text className="text-white text-base sm:text-lg font-semibold">
                {isScanning ? 'Scanning...' : 'Simulate QR Scan'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Info */}
        <View className="bg-black p-6 sm:p-8 rounded-2xl mb-6">
          <View className="items-center px-4">
            <Text className="text-white text-center text-xs sm:text-sm opacity-70 mb-4 sm:mb-5">
              For testing purposes, use the simulate button above
            </Text>
            <Text className="text-white text-center text-xs opacity-50 text-center">
              In production, this would use the device camera
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
