import React from 'react';
import './TableRow.css'

export default function TableRow({ handleClick, cellClass, rowClass, row, rowElement, cellClasses }) {

  cellClass = cellClass || "defaulf-cell-class";
  rowClass = rowClass || "default-row-class";

  function localClick(e) {
    if (handleClick) {
      handleClick(e, rowElement)
    }
  }

  return (
    <>
      <div className={rowClass}>
        {row.map((cellContent, ix) => {
          return (
            <div key={ix}
              onClick={(e) => { localClick(e) }}
              className={(cellClasses && cellClasses[ix]) ? cellClasses[ix] : cellClass}
            >
              {cellContent}

            </div>
          )
        })}
      </div>
    </>
  )
  
}
