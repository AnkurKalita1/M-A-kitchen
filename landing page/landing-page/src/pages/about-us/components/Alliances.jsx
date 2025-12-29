import allianceImage from "../../../assets/alliances.png"

function Alliances() {
    return (
        <div className="w-full min-h-[90vh] flex flex-col items-center justify-center "
        style={{
            backgroundImage: `url(${allianceImage})`,
            backgroundPosition: 'cover',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat'
        }}
        >
            

           
        </div>
    )
}

export default Alliances;