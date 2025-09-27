type props = {
    value: boolean,
    onClick: Function,
    answerValue?: boolean | string,
    playing: boolean,
    showAnswer: boolean,
    disabled: boolean,
    text?: string,    
}

export default function DrumMachineTile({value, answerValue, onClick, playing, showAnswer, disabled, text=''}: props) {
    return (
        <div onClick={() => onClick(value)} className={`drum-tile interactive ${value && 'active'} ${playing && 'on-beat'} ${showAnswer && (value === answerValue ? 'correct' : 'incorrect')} ${disabled && 'disabled'}`}>
            {text}
        </div>

        // <div key={tileIndex} onClick={() => updateSequence(rowIndex, tileIndex)} className={`drum-tile interactive ${tileValue && 'active'} ${(currBeat == tileIndex && beatType === 'player') && 'on-beat'}`}>{SOUNDS[rowIndex][0]}</div>
    )
}