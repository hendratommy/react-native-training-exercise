# Setup

## Linking

-   `react-native link react-native-gesture-handler`
-   `react-native link react-native-vector-icons`
-   To link custom fonts, edit `package.json` and add the following property:

```
"rnpm": {
    "assets": [
      "./assets/fonts/"
    ]
  }
```

then, link it using command: `react-native link`
