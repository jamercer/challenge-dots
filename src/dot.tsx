import { CSSProperties } from "react";

export interface point {
	x: number,
	y: number,
  }

export default function dot(style: CSSProperties, key:React.Key, notSet?: boolean, initStyle?: CSSProperties) {
	if (notSet) { // time to get groovy
		return <div className='dot' style={style} key={key}></div>	
	}
	return <div className='dot' style={style} key={key}></div>
}