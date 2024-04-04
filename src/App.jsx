import { useCallback, useEffect, useState, useRef} from 'react'

function App() {

    // Declaring the useState variables
    const [passLength, setPassLength] = useState(8);
    const [numberChecked, setNumberChecked] = useState(false);
    const [characterChecked, setCharacterChecked] = useState(false);
    const [password, setPassword] = useState("");
    const [buttonText, setButtonText] = useState("Copy")

    //useRef hook
    const passwordReference = useRef(null);

    // passwordGenerator function 
    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if (numberChecked) str += "0123456789"
        if (characterChecked) str += "!@#$%^&*()_-+=/*[]{}<>,.\`~"

        for (let i = 1; i <= passLength; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char)
        }

        setPassword(pass);

    }, [passLength, numberChecked, characterChecked, setPassword])


    // Function to copy the generated password to clipboard
    const copyPasswordToClipboard = useCallback(() => {
        passwordReference.current?.select();
        passwordReference.current?.setSelectionRange(0, passLength);
        window.navigator.clipboard.writeText(password);
        setButtonText("Copied")
    }, [password])
    
    // Calling the function generator function everytime there is a change is the dependencies
    useEffect(() => {
        passwordGenerator()
    }, [passLength, numberChecked, characterChecked, passwordGenerator])

    // When the password field changes the button field changes to "Copy" again
    useEffect(() => {
        setButtonText("Copy")
    }, [password])

    return (
        <>
            <div className='w-full max-w-md mx-auto rounded-xl px-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-700 text-orange-400 py-6 text-center'>

                <h2 className='text-3xl font-bold text-white'>Password Generator</h2>

                <div className='flex rounded-lg overflow-hidden mb4 p-5'>

                    <input
                    type='text'
                    value={password}
                    className='outline-none w-full py-1 px-3 rounded-lg font-semibold'
                    placeholder='Password'
                    readOnly
                    ref={passwordReference}
                    />

                    <button 
                    className='outline-none bg-blue-600 text-white px-3 py-1 shrink-0 rounded-lg ml-1 hover:bg-blue-800 duration-300'
                    onClick={copyPasswordToClipboard}
                    >{buttonText}</button>

                </div>

                <div className='flex text-medium font-semibold text-center w-fit mx-auto align-middle'>
                    <div className='flex items-center m-1'>
                        <input 
                        type='range'
                        min={6}
                        max={18}
                        value={passLength}
                        id='rangeInput'
                        className='cursor-pointer'
                        onChange={(e) => {
                            setPassLength(e.target.value)
                            // console.log(e.target.value)
                        }}
                        />
                        <label htmlFor='rangeInput'>Length: <span className='text-white'>{passLength}</span></label>
                    </div>

                    <div className='m-1'>
                        <input
                        type='checkbox'
                        defaultChecked = {numberChecked}
                        id='numInput'
                        onChange={() => {
                            setNumberChecked((previousVal) => !previousVal);
                            // console.log(numberChecked, !numberChecked)
                        }}
                        />
                        <label htmlFor='numInput'>Number</label>
                    </div>

                    <div className='m-1'>
                        <input
                        type='checkbox'
                        defaultChecked = {characterChecked}
                        id='charInput'
                        onChange={() => {
                            setCharacterChecked((previousVal) => !previousVal);
                        }}
                        />
                        <label htmlFor='charInput'>Character</label>
                    </div>
                </div>
                <div className='w-11/12 mx-auto p-2'>
                    <p className='text-gray-400 font-semibold mt-2'>- Change any values to generate the Password</p>
                    <p className='text-gray-400 font-semibold mt-1.5'>- Click on <span className='bg-blue-600 p-1 rounded-lg align-middle text-white font-normal'>Copy</span> to copy the generated password to clipboard</p>
                </div>
            </div>
        </>
    )
}

export default App
