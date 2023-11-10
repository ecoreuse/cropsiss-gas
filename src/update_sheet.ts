import { YahooAuction } from "./yahoo_auction";

class Item {
  crostoreId: string;
  platformCode: string;
  itemId: string;

  constructor(crostoreId: string, platformCode: string, itemId: string) {
    this.crostoreId = crostoreId;
    this.platformCode = platformCode;
    this.itemId = itemId;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function updateYahooAuctionIDsByMessage(): void {
  const doneLabelName = "crostored";
  const doneLabel = GmailApp.getUserLabelByName(doneLabelName);
  const ya = new YahooAuction();
  const items: Item[] = [];

  /* Gets items from Gmail */
  ya.getMails(doneLabelName).forEach((mail) => {
    mail.addLabel(doneLabel);
    const crostoreID = ya.getCrostoreID(mail);
    if (crostoreID) {
      const itemId = ya.getID(mail);
      items.push(new Item(crostoreID, ya.code, itemId));
    }
  });

  /* Updates values on the sheet */
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName("data");
  if (sheet !== null) {
    items.forEach((item) => updateSheetByItem(sheet, item));
  } else {
    throw Error("A sheet named 'data' not found");
  }
}

function updateSheetByItem(sheet: GoogleAppsScript.Spreadsheet.Sheet, item: Item): void {
  const row = Number(item.crostoreId.replace("c", "")) + 1;
  const col = getColByCode(item.platformCode);
  const range = sheet.getRange(`${col}${row}`);
  range.setValue(item.itemId);
}

function getColByCode(platformCode: string): string {
  switch (platformCode) {
    case "mercari":
      return "D";
    case "yahoo_auction":
      return "E";
    default:
      throw new Error(`Invalid platform_code: ${platformCode}`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function URLtoTitle(url: string): string {
  const response = UrlFetchApp.fetch(url);
  const titleRegexp = /<title>([\s\S]*?)<\/title>/i;
  const match = titleRegexp.exec(response.getContentText());
  if (match) {
    return match[1].replace(/(^\s+)|(\s+$)/g, "");
  } else {
    return "";
  }
}
