import { Injectable, Res } from "@nestjs/common";
import { Response } from "express";
import * as XLSX from "xlsx";

@Injectable()
export class DownloadCsvService {
  /**
   * @functionName downloadCsv
   * @param data
   * @param res
   * @param filename
   * @returns
   */
  public async downloadCsv(@Res() res: Response, data: any[], filename: string) {
    const newData = JSON.parse(JSON.stringify(data));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(newData), "Data");
    const buf = XLSX.write(wb, { type: "buffer", bookType: "csv" });
    res.statusCode = 200;
    res.setHeader("Content-Disposition", `attachment; filename="${filename}.csv"`);
    return res.end(buf);
  }
}
