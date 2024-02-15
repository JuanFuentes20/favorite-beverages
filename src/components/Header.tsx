import Navbar from "./Navbar";

export default function Header() {

    return (
        <header>
            <Navbar />
            <img className="background-image" alt="Person filling glass container" src="coffeeImage.jpg"></img>
            <div className="wrapper">
                <h1>My favorite coffee</h1>
            </div>
        </header>
    )
}