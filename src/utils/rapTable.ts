
export type ColumnType = {
  id: string
  label: string
  field: string
  isShow: boolean
}

export type DataRowCellType = {
  id: number
  yyyymmdd?: string
  yearOnly?: number
  monthOnly?: number
  dayOnly?: number
  hhmmss?: string
  hoursOnly?: number
  minutesOnly?: number
  secondsOnly?: number
  miliSecondsOnly?: number
  allSec?: number
  allSecNoHours?: number
}

/**
 * ラップ格納用のテーブル
 */
export class RapTable {
  public column: Array<ColumnType>
  private dates: Array<Date>

  constructor() {
    this.column = [
      { id: "no", label: "No", field: "id", isShow: true },
      { id: "yyyymmdd", label: "YYYY/MM/DD", field: "yyyymmdd", isShow: true },
      { id: "yearOnly", label: "年", field: "yearOnly", isShow: false }, // 年
      { id: "monthOnly", label: "月", field: "monthOnly", isShow: false }, // 月
      { id: "dayOnly", label: "日", field: "dayOnly", isShow: false }, // 日
      { id: "hhmmss", label: "hh:mm:ss.ms", field: "hhmmss", isShow: true },
      { id: "hoursOnly", label: "時", field: "hoursOnly", isShow: false }, // 時
      { id: "minutesOnly", label: "分", field: "minutesOnly", isShow: false }, // 分
      { id: "secondsOnly", label: "秒 / [s]", field: "secondsOnly", isShow: false }, // 秒
      { id: "miliSecondsOnly", label: "ミリ秒 / [s]", field: "miliSecondsOnly", isShow: false }, // ミリ秒
      { id: "allSec", label: "秒換算 / [s]", field: "allSec", isShow: true }, // 時間部分秒換算
      { id: "allSecNoHours", label: "秒換算 (時除く) / [s]", field: "allSecNoHours", isShow: true }, // 時間部分秒換算, 時除く
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
  public getDateRow(): Array<DataRowCellType> {
    const res: DataRowCellType[] = []

    this.dates.forEach((d, i) => {
      res.push({ id: i + 1 })
      this.column.filter((c) => c.isShow).forEach((c) => {
        switch (c.id) {
          case "yyyymmdd":
            res[i].yyyymmdd = `${d.getFullYear()}/${("00"+(d.getMonth()+1)).slice(-2)}/${("00"+d.getDate()).slice(-2)}`
            break
          case "yearOnly":
            res[i].yearOnly = d.getFullYear()
            break
          case "monthOnly":
            res[i].monthOnly = d.getMonth()+1
            break
          case "dayOnly":
            res[i].dayOnly = d.getDate()
            break
          case "hhmmss":
            res[i].hhmmss = `${("00" + d.getHours()).slice(-2)}:${("00" + d.getMinutes()).slice(-2)}:${("00" + d.getSeconds()).slice(-2)}.${("000" + d.getMilliseconds()).slice(-3)}`
            break
          case "hoursOnly":
            res[i].hoursOnly = d.getHours()
            break
          case "minutesOnly":
            res[i].minutesOnly = d.getMinutes()
            break
          case "secondsOnly":
            res[i].secondsOnly = d.getSeconds()
            break
          case "miliSecondsOnly":
            res[i].miliSecondsOnly = d.getMilliseconds()
            break
          case "allSec":
            res[i].allSec = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds() + d.getMilliseconds() * 0.001
            break
          case "allSecNoHours":
            res[i].allSecNoHours = d.getMinutes() * 60 + d.getSeconds() + d.getMilliseconds() * 0.001
            break
        }
      })
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

  /**
   * dates をリセット
   */
  public resetDates(): void {
    this.dates = []
  }

  /**
   * sessionStorageに格納するための文字列に変換
   * @returns
   */
  public getDatesString(): string {
    const ret = this.dates.map((d) => {
      return `${d.getFullYear()}/${d.getMonth()}/${d.getDate()}/${d.getHours()}/${d.getMinutes()}/${d.getSeconds()}/${d.getMilliseconds()}`
    }).join(";")
    return ret
  }

  /**
   * sessionStorageに格納した文字列データからdatesに格納
   * @param datesString
   */
  public setDatesString(datesString: string): void {
    datesString.split(";").forEach((d) => {
      const dateList = d.split("/")
      if (dateList.length === 7) {
        const date = new Date()
        date.setFullYear(Number(dateList[0]))
        date.setMonth(Number(dateList[1]))
        date.setDate(Number(dateList[2]))
        date.setHours(Number(dateList[3]))
        date.setMinutes(Number(dateList[4]))
        date.setSeconds(Number(dateList[5]))
        date.setMilliseconds(Number(dateList[6]))
        this.dates.push(date)
      }
    })
  }
}
