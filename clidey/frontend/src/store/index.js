import { createStore as cS } from 'relite'
import {FLY_UP, PLAYING, START_PLAY, MOVE_OTHER_BIRD_UP} from './actions'

export const createStore = (initialState) => {
    return cS({
        FLY_UP,
        PLAYING,
        START_PLAY,
        MOVE_OTHER_BIRD_UP
    }, initialState)
}