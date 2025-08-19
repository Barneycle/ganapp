import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from "expo-router";

export default function TermsScreen() {
  const router = useRouter();
  const { type } = useLocalSearchParams<{ type: string }>();
  
  const isTerms = type === 'terms';
  const title = isTerms ? 'Terms of Use' : 'Privacy Policy';
  const icon = isTerms ? 'document-text-outline' : 'shield-checkmark-outline';

  const termsContent = `
TERMS OF USE

Last updated: ${new Date().toLocaleDateString()}

1. ACCEPTANCE OF TERMS
By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement.

2. USE LICENSE
Permission is granted to temporarily download one copy of the application for personal, non-commercial transitory viewing only.

3. DISCLAIMER
The materials on this application are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

4. LIMITATIONS
In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our application.

5. ACCURACY OF MATERIALS
The materials appearing on our application could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our application are accurate, complete or current.

6. LINKS
We have not reviewed all of the sites linked to our application and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site.

7. MODIFICATIONS
We may revise these terms of use for our application at any time without notice. By using this application you are agreeing to be bound by the then current version of these Terms and Conditions of Use.

8. GOVERNING LAW
These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
  `;

  const privacyContent = `
1. INFORMATION WE COLLECT
We collect information you provide directly to us, such as when you create an account, fill out forms, or communicate with us.

2. HOW WE USE YOUR INFORMATION
We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to develop new features.

3. INFORMATION SHARING
We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.

4. DATA SECURITY
We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

5. COOKIES AND TRACKING
We may use cookies and similar tracking technologies to enhance your experience and collect information about how you use our application.

6. THIRD-PARTY SERVICES
Our application may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties.

7. CHILDREN'S PRIVACY
Our application is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.

8. CHANGES TO THIS POLICY
We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.

9. YOUR RIGHTS
You have the right to:
• Access your personal information
• Correct inaccurate information
• Request deletion of your information
• Opt-out of certain communications

10. CONTACT US
If you have any questions about this privacy policy, please contact us at privacy@example.com.
`;

  const content = isTerms ? termsContent : privacyContent;

  const handleBackPress = () => {
    // Navigate back to registration form
    router.push('/registration');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <LinearGradient
        colors={['#1e3a8a', '#1e40af']}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between p-3 pt-12 mt-6">
          <TouchableOpacity
            onPress={handleBackPress}
            className="w-10 h-10 bg-white bg-opacity-90 rounded-full items-center justify-center shadow-lg"
          >
            <Ionicons name="arrow-back" size={20} color="#1e3a8a" />
          </TouchableOpacity>
          
          <View className="flex-row items-center">
            <Ionicons name={icon} size={18} color="white" />
            <Text className="text-lg font-bold text-white ml-2">{title}</Text>
          </View>
          
          <View className="w-10" />
        </View>

        {/* Content */}
        <View className="flex-1 bg-white rounded-t-3xl mt-1 mx-1">
          <ScrollView
            showsVerticalScrollIndicator={true}
            className="flex-1"
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 24 }}
            bounces={true}
            alwaysBounceVertical={false}
          >
            {isTerms ? (
              <View>
                <Text className="text-md font-bold text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</Text>
                
                <View className="mb-4">
                  <Text className="text-base font-bold text-black mb-2">1. ACCEPTANCE OF TERMS</Text>
                  <Text className="text-sm text-black leading-5">By accessing and using this application, you accept and agree to be bound by the terms and provision of this agreement.</Text>
                </View>
                
                <View className="mb-4">
                  <Text className="text-base font-bold text-black mb-2">2. USE LICENSE</Text>
                  <Text className="text-sm text-black leading-5">Permission is granted to temporarily download one copy of the application for personal, non-commercial transitory viewing only.</Text>
                </View>
                
                <View className="mb-4">
                  <Text className="text-base font-bold text-black mb-2">3. DISCLAIMER</Text>
                  <Text className="text-sm text-black leading-5">The materials on this application are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</Text>
                </View>
                
                <View className="mb-4">
                  <Text className="text-base font-bold text-black mb-2">4. LIMITATIONS</Text>
                  <Text className="text-sm text-black leading-5">In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our application.</Text>
                </View>
                
                <View className="mb-4">
                  <Text className="text-base font-bold text-black mb-2">5. ACCURACY OF MATERIALS</Text>
                  <Text className="text-sm text-black leading-5">The materials appearing on our application could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our application are accurate, complete or current.</Text>
                </View>
                
                <View className="mb-4">
                  <Text className="text-base font-bold text-black mb-2">6. LINKS</Text>
                  <Text className="text-sm text-black leading-5">We have not reviewed all of the sites linked to our application and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site.</Text>
                </View>
                
                <View className="mb-4">
                  <Text className="text-base font-bold text-black mb-2">7. MODIFICATIONS</Text>
                  <Text className="text-sm text-black leading-5">We may revise these terms of use for our application at any time without notice. By using this application you are agreeing to be bound by the then current version of these Terms and Conditions of Use.</Text>
                </View>
                
                <View className="mb-4">
                  <Text className="text-base font-bold text-black mb-2">8. GOVERNING LAW</Text>
                  <Text className="text-sm text-black leading-5">These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</Text>
                </View>
                
                {/* Add bottom spacing for better scrolling */}
                <View className="h-8" />
              </View>
            ) : (
              <View>
                
                <View className="mb-4">
                  <Text className="text-base font-bold text-black mb-2">1. INFORMATION WE COLLECT</Text>
                  <Text className="text-sm text-black leading-5">We collect information you provide directly to us, such as when you create an account, fill out forms, or communicate with us.</Text>
                </View>
                
                <View className="mb-4">
                  <Text className="text-base font-bold text-black mb-2">2. HOW WE USE YOUR INFORMATION</Text>
                  <Text className="text-sm text-black leading-5">We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to develop new features.</Text>
                </View>
                
                <View className="mb-4">
                  <Text className="text-base font-bold text-black mb-2">3. INFORMATION SHARING</Text>
                  <Text className="text-sm text-black leading-5">We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</Text>
                </View>
                
                <View className="mb-4">
                  <Text className="text-base font-bold text-black mb-2">4. DATA SECURITY</Text>
                  <Text className="text-sm text-black leading-5">We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</Text>
                </View>
                
                <View className="mb-4">
                  <Text className="text-base font-bold text-black mb-2">5. COOKIES AND TRACKING</Text>
                  <Text className="text-sm text-black leading-5">We may use cookies and similar tracking technologies to enhance your experience and collect information about how you use our application.</Text>
                </View>
                
                <View className="mb-4">
                  <Text className="text-base font-bold text-black mb-2">6. THIRD-PARTY SERVICES</Text>
                  <Text className="text-sm text-black leading-5">Our application may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties.</Text>
                </View>
                
                <View className="mb-4">
                  <Text className="text-base font-bold text-black mb-2">7. CHILDREN'S PRIVACY</Text>
                  <Text className="text-sm text-black leading-5">Our application is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.</Text>
                </View>
                
                <View className="mb-4">
                  <Text className="text-base font-bold text-black mb-2">8. CHANGES TO THIS POLICY</Text>
                  <Text className="text-sm text-black leading-5">We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</Text>
                </View>
                
                <View className="mb-4">
                  <Text className="text-base font-bold text-black mb-2">9. YOUR RIGHTS</Text>
                  <Text className="text-sm text-black leading-5">You have the right to:</Text>
                  <Text className="text-sm text-black leading-5 ml-4">• Access your personal information</Text>
                  <Text className="text-sm text-black leading-5 ml-4">• Correct inaccurate information</Text>
                  <Text className="text-sm text-black leading-5 ml-4">• Request deletion of your information</Text>
                  <Text className="text-sm text-black leading-5 ml-4">• Opt-out of certain communications</Text>
                </View>
                
                <View className="mb-4">
                  <Text className="text-base font-bold text-black mb-2">10. CONTACT US</Text>
                  <Text className="text-sm text-black leading-5">If you have any questions about this privacy policy, please contact us at privacy@example.com.</Text>
                </View>
                
                {/* Add bottom spacing for better scrolling */}
                <View className="h-8" />
              </View>
            )}
          </ScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
