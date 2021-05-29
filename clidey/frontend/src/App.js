import React, { useCallback, useEffect } from 'react'
import classnames from 'classnames'
import Bird from './components/Bird'
import OtherBird from './components/OtherBird'
import Piping from './components/Piping'
import Menu from './components/Menu'

export default function App({ state, actions, record }) {
    let { bird, pipings, game, player, otherBirds } = state
    let { FLY_UP, START_PLAY, MOVE_OTHER_BIRD_UP } = actions
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

    const onMoveOtherBirdUp = useCallback(() => {
      MOVE_OTHER_BIRD_UP();
    })
    
    useEffect(() => {
      onMoveOtherBirdUp()
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
            {/* {
              otherBirds.map(otherBird => ( */}
                <OtherBird {...otherBirds} />
              {/* )) */}
            {/* } */}
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