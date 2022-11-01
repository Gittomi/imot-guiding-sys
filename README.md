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
   <td><img src="https://user-images.githubusercontent.com/91623447/199251294-c19e14b6-60b1-405a-a09f-65792b7b23b8.jpg"width=270 height=480></td>
     <td><img src="https://user-images.githubusercontent.com/91623447/199251472-04077beb-4058-465b-9143-6cdcb12ca252.jpg"width=270 height=480></td>
    <td><img src="https://user-images.githubusercontent.com/91623447/199251561-bc285eb9-7a2a-4ba9-b39a-03aa67f07bec.jpg"width=270 height=480></td>
       <td><img src="https://user-images.githubusercontent.com/91623447/199251636-baddc497-b596-4eee-9be0-38ea4fc85829.jpg"width=270 height=480></td>
<td><img src="https://user-images.githubusercontent.com/91623447/199251744-121d3d90-f455-4ecf-a90f-74a5e466fcbd.jpg"width=270 height=480></td>
  </tr>
   <tr>
    <td>Login</td>
     <td>HomeLocationScreen</td>
     <td>MarkMap</td>
     <td>MarkMap</td>
     <td>ReadMarkedPoints</td>
  </tr>
 </table>


## License

Distributed under the MIT License.

## Contact

-Tomi Niemela 
