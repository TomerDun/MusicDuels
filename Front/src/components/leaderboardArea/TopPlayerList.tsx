import TopPlayerCard from "./TopPlayerCard"


function TopPlayerList(){
    return(
        <div id="list-container" className="flex flex-row mb-12 justify-center gap-8">
            <TopPlayerCard placement={2}/>
            <TopPlayerCard placement={1}/>
            <TopPlayerCard placement={3}/>
        </div>
    )
}

export default TopPlayerList