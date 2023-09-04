import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  Pressable,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [countUploads, setCountUploads] = useState([]);

  console.log(countUploads, "NEW IMAGES");

  useEffect(async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission denied!");
      }
    }
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    let arr = countUploads;
    arr.push(result?.assets[0]?.uri);

    setCountUploads([...arr]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 30 }} />
      <Text style={{ fontSize: 30, color: "#FFFFFF", fontWeight: "bold" }}>
        Upload your products
      </Text>
      <StatusBar style="auto" />

      <Pressable
        style={{
          width: "90%",
          height: 400,
          marginTop: 30,
          borderRadius: 30,
          borderWidth: 1,
          borderStyle: "dashed",
          borderColor: "#FFFFFF",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          if (countUploads.length !== 5) {
            pickImage();
          } else {
            alert("You have exceeded maximum number of uploads");
          }
        }}
      >
        <ImageBackground
          source={require("./assets/uploader.png")}
          style={styles.image}
        ></ImageBackground>
        <Text style={{ color: "#FFFFFF", fontSize: 20, marginTop: 10 }}>
          Tap to upload images.
        </Text>
      </Pressable>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap",
          marginTop: 40,
          width: "90%",
        }}
      >
        {countUploads?.map((item, id) => (
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
              marginTop: 10,
            }}
            key={id}
          >
            <Image
              source={{ uri: item }}
              style={{ width: 100, height: 100, borderRadius: 10 }}
            />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#312A38",
    alignItems: "center",
  },
  image: {
    height: 300,
    width: 300,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
