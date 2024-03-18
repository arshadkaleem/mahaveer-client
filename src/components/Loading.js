"use client";
// import LottiePlayer from "@lottiefiles/react-lottie-player";
import animation from "../../public/animation.json";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const Loading = () => {
  //   const animationURL = animation;
  return (
    <div>
      <Player
        autoplay
        loop
        src={animation}
        style={{ height: "300px", width: "300px" }}
      >
        {/* <Controls
          visible={true}
          buttons={["play", "repeat", "frame", "debug"]}
        /> */}
      </Player>
    </div>
  );
};

export default Loading;
