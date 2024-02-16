import { useDeleteBookMutation, useGetAllBooksQuery, useLazyGetBookByIdQuery } from "./services/booksApi";

const App = () => {
  const { isLoading, data, error, isError } = useGetAllBooksQuery("all");
  const [fetchData, { isLoading: singleIsLoading, data: singleData }] = useLazyGetBookByIdQuery();
  const [deleteBook, { isLoading: isDeleting, isSuccess: isDeleted, isError: isDeleteFail }] = useDeleteBookMutation();
  return (
    <>
      {isLoading
        ? "Loading"
        : data instanceof Array && (
          <>
            <table className="w-[100vw]">
              <thead>
                <tr className="bg-gray-100 min-h-[60px]">
                  <th className="h-[40px]">S.N</th>
                  <th>Book Name</th>
                  <th>Book Author</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((book: any, index) => (
                  <tr className=" border text-center " key={index}>
                    <td className="min-h-[30px]">{index + 1}</td>
                    <td>{book.name}</td>
                    <td>{book.author}</td>
                    <td>
                      <button className="mr-2 bg-blue-400 rounded-sm px-3 py-1 my-1 hover:bg-blue-600  hover:text-white">
                        {" "}
                        Edit
                      </button>
                      <button onClick={() => fetchData(book.id)} className="mr-2 bg-green-400 rounded-sm px-3 py-1 my-1 hover:bg-green-600  hover:text-white">
                        {" "}
                        Details
                      </button>
                      <button onClick={() => deleteBook(book.id)} className=" bg-red-400 rounded-sm px-3 py-1 my-1 hover:bg-red-600  hover:text-white">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      {isError && alert("Something went wrong" + error)}
      <div className="detail">
        {singleIsLoading ? "Loading.. detail" : singleData && (
          <>
            <p>{singleData.name}</p>
            <p>{singleData.author}</p>
          </>
        )}
      </div>
      <div className="delete-mes">
        {isDeleting ? "deleting" : isDeleted && <p>Successfully deleted</p>}
        {isDeleteFail && "Delete failed"}
      </div>
    </>
  );
};

export default App;
