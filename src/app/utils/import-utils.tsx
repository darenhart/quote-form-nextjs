import { WorkSheet, utils as XLSXUtils, read as readXLSX } from "xlsx";

export const handleFileChange = async (
  fileList: FileList | null,
): Promise<Record<string, unknown>[] | []> => {
  const file = fileList?.[0];
  if (!file) {
    return [];
  }

  const workbook = readXLSX(await file.arrayBuffer(), {
    cellDates: true,
    cellFormula: false,
    cellHTML: false,
    cellText: false,
  });

  if (workbook.SheetNames.length === 0) {
    throw new Error("No sheets found in the file");
  }

  trimData(workbook.Sheets[workbook.SheetNames[0]]);
  fillFirstRow(workbook.Sheets[workbook.SheetNames[0]]);

  const json = XLSXUtils.sheet_to_json(
    workbook.Sheets[workbook.SheetNames[0]],
  ) as Record<string, unknown>[];

  return json;
};

// source: https://github.com/SheetJS/sheetjs/issues/1529
const trimData = (ws: WorkSheet) => {
  if (!ws || !ws["!ref"]) return;
  const ref = XLSXUtils.decode_range(ws["!ref"]);
  for (let R = ref.s.r; R <= ref.e.r; ++R) {
    for (let C = ref.s.c; C <= ref.e.c; ++C) {
      const cell = ws[XLSXUtils.encode_cell({ r: R, c: C })];
      if (cell && cell.t == "s") {
        cell.v = cell.v.trim();
        if (cell.w) cell.w = cell.w.trim();
      }
    }
  }
};

// fill first row with empty value where it is undefined
// so the first json object contain all columns information
const fillFirstRow = (ws: WorkSheet) => {
  if (!ws || !ws["!ref"]) return;
  const ref = XLSXUtils.decode_range(ws["!ref"]);
  for (let C = ref.s.c; C <= ref.e.c; ++C) {
    const cell = ws[XLSXUtils.encode_cell({ r: 1, c: C })];

    if (!cell) {
      XLSXUtils.sheet_add_aoa(ws, [[""]], {
        origin: XLSXUtils.encode_cell({ r: 1, c: C }),
      });
    }
  }
};
