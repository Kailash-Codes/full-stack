import { useEffect, useRef, useState } from "react";
import {
  booksApi,
  useDeleteBookMutation,
  useEditBookMutation,
  useGetAllBooksQuery,
  useLazyGetBookByIdQuery,
} from "./services/booksApi";
import { Dialog } from "./types/Dialog";
import DialogComponent from "./components/Dialog";
import Loading from "react-loading";

const App = () => {
  // useSelector((state) => console.log(state));
  const [DialogProps, setDialogProps] = useState<Dialog>({
    agree: false,
    open: false,
  });
  const [detailsDialogProps, setDetailsDialogProps] = useState<Dialog>({
    agree: false,
    open: false
  });
  const [editData, setEditData] = useState({});
  const [edit, setEdit] = useState<boolean>(false);
  const [editDialogProps, setEditDialogProps] = useState<Dialog>({
    agree: false,
    open: false,
  });
  const idRef = useRef("");
  const { isLoading, data, error, isError, refetch } =
    useGetAllBooksQuery("all");
  const [fetchData, { isLoading: singleIsLoading, data: singleData }] =
    useLazyGetBookByIdQuery();
  const [
    deleteBook,
    { isLoading: isDeleting, isSuccess: isDeleted, isError: isDeleteFail },
  ] = useDeleteBookMutation();
  const [
    editBook,
    { isLoading: isEditing, isSuccess: isEditSuccess, isError: isEditError },
  ] = useEditBookMutation();

  //------------------------------
  useEffect(() => {
    // console.log(books)
    // console.log(booksApi?.endpoints?.getAllBooks);
  }, []);
  //------------------------------
  useEffect(() => {
    if (DialogProps.agree) {
      deleteBook(idRef.current);
    }
  }, [DialogProps.agree]);

  //setting single data for edit
  useEffect(() => {
    console.log(edit)
    if (edit) {
      setEditData(singleData as any);
    }
  }, [singleData, edit]);
  useEffect(() => {
    if (editDialogProps.agree) {
      editBook({ id: idRef.current, patch: editData });
    }
  }, [editDialogProps.agree]);
  return (
    <>
      {isDeleting && <p>Deleting...</p>}
      {isEditing && <p>Editing....</p>}
      {isLoading
        ? "Loading"
        : data instanceof Array && (
          <>
            {DialogProps.open && (
              <DialogComponent
                setEdit={setEdit}
                title="Remove book"
                className=""
                isDelete
                setState={setDialogProps}
              >
                <p>sd</p>
              </DialogComponent>
            )}
            {editDialogProps.open && (
              <DialogComponent
                setEdit={setEdit}
                isDelete={false}
                title="Remove book"
                className=""
                setState={setEditDialogProps}
              >
                <div>
                  <div className="group">
                    <label htmlFor="bookName">Book Name: </label>
                    <input
                      type="text"
                      onChange={(e: any) =>
                        setEditData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="border"
                      id="bookName"
                      value={editData?.name || ""}
                    />
                  </div>
                  <div className="group">
                    <label htmlFor="bookAuthor">Book Author: </label>
                    <input
                      onChange={(e: any) =>
                        setEditData((prev) => ({
                          ...prev,
                          author: e.target.value,
                        }))
                      }
                      type="text"
                      className="border"
                      id="bookAuthor"
                      value={editData?.author || ""}
                    />
                  </div>
                </div>
              </DialogComponent>
            )}
            {/* //details dialog */}
            {detailsDialogProps.open && (
              <DialogComponent
                setEdit={setEdit}
                isDelete={false}
                title=""
                className=""
                setState={setDetailsDialogProps}
              >
                <h3 className="font-semibold text-lg">Details</h3>
                <div className="group">
                  <label>Book Name</label>
                  <p>{singleData?.name}</p>
                </div>
                <div className="group">
                  <label>Book Author</label>
                  <p>{singleData?.author}</p>
                </div>
              </DialogComponent>
            )}

            {/* //details dialog end */}
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
                      <button
                        onClick={() => {
                          idRef.current = book.id;
                          setEdit(true);
                          setEditDialogProps((props) => ({
                            ...props,
                            open: true,
                            agree: false
                          }));
                          fetchData(book.id);
                        }}
                        className="mr-2 bg-blue-400 rounded-sm px-3 py-1 my-1 hover:bg-blue-600  hover:text-white"
                      >
                        {" "}
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          fetchData(book.id);
                          setDetailsDialogProps((prev) => ({ ...prev, open: true, agree: false }))
                        }}
                        className="mr-2 bg-green-400 rounded-sm px-3 py-1 my-1 hover:bg-green-600  hover:text-white"
                      >
                        {" "}
                        Details
                      </button>
                      <button
                        onClick={() => {
                          idRef.current = book.id;
                          setDialogProps((props) => ({
                            ...props,
                            agree: false,
                          }));
                          setDialogProps((props) => ({
                            ...props,
                            open: true,
                          }));
                        }}
                        className=" bg-red-400 rounded-sm px-3 py-1 my-1 hover:bg-red-600  hover:text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

    </>
  );
};
export default App;
