import { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import en from "../../civilizations/en/messages.json";
import vi from "../../civilizations/vi/messages.json";
import ja from "../../civilizations/ja/messages.json";

// English is the fallback, so other locales only need the keys they translate.
const LOCALES = {
  en,
  vi: { ...en, ...vi },
  ja: { ...en, ...ja },
};

export default function App() {
  const [locale, setLocale] = useState("en");
  const messages = LOCALES[locale];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{messages.title}</Text>
      <Text style={styles.welcome}>{messages.welcome}</Text>
      <View style={styles.row}>
        {Object.keys(LOCALES).map((code) => (
          <Pressable
            key={code}
            onPress={() => setLocale(code)}
            style={[styles.button, code === locale && styles.buttonActive]}
          >
            <Text style={code === locale ? styles.labelActive : styles.label}>
              {code}
            </Text>
          </Pressable>
        ))}
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 8 },
  welcome: { fontSize: 18, marginBottom: 24 },
  row: { flexDirection: "row", gap: 12 },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#888",
  },
  buttonActive: { backgroundColor: "#222", borderColor: "#222" },
  label: { color: "#222" },
  labelActive: { color: "#fff" },
});
