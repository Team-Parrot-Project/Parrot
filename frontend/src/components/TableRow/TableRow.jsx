import './TableRow.css'

export default function TableRow({ cellClass, rowClass, row }) {

    cellClass = cellClass || "defaulf-cell-class";
    rowClass = rowClass || "default-row-class";

    // return (<div className='bird-test'></div>)

    return (
        <>
            <div className={rowClass}>
                {row.map((cellContent, ix) => {
                    return (
                        <div key={ix} className={cellClass}>
                            {cellContent}
                        </div>
                    )
                })}
            </div>
        </>
    )
}