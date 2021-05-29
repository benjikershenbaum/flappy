import { createStore as cS } from 'relite'
import {FLY_UP, PLAYING, START_PLAY} from './actions'

export const createStore = (initialState) => {
    return cS({
        FLY_UP,
        PLAYING,
        START_PLAY,
    }, initialState)
}