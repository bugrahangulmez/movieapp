# _MovieApp_

<img src="https://github.com/bugrahangulmez/movieapp/assets/114365074/45f6916f-48b5-46e2-80b7-706975ba7aba" alt="Açıklama" width="250" height="500" style="border-radius: 10px;">
<img src="https://github.com/bugrahangulmez/movieapp/assets/114365074/15003ddd-890e-4020-8b17-2a125976dd12" alt="Açıklama" width="250" height="500" style="border-radius: 10px;">
<img src="https://github.com/bugrahangulmez/movieapp/assets/114365074/51073ff7-d08b-433f-8b4f-52ca1284a94e" alt="Açıklama" width="250" height="500" style="border-radius: 10px;">
<img src="https://github.com/bugrahangulmez/movieapp/assets/114365074/9676d1f2-942a-4456-82c9-cf7aa9391b47" alt="Açıklama" width="250" height="500" style="border-radius: 10px;">
<img src="https://github.com/bugrahangulmez/movieapp/assets/114365074/01ec5094-0b26-4150-a88e-3d8e9c185603" alt="Açıklama" width="250" height="500" style="border-radius: 10px;">
<img src="https://github.com/bugrahangulmez/movieapp/assets/114365074/fd86e1ab-bbd7-4ccb-a33d-3169e70eef0f" alt="Açıklama" width="250" height="500" style="border-radius: 10px;">

This app is developed by using these technologies:

- React Native
- TypeScript
- TailwindCSS

AND

- TMDB API

You can search and find any film which is inclueded in TMDB website. And films are seperated by their categories.

In order to use this app follow the these steps.

1. Clone this project with "git clone https://github.com/bugrahangulmez/movieapp" command.
2. Run "npm install" command into the project directory.
3. Install the all of the packages I remarked below
4. For IOS, after install all the packages you must pod install with "npx pod-install ios" command.
5. Take an TMDB Api Key that belongs to you then create a file called "key.ts" into "/src/api" folder.
6. Open the "key.ts" file then create a variable named "api_key" then export it(export const api_key="your_api_key")(not export default)
7. Then run "yarn start --reset-cache" command and after that run "yarn ios" or "yarn android".

You are ready to use "MovieApp" :)

-- PACKAGES --
yarn add @react-navigation/native  
yarn add react-native-screens react-native-safe-area-context  
yarn add @react-navigation/native-stack  
yarn add @react-navigation/stack  
yarn add react-native-gesture-handler  
yarn add @react-native-masked-view/masked-view  
yarn add @react-navigation/native-stack  
yarn add @react-navigation/drawer  
yarn add react-native-gesture-handler react-native-reanimated  
yarn add @react-navigation/bottom-tabs  
yarn add @react-navigation/material-bottom-tabs react-native-paper react-native-vector-icons  
yarn add @react-navigation/material-top-tabs react-native-tab-view  
yarn add react-native-pager-view  
yarn add react-native-reanimated  
yarn add nativewind  
yarn add --dev tailwindcss  
yarn add react-native-linear-gradient  
yarn add react-native-heroicons react-native-svg  
npm install --save react-native-snap-carousel  
npm install --save @types/react-native-snap-carousel  
npx tailwindcss init  
yarn add react-native-linear-gradient  
npm install --save react-native-snap-carousel  
npm install --save @types/react-native-snap-carousel  
yarn add react-native-heroicons react-native-svg  
npm install react-native-progress --save  
npm install react-redux  
npm install @reduxjs/toolkit
