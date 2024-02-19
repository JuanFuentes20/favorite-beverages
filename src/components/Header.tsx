import Navbar from "./Navbar";

export default function Header({page, setPage} : {page: Number, setPage: React.Dispatch<React.SetStateAction<0 | 2 | 1>>}) {

    return (
        <header>
            <Navbar page={page} setPage={setPage}/>
            <img className="background-image" alt="Person filling glass container" src="coffeeImage.jpg"></img>
            <div className="wrapper">
                {page === 0 ? <h1>My favorite coffee</h1> : (page === 1) ? <h1>My favorite tea</h1>: <h1>My favorites</h1>}
            </div>
        </header>
    )
}