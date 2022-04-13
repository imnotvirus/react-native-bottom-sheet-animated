import React, { useCallback, useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;
const BottomSheet = () => {
  const translationY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const scrollTo = useCallback((destination: number) => {
    'worklet';
    translationY.value = withSpring(destination, { damping: 50 });
  }, []);
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translationY.value };
    })
    .onUpdate((event) => {
      translationY.value = event.translationY + context.value.y;
      translationY.value = Math.max(translationY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translationY.value > -SCREEN_HEIGHT / 3) {
        scrollTo(0);
      } else if (translationY.value < -SCREEN_HEIGHT / 1.5) {
        scrollTo(MAX_TRANSLATE_Y);
      }
    });
  useEffect(() => {
    scrollTo(-SCREEN_WIDTH / 3);
  }, []);
  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translationY.value,
      [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
      [25, 5],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateY: translationY.value }],
      borderTopRightRadius: borderRadius,
      borderTopLeftRadius: borderRadius,
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheet, rBottomSheetStyle]}>
        <View style={styles.line} />
      </Animated.View>
    </GestureDetector>
  );
};
const styles = StyleSheet.create({
  bottomSheet: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: SCREEN_HEIGHT,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    backgroundColor: "grey",
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 2,
  },
});

export default BottomSheet;
