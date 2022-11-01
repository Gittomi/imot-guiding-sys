<div id="top"></div>
<br />
<div align="center">
  <h1 align="center">imoT Guiding System</h1>
   <p align="center">
    App to give fire commands
    <br />
  </p>
</div>


## About The App

Purpose of this app was to deepen my knowledge of React Native and Expo app development. It is targeted for Android, mainly because I used Toasts. This app uses location, mapview and markers to "call" air strikes.  You can also view given strikes in "Read coordinates" screen and delete them if necessary. All data is stored in firebase and also retrieved from it.


### Built With

* [React-Native](https://reactnative.dev/)
* [Expo](https://expo.dev/)
* [Firebase](https://firebase.google.com/)


## Getting Started

To get this app to work locally follow these simple example steps.



### Installation
 
1. Clone the repo
   ```sh
   git clone https://github.com/Gittomi/imot-guiding-sys
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start server from `./imot-guiding-sys`
   ```sh
   npm start
   ```
4. Use _Expo Go_ via android device to use imot-guiding-system app.


## Usage

After login HomeLocationScreen is opened and user has two options: "Call air strike" or "Read coordinates". In MarkMapScreen authenticated users can call imaginary "air strikes" by long pressing map. Marker is set to pressed location and these coordinates are sent to firebase. User can delete markers also from map and coordinates are deleted from firebase also. In ReadMarkedPointsScreen data is retrieved from firebase and user can scroll all coordinates and if necessary delete them. There are screenshots below from screens.

<table>
  <tr>
    <td></td>
     <td></td>
  </tr>
  <tr>
    
  </tr>
 </table>


## License

Distributed under the MIT License.

## Contact

-Tomi Niemela 
