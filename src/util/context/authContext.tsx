import { createContext, useEffect, useState } from "react";

interface AuthContextValue {
    name: string
    ate: (string|number)[]
    setName: (a: string) => void,
    addAte: (a: number|string) => void,
    resetAte: () => void
}

const AuthContext = createContext({
    name: "",
    ate: [1,""],
    setName: (a: string) => {},
    addAte: (a: number|string) => {},
    resetAte: () => {}
})

export default AuthContext

export const AuthContextProvider = ({children} : {children: JSX.Element}) => {
    const [name,setNameState] = useState('')
    const [ate,setAteState] = useState<(number|string)[]>([])
    
    const setName = (newName: string) => {
        console.log('asdaa')
        localStorage.setItem('name',newName)
        
        setNameState(newName)
    }

    const addAte = (newAte: number | string) => {
        const ateTmp = [...ate]
        ateTmp.push(newAte)
        localStorage.setItem('ate',JSON.stringify(ateTmp))
        setAteState(ateTmp)
    }

    const resetAte = () => {
        localStorage.setItem('ate',JSON.stringify([]))
        setAteState([])
    }

    useEffect(() => {
        const nameTmp = localStorage.getItem('name')
        if (!nameTmp) {
            return
        }

        const nameData = nameTmp
        
        setNameState(nameData)
        if (nameData) {
            setNameState(nameData)
        }

        const ateTmp = localStorage.getItem('ate')
        if (!ateTmp) {
            return
        }

        const ateData = JSON.parse(ateTmp) 
        if (ateData) {
            setAteState(ateData)
        }
    },[])    

    return <AuthContext.Provider value={{name,ate,setName,addAte,resetAte}}>{children}</AuthContext.Provider>

}