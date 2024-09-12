import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";

type Crypto = {
  id: number;
  assets: string;
  name: string;
  price: number;
  total_vol: number;
  market_cap_change: number;
  one_hour: number;
  twenty_four_hour: number;
  seven_day: number;
  logo_link: string;
};

const columnHelper = createColumnHelper<Crypto>();

const columns = [
  columnHelper.accessor("logo_link", {
    header: () => "Assets",
    cell: (info) => (
      <div className="">
        <Image src={`${info.renderValue()}`} alt={""} width={20} height={20} />
      </div>
    ),
  }),
  columnHelper.accessor("name", {}),

  columnHelper.accessor("price", {
    header: () => "Price",
    cell: (info) => <div className="">${info.renderValue()}</div>,
  }),

  columnHelper.accessor("total_vol", {
    header: () => "Total Volume",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("market_cap_change", {
    header: () => "Market Cap Change",
    cell: (info) => <div className="">{info.renderValue()} %</div>,
  }),
  columnHelper.accessor("one_hour", {
    header: () => "1h Move",
    cell: (info) => <div className="">{info.renderValue()} %</div>,
  }),
  columnHelper.accessor("twenty_four_hour", {
    header: () => "24h Move",
    cell: (info) => <div className="">{info.renderValue()} %</div>,
  }),
  columnHelper.accessor("seven_day", {
    header: () => "7d Move",
    cell: (info) => <div className="">{info.renderValue()} %</div>,
  }),
];

export default columns;
