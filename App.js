import { FlashList } from "@shopify/flash-list";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const DATA = Array(10000)
  .fill(0)
  .map((_, v) => ({ title: `Item ${v + 1}`, index: v }));

const manifest = [
  "https://raw.githubusercontent.com/EvanBacon/anime-lorem/master/assets/dr-stone/Chrome_Portrait.png",
  "https://github.com/EvanBacon/anime-lorem/blob/master/assets/dr-stone/Alumi_Portrait.png?raw=true",
  "https://github.com/EvanBacon/anime-lorem/blob/master/assets/dr-stone/Azura_Portrait.png?raw=true",
  "https://github.com/EvanBacon/anime-lorem/blob/master/assets/dr-stone/Carbo_Portrait.png?raw=true",
  "https://github.com/EvanBacon/anime-lorem/blob/master/assets/dr-stone/Chalk_Portrait.png?raw=true",
  "https://github.com/EvanBacon/anime-lorem/blob/master/assets/dr-stone/Chrome_Portrait.png?raw=true",
  "https://github.com/EvanBacon/anime-lorem/blob/master/assets/dr-stone/En_Portrait.png?raw=true",
  "https://github.com/EvanBacon/anime-lorem/blob/master/assets/dr-stone/Ganen_Portrait.png?raw=true",
  "https://github.com/EvanBacon/anime-lorem/blob/master/assets/dr-stone/Gen_Asagiri_Portrait.png?raw=true",
  "https://github.com/EvanBacon/anime-lorem/blob/master/assets/dr-stone/Genbu_portrait.png?raw=true",
  "https://github.com/EvanBacon/anime-lorem/blob/master/assets/dr-stone/Ginro_Portrait.png?raw=true",
];

export default function App() {
  return (
    <View style={styles.container}>
      <FlashList
        data={DATA}
        contentContainerStyle={{
          paddingVertical: 48,
        }}
        renderItem={({ item }) => (
          <View style={{ padding: 8, flexDirection: "row" }}>
            <Image
              style={{
                borderRadius: 8,
                width: 64,
                height: 64,
                marginRight: 12,
              }}
              source={{ uri: manifest[item.index % manifest.length] }}
            />
            <View>
              <Text
                style={{ paddingBottom: 4, fontSize: 16, fontWeight: "bold" }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  opacity: 0.6,
                }}
              >
                Subtitle
              </Text>
            </View>
          </View>
        )}
        estimatedItemSize={80}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
  },
});
