export default function Navbar({page, setPage} : {page: Number, setPage: React.Dispatch<React.SetStateAction<0 | 2 | 1>>}) {

    return (
        <nav>
            <ul>
                <li onClick={() => setPage(0)} style={{textDecoration: page === 0 ? 'underline' : 'initial'}}>Coffee</li>
                <li onClick={() => setPage(1)} style={{textDecoration: page === 1 ? 'underline' : 'initial'}}>Tea</li>
                <li onClick={() => setPage(2)} style={{textDecoration: page === 2 ? 'underline' : 'initial'}}>My Favorites</li>
            </ul>
        </nav>
    )
}