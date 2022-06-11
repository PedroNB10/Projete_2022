import * as React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  return (
    <WebView
      style={styles.container}
      originWhitelist={['*']}
      source={{ html: '<iframe width="100%" height="931" frameborder="0" src="https://stem.ubidots.com/app/dashboards/public/widget/9zX56WnDLucNsN0kdkKexWGQI6-gLWSmjSNed010_gw?embed=true"></iframe>' }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
