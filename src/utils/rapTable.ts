
export type ColumnType = {
  id: string
  name: string
  isShow: boolean
}

export type DataSetValueType = number | Date | string

export type DataSetType = { [key: string]: DataSetValueType }

export type DataRowType = DataSetType[]

/**
 * ラップ格納用のテーブル
 */
export class RapTable {
  public column: Array<ColumnType>
  public data: DataRowType[]

  constructor() {
    this.column = [
      { id: "No", name: "No", isShow: true },
      { id: "DateObj", name: "", isShow: false },
    ]

    columnDef.forEach((cd) => {
      this.column.push({ id: cd.id, name: cd.name, isShow: this.isDefaultColumn(cd.id) })
    })

    this.data = []
  }

  /**
   * addNewRow
   */
  public addNewRow(): void {
    //
  }

  /**
   * changeColumnShow: カラムの表示切り替え
   * @param id
   * @returns
   */
  public changeColumnShow(id: string): void {
    if (["No", "DateObj"].includes(id)) return

    const col = this.column.filter((c) => c.id === id)
    if (col.length === 1) {
      this.column.filter((c) => c.id === id)[0].isShow = col[0].isShow ? false: true
    }
    return
  }

  private isDefaultColumn(id: string): boolean {
    const defaultColumnIds = ["YYYYMMDD", "hhmmss"]
    return defaultColumnIds.includes(id)
  }
}

const columnDef: { id: string, name: string }[] = [
  { id: "YYYYMMDD", name: "YYYYMMDD" },
  { id: "hhmmss", name: "hh:mm:ss" },
  { id: "YYYY", name: "YYYY" }, // 年
  { id: "MM", name: "MM" }, // 月
  { id: "DD", name: "DD" }, // 日
  { id: "hh", name: "hh" }, // 時
  { id: "mm", name: "mm" }, // 分
  { id: "ss", name: "ss" }, // 秒
  { id: "", name: "" },
]