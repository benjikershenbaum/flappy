import React from 'react'
import classnames from 'classnames'

export default function OtherBird(props) {
	let { height = 0, rotation = 0 } = props;
    let style = {
    	transform: `translate(0, ${-height}px) rotate(${rotation}deg)`,
		opacity: 0.5,
    }
    let classes = classnames({
    	'bird': true,
    })
	return (
		<div className={classes} style={style}></div>
	)
}