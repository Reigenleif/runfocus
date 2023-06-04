import { useEffect, useState } from "react"

export const useMapUtil = () => {
    const [error,setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [currentLoc, setCurrentLoc] = useState<[number,number]>([0,0])

    useEffect(() => {
        setLoading(true)
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser")
            return 
        } 
        navigator.geolocation.getCurrentPosition((position) => {
            setCurrentLoc([position.coords.latitude,position.coords.longitude])
            setLoading(false)
        },() => {
            setError("Unable to retrieve your location")
            setLoading(false)
        })
    },[])

    return {
        loading,
        error,
        currentLoc
    }
}