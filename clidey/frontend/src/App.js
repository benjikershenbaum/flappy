import React, { useCallback, useEffect, useState } from 'react'
import classnames from 'classnames'
import Bird from './components/Bird'
import OtherBird from './components/OtherBird'
import Piping from './components/Piping'
import Menu from './components/Menu'
import io from "socket.io-client";

const useFlappyBackend = () => {
  const [ me, setMe] = useState();
  const [ others, setOthers ] = useState();

  useEffect(() => {
    const socket = io.connect("https://code-1-26-p4000.clidey.com");
    console.log("CONNECTING");
    console.log(socket.id, socket.connected); // undefined

    socket.on("connect", () => {
      console.log(socket.id, socket.connected); // undefined
      socket.on("bird/me", (data) => {
        console.log(data, "me");
      })
      socket.on("connect_error", (data) => {
        console.log(data);
      })
      socket.on("disconnect", () => {
        console.log("disconnect")
      });
    });
  }, []);

  return { me, others };
}

export default function App({ state, actions, record }) {
    let { me, others } = useFlappyBackend();
    let { bird, pipings, game, player, otherBirds } = state
    let { FLY_UP, START_PLAY } = actions
    let recordState = record.getRecord()
    let { isRecording, history } = recordState
    let isPlaying = game.status === 'playing'
    let onReplay = history.length > 0 && record.replay
    let landClasses = classnames({
      land: true,
      sliding: isPlaying,
    })

    const onFlyUp = useCallback(() => {
      if (isPlaying && !isRecording) FLY_UP();
    }, [isPlaying, isRecording]);
    
    useEffect(() => {
      document.addEventListener("keydown", (e) => {
        if(e.key === " ") onFlyUp()
       });
    }, [onFlyUp]);

    return (
      <div className="game">
        <div className="scene" onMouseDown={onFlyUp} onTouchStart={onFlyUp}>
            { isPlaying &&
              <div className="score">{player.score}</div>
            }
            <Bird {...bird} isFlying={isPlaying}  />
            {
              otherBirds.map(otherBird => (
                <OtherBird {...otherBird} />
              ))
            }
            {
              pipings.list.map(piping => <Piping key={piping.timestamp} {...piping} />)
            }
            <div className={landClasses} />
            { game.status === 'over' &&
              <Menu score={player.score} onPlay={START_PLAY} onReplay={onReplay} onReverse={record.reverse} />
            }
        </div>
      </div>
    )
}