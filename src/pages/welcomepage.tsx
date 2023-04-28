import { useState } from "react";
import { Player } from '@lottiefiles/react-lottie-player';

export default function welcomePage() {

    return(
        <>
            <Player
                keepLastFrame
                autoplay
                src="https://assets5.lottiefiles.com/packages/lf20_d8cmv6qa.json"
                style={{ height: '400px', width: '400px' }}
            >
            </Player>

        </>

    )

}