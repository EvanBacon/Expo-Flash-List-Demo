import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { Image, FlatList, Text, View } from "react-native";

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

function Item(item) {
  return (
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
        <Text style={{ paddingBottom: 4, fontSize: 16, fontWeight: "bold" }}>
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
  );
}

function ListDemo({ List }) {
  const { top, bottom } = useSafeAreaInsets()
  return (
    <List
      data={DATA}
      contentContainerStyle={{
        paddingTop: top,
        paddingBottom: bottom
      }}
      renderItem={({ item }) => <Item {...item} />}
      estimatedItemSize={80}
    />
  );
}

function FastScreen() {
  return <ListDemo List={FlashList} />;
}

function LegacyScreen() {
  return <ListDemo List={FlatList} />;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Fast" component={FastScreen} options={{
          tabBarIcon: props => <TabBarIcon {...props} name="rocket-outline" />
        }} />
        <Tab.Screen name="Legacy" component={LegacyScreen} options={{
          tabBarIcon: props => <TabBarIcon {...props} name="ios-bicycle-outline" />
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


import Ionicons from '@expo/vector-icons/Ionicons'
import { useSafeAreaInsets } from "react-native-safe-area-context";

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
export function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  focused?: boolean;
  color: string;
}) {

  let resolvedName = props.name;
  if (props.focused && resolvedName.endsWith('-outline')) {
    // @ts-expect-error: yolo
    resolvedName = props.name.replace(/\-outline$/, "")
  }

  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} name={resolvedName} />;
}