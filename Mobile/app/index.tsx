import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LoadingScreen } from './loadingscreen';

const latestEvent = {
  title: "Annual Tech Conference 2024",
  date: "June 15, 2024",
  time: "9:00 AM - 5:00 PM",
  venue: "Grand Convention Center, Cityville",
  sponsors: [
    "TechCorp",
    "InnovateX",
    "Future Solutions"
  ],
  guestSpeakers: [
    "Dr. Jane Smith",
    "Mr. John Doe",
    "Prof. Emily Johnson"
  ],
  rationale: "The Annual Tech Conference 2024 aims to foster collaboration and innovation among technology professionals by providing a platform for sharing knowledge, networking, and showcasing the latest advancements in the industry.",
  imageUrl: 'https://via.placeholder.com/400x250'
};

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Loading screen will control its own timing
    // No artificial timer needed
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 mx-4 my-2">
        <ScrollView 
          className="flex-1" 
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Image */}
          <View className="w-full overflow-hidden h-48 sm:h-64 rounded-2xl mb-6">
            <Image 
              source={{ uri: latestEvent.imageUrl }} 
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          
          {/* Title */}
          <Text className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 text-center mb-8">
            {latestEvent.title}
          </Text>
          
          {/* Event Details Grid */}
          <View>
            {/* Event Programme and Kits */}
            <View className="mb-8">
              <View className="border border-gray-200 rounded-lg shadow-md p-6 bg-white mb-6">
                <Text className="text-lg font-semibold text-blue-900 mb-3">Event Programme</Text>
                <Text className="text-gray-700 text-base mb-4">View the complete schedule and agenda for the conference</Text>
                <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded-lg self-start">
                  <Text className="text-white font-medium">View Programme</Text>
                </TouchableOpacity>
              </View>
              <View className="border border-gray-200 rounded-lg shadow-md p-6 bg-white">
                <Text className="text-lg font-semibold text-blue-900 mb-3">Event Kits</Text>
                <Text className="text-gray-700 text-base mb-4">Access event materials, presentations, and resources</Text>
                <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded-lg self-start">
                  <Text className="text-white font-medium">View Kits</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Date, Time, Venue Grid */}
            <View className="mb-8">
              <View className="border border-gray-200 rounded-lg shadow-md p-6 bg-white mb-6">
                <Text className="text-lg font-semibold text-blue-900 mb-3">Date:</Text>
                <Text className="text-gray-700 text-base">{latestEvent.date}</Text>
              </View>
              <View className="border border-gray-200 rounded-lg shadow-md p-6 bg-white mb-6">
                <Text className="text-lg font-semibold text-blue-900 mb-3">Time:</Text>
                <Text className="text-gray-700 text-base">{latestEvent.time}</Text>
              </View>
              <View className="border border-gray-200 rounded-lg shadow-md p-6 bg-white">
                <Text className="text-lg font-semibold text-blue-900 mb-3">Venue:</Text>
                <Text className="text-gray-700 text-base">{latestEvent.venue}</Text>
              </View>
            </View>
            
            {/* Rationale */}
            <View className="border border-gray-200 rounded-lg shadow-md p-6 bg-white mb-8">
              <Text className="text-lg font-semibold text-blue-900 mb-3">Rationale:</Text>
              <Text className="text-gray-700 text-base leading-6">{latestEvent.rationale}</Text>
            </View>
            
            {/* Guest Speakers */}
            <View className="border border-gray-200 rounded-lg shadow-md p-6 bg-white mb-8">
              <Text className="text-lg font-semibold text-blue-900 mb-3">Guest Speaker/s:</Text>
              {latestEvent.guestSpeakers.map((speaker, index) => (
                <View key={index} className="flex-row items-center mb-2">
                  <Text className="text-gray-800 mr-3 text-base">•</Text>
                  <Text className="text-gray-800 text-base">{speaker}</Text>
                </View>
              ))}
            </View>
            
            {/* Sponsors */}
            <View className="border border-gray-200 rounded-lg shadow-md p-6 bg-white">
              <Text className="text-lg font-semibold text-blue-900 mb-3">Sponsor/s:</Text>
              {latestEvent.sponsors.map((sponsor, index) => (
                <View key={index} className="flex-row items-center mb-2">
                  <Text className="text-gray-800 mr-3 text-base">•</Text>
                  <Text className="text-gray-800 text-base">{sponsor}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
