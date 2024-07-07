import spinner from './assets/spinner.gif'

export default function Loading(){
    return (
        <div className="flex-col flex justify-center items-center h-screen">
            <img src={spinner} alt="Spinner" />
        </div>
    )
}