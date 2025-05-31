export default function SearchForm() {
    return (
        <form action="" className="search d-flex flex-grow-1">
            <i className="bi bi-search"></i>
            <input type="text" className="search-input" placeholder="Поиск по обьявлениям"/>
            <input type="submit" value="Найти" className="btn-search"/>
        </form>
    )
}