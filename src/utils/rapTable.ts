
export type ColumnType = {
  id: string
  name: string
  isShow: boolean
}

export type DataRowCellType = number | string

/**
 * ラップ格納用のテーブル
 */
export class RapTable {
  public column: Array<ColumnType>
  private dates: Array<Date>

  constructor() {
    this.column = [
      // { id: "no", name: "No", isShow: true },
      { id: "yyyymmdd", name: "YYYY/MM/DD", isShow: true },
      { id: "yearOnly", name: "YYYY", isShow: false }, // 年
      { id: "monthOnly", name: "MM", isShow: false }, // 月
      { id: "dayOnly", name: "DD", isShow: false }, // 日
      { id: "hhmmss", name: "hh:mm:ss", isShow: true },
      { id: "hoursOnly", name: "hh", isShow: false }, // 時
      { id: "minutesOnly", name: "mm", isShow: false }, // 分
      { id: "secondsOnly", name: "ss", isShow: false }, // 秒
      { id: "allSec", name: "秒", isShow: true }, // 時間部分秒換算
      { id: "allSecNoHours", name: "秒 (時除く)", isShow: true }, // 時間部分秒換算, 時除く
    ]

    this.dates = []
  }

  /**
   * addNewRowDate: 新しい行の Date を追加
   */
  public addNewRowDate(): void {
    const now = new Date()
    this.dates.push(now)
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

  /**
   * 各行で表示するセルの配列を返す
   * @param index
   */
  public getDateRow(index: number): Array<DataRowCellType> | null {
    if (this.dates.length - 1 < index) return null
    const date = this.dates[index]
    const res: DataRowCellType[] = []
    const showColumns = this.column.filter((c) => c.isShow)

    showColumns.forEach((c) => {
      switch (c.id) {
        case "yyyymmdd":
          res.push(`${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`)
          break
        case "yearOnly":
          res.push(date.getFullYear())
          break
        case "monthOnly":
          res.push(date.getMonth())
          break
        case "dayOnly":
          res.push(date.getDay())
          break
        case "hhmmss":
          res.push(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
          break
        case "hoursOnly":
          res.push(date.getHours())
          break
        case "minutesOnly":
          res.push(date.getMinutes())
          break
        case "secondsOnly":
          res.push(date.getSeconds())
          break
        case "allSec":
          res.push(date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds())
          break
        case "allSecNoHours":
          res.push(date.getMinutes() * 60 + date.getSeconds())
          break
        default:
          res.push(99999999)
          break
      }
    })

    return res
  }

  /**
   * dates から指定indexの値を削除
   * @param index
   * @returns
   */
  public deleteThisRow(index: number): void {
    if (this.dates.length - 1 < index) return
    this.dates.splice(index, 1)
  }
}
