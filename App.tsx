import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet from "./components/BottomSheet";

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <StatusBar style="light" />
      <BottomSheet />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
});
