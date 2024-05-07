export default function Skeleton(){
    return <div>
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 50"
        width="200"
        height="50"
        >

        <rect x="20" y="20" width="160" height="10" rx="5" fill="#e0e0e0">
            <animate
            attributeName="width"
            values="20; 160; 20"
            dur="2s"
            repeatCount="indefinite"
            />
        </rect>
        </svg>
    </div>
}