type CopiedProps = {
    isCopied: boolean
}

const Copied = ({ isCopied }: CopiedProps) => {
    return (
        <p className={`text-green-600 text-xs flex items-center mt-2 ml-2 transition-opacity duration-200 gap-1 ${isCopied ? 'opacity-100' : 'opacity-0'}`}>
            Password Copied
            <svg width="15" height="15" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
                    <path d="M10 44h28a2 2 0 0 0 2-2V14H30V4H10a2 2 0 0 0-2 2v36a2 2 0 0 0 2 2ZM30 4l10 10" />
                    <path d="m17 29l6 5l9-11" />
                </g>
            </svg>
        </p>
    )
}

export default Copied