
import "./Die.css"
export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return (
        <>
        <div style={styles} onClick={ props.holdDice } className="die-face" >
        <h2 className="die-num">{props.value}</h2>
        </div>
            
        </>
    )
}
