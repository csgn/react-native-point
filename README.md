# react-native-point

```js
<Point
  onStart={() => {
    console.log("START");
  }}
  onMove={(event, gesture, pan) => {
    console.log(event, gesture, pan);
  }}
  onRelease={() => {
    console.log("RELEASE");
  }}
/>
```
