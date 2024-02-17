import React from 'react'

type Props = {
    children: React.ReactNode;
    title: string;
    setState: (state: any) => void;
    className: string;
    isDelete: boolean;
    hasActionbar?: boolean;
    setEdit?: (v: boolean) => void;
}
const Dialog = ({ setEdit, isDelete, children, title, setState, className, hasActionbar = true }: Props) => {
    const handleCloseDialog = (reason: string) => {
        if (reason == "ok") {
            setEdit(false);

            setState((prev: any) => {
                return {
                    ...prev,
                    agree: true,
                    open: false,
                }
            });
        }
        else {
            setEdit(false);
            setState((prev: any) => {
                return {
                    ...prev,
                    agree: false,
                    open: false,
                }
            });
        }
    }
    return (
        <div className="absolute max-w-[450px]  ml-[50%] -translate-x-[50%] min-w-[300px] mt-48 mx-auto bg-white p-1 rounded border shadow-lg"  >
            <div className="min-h-[120px]">

                <div className="h3">{title}</div>

                <div>{children}</div>
            </div>
            <hr />
            {hasActionbar && (
                <>
                    {isDelete ? <button className='px-3 py-1 bg-red-500 hover:bg-red-600 hover:text-white' onClick={() => handleCloseDialog("ok")} >OK</button> : <button className='px-3 py-1 bg-gray-300 hover:bg-gray-600 hover:text-white' onClick={() => handleCloseDialog("ok")} >OK</button>}
                </>
            )}

            <button className='px-3 py-1 bg-blue-500 hover:bg-blue-600 hover:text-white' onClick={() => handleCloseDialog("cancel")}>Cancel</button>
        </div>
    )
}

export default Dialog