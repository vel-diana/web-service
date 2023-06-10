const ProgressBar = ({ progress }) => {
    const colors = [
        'rgb(254, 255, 229)',
        'rgb(168, 230, 207)',
        'rgb(157, 171, 220)'
    ]

    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    return (
        <div className="outer-bar">
            <div className="inner-bar"
                style={{width: `${progress}%`, backgroundColor: randomColor
            }}
            >

            </div>
        </div>
    );
}

export default ProgressBar