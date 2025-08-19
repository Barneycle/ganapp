import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Animated } from 'react-native';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [text, setText] = useState('');
  const fullText = 'GanApp';
  const progressBarWidth = useRef(new Animated.Value(0)).current;
  const cursorOpacity = useRef(new Animated.Value(1)).current;
  const animationRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Blinking cursor animation
    const cursorAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    cursorAnimation.start();

    // Text animation with proper timing
    let charIndex = 0;
    const animateText = () => {
      if (charIndex < fullText.length) {
        const currentText = fullText.substring(0, charIndex + 1);
        setText(currentText);
        
        // Update progress bar to match text progress
        const progress = (charIndex + 1) / fullText.length;
        const progressValue = progress * 0.4; // Max 40% during text animation
        
        Animated.timing(progressBarWidth, {
          toValue: progressValue,
          duration: 50, // Reduced from 100ms to 50ms for faster progress
          useNativeDriver: false,
        }).start();
        
        charIndex++;
        animationRef.current = setTimeout(animateText, 150); // Slower, more visible
      } else {
        cursorAnimation.stop();
        
        // Animate progress bar to 100%
        Animated.timing(progressBarWidth, {
          toValue: 1,
          duration: 400, // Reduced from 800ms to 400ms for faster final progress
          useNativeDriver: false,
        }).start(() => {
          onComplete();
        });
      }
    };

    // Start text animation
    animateText();

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      cursorAnimation.stop();
    };
  }, [onComplete, progressBarWidth, cursorOpacity]);

  return (
    <View className="flex-1 bg-zinc-200 justify-center items-center">
      {/* Text with blinking cursor */}
      <View className="mb-4">
        <Text className="font-mono font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-blue-900">
          {text}
          <Animated.Text 
            className="text-blue-900 ml-1"
            style={{ opacity: cursorOpacity }}
          >
            |
          </Animated.Text>
        </Text>
      </View>

      {/* Progress Bar */}
      <View className="w-[200px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
        <Animated.View 
          className="h-full bg-blue-500 rounded"
          style={{
            width: progressBarWidth.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
            shadowColor: '#3b82f6',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.8,
            shadowRadius: 15,
            elevation: 8,
          }}
        />
      </View>
    </View>
  );
};

export default LoadingScreen;
