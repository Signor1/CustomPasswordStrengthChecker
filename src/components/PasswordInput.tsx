import { useEffect, useMemo, useState } from "react"
import { allRequirements } from "./AllRequirement"
import { Eyes } from "./atoms/Eyes"
import { EyesClose } from "./atoms/EyesClose"
import Check from "./atoms/Check"
import Circle from "./atoms/Circle"
import Copy from "./atoms/Copy"
import Copied from "./atoms/Copied"


const PasswordInput = () => {
    //states
    const [password, setPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [allRequirement, setAllRequirement] = useState<boolean>(false)
    const [isCopied, setIsCopied] = useState<boolean>(false)
    const [count, setCount] = useState<number>(0)

    // useMemo for storing the array value
    const requirements = useMemo(() => allRequirements, [])

    //updating password change
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword)
    }

    //toggle the visibility of password
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    // async function clipboard copy
    const copyTextToClipboard = async (text: string) => {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    //handle copy to clipboard
    const handleCopy = () => {
        copyTextToClipboard(password).then(() => {
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 3000);
        }).catch((err) => {
            console.log(err);
        });
    }

    //checking for all requirements
    useEffect(() => {
        const allAreMet = requirements.every((req) => req.regex.test(password));
        setAllRequirement(allAreMet);
    }, [password, requirements])



    //filtering reached requirement
    useEffect(() => {
        const counted = requirements.filter((req) => req.regex.test(password))
        setCount(counted.length);
    }, [count, password, requirements])

    return (
        <section className="block md:w-[500px] w-full px-6 py-10 rounded-lg shadow border bg-gray-800 border-gray-700 ">
            <div className="relative">
                {/* Copy to clipboard */}
                <div onClick={handleCopy} className="absolute left-2 bottom-4 cursor-pointer text-gray-400">
                    <Copy />
                </div>
                <input type={showPassword ? 'text' : 'password'}
                    placeholder="Create Strong Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="border-2 text-base rounded-lg block w-full pl-8 py-3.5 pr-12 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:border-gray-400 transition-all duration-200" />
                {/* toggle hide or show password button */}
                <div onClick={togglePasswordVisibility} className=" absolute right-4 bottom-4 cursor-pointer text-gray-400">
                    {
                        showPassword ? <Eyes /> : <EyesClose />
                    }
                </div>
            </div>
            {/* Strength checker  */}
            <div className={`h-0.5 mt-3 rounded-lg ${count <= 2 ? "bg-red-600" : count > 2 && count <= 4 ? "bg-yellow-500" : "bg-green-600"}`}
                style={{ width: `calc(20% * ${count})` }}>
            </div>

            {/* Show on succcessful copy */}
            <Copied isCopied={isCopied} />

            <main className="w-full flex flex-col mt-2 gap-4">
                <p className="text-gray-300 font-medium">Password must contain:</p>
                <ul className="flex flex-col w-full gap-3 md:ml-6">
                    {
                        requirements.map((req, index) => (
                            <li key={index}
                                className={`md:text-base font-light text-sm gap-2 flex items-center justify-start ${req.regex.test(password) ? 'text-green-600' : 'text-gray-300'}`}>
                                {req.regex.test(password) ? <Check /> : <Circle />}
                                <span>{req.text}</span>
                            </li>
                        ))
                    }
                </ul>
                <div className="w-full flex justify-center items-center mt-6">
                    <button disabled={!allRequirement} className="disabled:cursor-not-allowed disabled:opacity-40 bg-green-700 text-white uppercase text-sm px-10 py-3 rounded-lg">Submit</button>
                </div>
            </main>
        </section>
    )
}

export default PasswordInput