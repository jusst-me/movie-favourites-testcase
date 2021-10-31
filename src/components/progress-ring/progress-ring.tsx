import { useState } from 'react';
import ReactVisibilitySensor from 'react-visibility-sensor';
import './progress-ring.scss';

type Props = {
    progress: number;
    size?: number
    strokeWidth?: number
}

const ProgressRing = ({ progress = 0, size = 88, strokeWidth = 5 }: Props) => {
    const [counter, setCounter] = useState<number>(0);

    /* Start counting up to target progress when component is visible on screen */
    const onVisibilityChange = (isVisible: boolean) => {
        if (isVisible && counter === 0) {
            const addToCounter = (count: number) => {
                if (count + 1 <= progress) {
                    setTimeout(() => {
                        setCounter(count + 1);
                        addToCounter(count + 1);
                    }, 12)
                }
            }
            addToCounter(counter);
        }
    }

    const radius = (size - strokeWidth) / 2;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - dashArray * counter / 100;

    return (
        <ReactVisibilitySensor partialVisibility onChange={onVisibilityChange}>
            <svg className="progress-ring" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle
                    className="progress-ring__background"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`} />
                <circle
                    className="progress-ring__progress"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={`${strokeWidth}px`}
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    style={{
                        strokeDasharray: dashArray,
                        strokeDashoffset: dashOffset
                    }} />
                <text
                    className="progress-ring__text"
                    x="50%"
                    y="50%"
                    dy=".3em"
                    textAnchor="middle">
                    {`${counter}/100`}
                </text>
            </svg>
        </ReactVisibilitySensor>
    )
}

export default ProgressRing;