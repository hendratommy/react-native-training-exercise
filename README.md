# Setup

## Linking

-   `react-native link react-native-gesture-handler`
-   `react-native link react-native-vector-icons`
-   `react-native link @react-native-community/async-storage`
-   To link custom fonts, edit `package.json` and add the following property:

```
"rnpm": {
    "assets": [
      "./assets/fonts/"
    ]
  }
```

then, link it using command: `react-native link`

API Endpoints

```
https://sajudin.000webhostapp.com/v1

user :
https://sajudin.000webhostapp.com/v1/all/users [ GET ]
https://sajudin.000webhostapp.com/v1/insert/users [ POST ] [username, password, firstname, lastname]
https://sajudin.000webhostapp.com/v1/update/users [ POST ] [id, username, firstname, lastname]
https://sajudin.000webhostapp.com/v1/login/users [ POST ] [username, password]

products :
https://sajudin.000webhostapp.com/v1/all/products [ GET ]
https://sajudin.000webhostapp.com/v1/by/users/products [ POST ] [idUser]
https://sajudin.000webhostapp.com/v1/insert/products [ POST ] [name, price, idCategory, images, desc, idUser]
https://sajudin.000webhostapp.com/v1/update/products [ POST ] [id, name, price, idCategory, images, desc]
https://sajudin.000webhostapp.com/v1/delete/products [ POST ] [id]

categories :
https://sajudin.000webhostapp.com/v1/by/users/categories [ POST ] [idUser]
https://sajudin.000webhostapp.com/v1/insert/categories [ POST ] [name, idUser]
https://sajudin.000webhostapp.com/v1/update/categories [ POST ] [id, name]
https://sajudin.000webhostapp.com/v1/delete/categories [ POST ] [id]
```
