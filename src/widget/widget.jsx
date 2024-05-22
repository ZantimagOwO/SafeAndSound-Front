import React from "react";
import { FlexWidget, TextWidget } from "react-native-android-widget";

export function HelloWidget() {
  return (
    <FlexWidget
      style={styles.container}
    >
      <TextWidget
        text="COSICAAS"
        style={styles.text}
      />
    </FlexWidget>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "match_parent",
    width: "match_parent",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
  },
  text: {
          fontSize: 32,
          fontFamily: "Inter",
          color: "#000000",
  }
});