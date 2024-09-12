import { useEffect, useState } from "react";
import Modal from "./ui/Modal";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import columns from "./data-columns";
import styles from "../page.module.css";

export default function DataTable() {
  const [modal, showModal] = useState(false);
  const [data, setData] = useState([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const handleModal = () => {
    showModal(!modal);
  };

  useEffect(() => {
    fetch("https://66dbffa347d749b72aca79e6.mockapi.io/api/v1/crypto")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
  });

  const handleFilterChange = (columnId: string, value: string) => {
    setColumnFilters((prev) => [
      ...prev.filter((filter) => filter.id !== columnId),
      { id: columnId, value },
    ]);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSorting([{ id: "name", desc: e.target.value === "desc" }]);
  };

  const handleRestore = () => {
    setColumnFilters([]);
    setSorting([]);
  };

  return (
    <>
      <div className={styles.header}>
        <div>
          <hgroup className={styles.hgroup}>
            <button
              onClick={() => handleFilterChange("name", "")}
              className={styles.selectorbtn}
            >
              All
            </button>
            <button
              onClick={() => handleFilterChange("name", "BTC")}
              className={styles.selectorbtn}
            >
              BTC
            </button>
            <button
              onClick={() => handleFilterChange("name", "ETH")}
              className={styles.selectorbtn}
            >
              ETH
            </button>
            <button
              onClick={() => handleFilterChange("name", "SOL")}
              className={styles.selectorbtn}
            >
              SOL
            </button>
          </hgroup>
        </div>

        <button onClick={handleModal} className={styles.addBtn}>
          Add crypto
        </button>
        {modal ? <Modal /> : ""}
      </div>
      <div className={styles.flex_center}>
        <div className={styles.table_header}>
          <div className={styles.input_div}>
            <input
              className={styles.input}
              type="text"
              placeholder="Search"
              onChange={(e) => handleFilterChange("name", e.target.value)}
            />
            <img className={styles.search_icon} src="/search.svg" alt="" />
          </div>

          <div className={styles.input_div}>
            <label htmlFor="currency">Currency:</label>
            <input
              placeholder="USD"
              className={styles.input_currency}
              type="text"
              onChange={(e) => handleFilterChange("currency", e.target.value)}
            />
            <img src="/currency.svg" alt="" />
          </div>

          <div className={styles.input_div}>
            <label htmlFor="sort">Sort by:</label>
            <select
              className={styles.input_sort}
              name="sort"
              id="sort"
              onChange={handleSortChange}
            >
              <option className={styles.select_option} value="asc" selected>
                Ascending
              </option>
              <option className={styles.select_option} value="desc">
                Descending
              </option>
            </select>
            {/* <img className="" src="/sort.svg" alt="" /> */}
          </div>

          <div>
            <img
              src="/restore.svg"
              alt=""
              onClick={handleRestore}
              style={{ cursor: "pointer" }}
            />{" "}
          </div>
        </div>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
