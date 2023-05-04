export const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" onClick={prevPage} href="#">
              Previous
            </a>
          </li>
          {pageNumbers.map((pgNumber, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === pgNumber ? "active" : ""
              } `}
            >
              <a
                onClick={() => setCurrentPage(pgNumber)}
                className="page-link"
                href="#"
              >
                {pgNumber}
              </a>
            </li>
          ))}
          <li className="page-item" onClick={nextPage}>
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
