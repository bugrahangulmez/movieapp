# _MovieApp_

<img src="https://github.com/bugrahangulmez/movieapp/assets/114365074/d1932792-b5a4-4807-929a-99ff8fd63679" alt="Açıklama" width="250" height="500" style="border-radius: 10px;">
<img src="https://github.com/bugrahangulmez/movieapp/assets/114365074/9e1d65d3-ad4b-40ca-9fcc-e10d3a566141" alt="Açıklama" width="250" height="500" style="border-radius: 10px;">
<img src="https://github.com/bugrahangulmez/movieapp/assets/114365074/7ee8ba4b-2431-406e-aa8f-c8397c569ffb" alt="Açıklama" width="250" height="500" style="border-radius: 10px;">
<img src="https://github.com/bugrahangulmez/movieapp/assets/114365074/cb48bc5d-0470-4129-a8d0-48bc17af36d9" alt="Açıklama" width="250" height="500" style="border-radius: 10px;">
<img src="https://github.com/bugrahangulmez/movieapp/assets/114365074/6796799c-0f42-4961-8e12-45aaa9606bce" alt="Açıklama" width="250" height="500" style="border-radius: 10px;">
<img src="https://github.com/bugrahangulmez/movieapp/assets/114365074/d9edef46-562f-404b-893a-ecda7624fc73" alt="Açıklama" width="250" height="500" style="border-radius: 10px;">

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
3. Install the all of the packages I remarked above
4. For IOS, after install all the packages you must pod install with "npx pod-install ios" command.
5. Take an TMDB Api Key that belongs to you then create a file called "key.ts" into "/src/api" folder.
6. Open the "key.ts" file then create a variable named "api_key" then export it(export const api_key="your_api_key")(not export default)
7. Then run "yarn start --reset-cache" command and after that run "yarn ios" or "yarn android".

You are ready to use "MovieApp" :)
