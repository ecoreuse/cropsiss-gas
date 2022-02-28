import { YahooAuction } from "./yahoo_auction"

class Item {
  cropsiss_id: string;
  platform_code: string;
  item_id: string;

  constructor(cropsiss_id: string, platform_code: string, item_id: string) {
    this.cropsiss_id = cropsiss_id;
    this.platform_code = platform_code;
    this.item_id = item_id;
  }
}


function doGet() {
  const doneLabelName = "cropsiss-done";
  const doneLabel = GmailApp.getUserLabelByName(doneLabelName);
  const ya = new YahooAuction();
  const items: Item[] = [];

  /* Get items from Gmail */
  ya.getMails(doneLabelName).forEach((mail) => {
    mail.addLabel(doneLabel);
    const cropsissID = ya.getCropsissID(mail);
    if (cropsissID) {
      const item_id = ya.getID(mail);
      items.push(new Item(cropsissID, ya.code, item_id));
    }
  })

  /* Create the response */
  const jsonOutput = ContentService.createTextOutput();
  jsonOutput.setMimeType(ContentService.MimeType.JSON);
  jsonOutput.setContent(JSON.stringify({ items: items }));

  return jsonOutput;
}