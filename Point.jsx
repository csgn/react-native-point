import { useEffect, useRef, useState } from "react";
import { StyleSheet, Animated, PanResponder } from "react-native";

export default function Point({
  colors = {
    defaultColor: "black",
    activeColor: "red",
  },
  size = {
    defaultSize: 22,
    activeSize: 32,
  },
  border = {
    defaultBorder: 2,
    activeBorder: 5,
  },
  onStart,
  onMove,
  onRelease,
}) {
  const pan = useRef(new Animated.ValueXY()).current;

  const [dragging, setDragging] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gs) => {
        setDragging(true);
        onStart?.();
      },
      onPanResponderMove: (e, gs) => {
        onMove?.(e, gs, pan);
        Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(e, gs);
      },
      onPanResponderRelease: () => {
        pan.extractOffset();
        setDragging(false);
        onRelease?.();
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.point,
        {
          borderWidth: dragging ? border.activeBorder : border.defaultBorder,
          width: dragging ? size.activeSize : size.defaultSize,
          height: dragging ? size.activeSize : size.defaultSize,
          borderColor: dragging ? colors.activeColor : colors.defaultColor,
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        },
      ]}
      {...panResponder.panHandlers}
    ></Animated.View>
  );
}

const styles = StyleSheet.create({
  point: {
    position: "absolute",
    width: 22,
    height: 22,
    borderWidth: 3,
    backgroundColor: "transparent",
    borderRadius: 100,
  },
});
