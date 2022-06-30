import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer, DefaultTheme,
} from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { BlurView } from 'expo-blur';
import { FlatList, useColorScheme, Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BackgroundColor } from "@bacons/expo-background-color";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};


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
  const scheme = useColorScheme();
  const color = scheme === 'light' ? "#000" : '#fff'
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
        <Text style={{ paddingBottom: 4, color, fontSize: 16, fontWeight: "bold" }}>
          {item.title}
        </Text>
        <Text
          style={{
            color,
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
  const scheme = useColorScheme()
  const isLight = scheme === 'light'
  return (
    <List
      data={DATA}

      contentContainerStyle={{

        backgroundColor: !isLight ? "#000" : '#fff',

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
  const scheme = useColorScheme()
  const isLight = scheme === 'light'

  return (
    <>
      <BackgroundColor color={{ light: "#fff", dark: "#000" }} />
      <NavigationContainer theme={navTheme}>
        <Tab.Navigator screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: isLight ? "#000" : '#fff',
          // tabBarShowLabel: false,
          tabBarLabelPosition: 'beside-icon',
          tabBarBackground: () => (
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 5,

                  elevation: 5,
                }
              ]}
            >
              <BlurView tint={scheme} intensity={100} style={[{
                flex: 1,
                overflow: 'hidden',
                borderRadius: 24,
              }]} />
            </View>
          ),

          tabBarLabelStyle: {
            fontWeight: 'bold',
            fontSize: 16,
          },
          tabBarStyle: {
            borderTopWidth: 0,
            bottom: 25,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            left: 20,
            paddingBottom: 0,
            right: 20,
            backgroundColor: 'transparent',
            height: 64
          }
        }}>
          <Tab.Screen name="New" component={FastScreen} options={{

            tabBarIcon: props => <TabBarIcon {...props} name="rocket-outline" />
          }} />
          <Tab.Screen name="Legacy" component={LegacyScreen} options={{
            tabBarIcon: props => <TabBarIcon {...props} name="ios-bicycle-outline" />
          }} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}


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

  return <Ionicons size={48} style={{}} {...props} name={resolvedName} />;
}