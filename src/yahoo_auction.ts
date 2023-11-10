export class YahooAuction {
  code = "yahoo_auction";

  findFirstPatternInGmail(mail: GoogleAppsScript.Gmail.GmailThread, pattern: string | RegExp): string {
    let id = "";
    for (const msg of mail.getMessages()) {
      const body = msg.getBody();
      const ID = body.match(pattern);
      if (ID) {
        id = ID[0];
      }
    }
    return id;
  }

  getCrostoreID(mail: GoogleAppsScript.Gmail.GmailThread) {
    const pattern = "(?<=#)c[0-9]{5}";
    return this.findFirstPatternInGmail(mail, pattern);
  }

  getID(mail: GoogleAppsScript.Gmail.GmailThread): string {
    const pattern = "(?<=オークションID：)[a-zA-Z0-9]+";
    return this.findFirstPatternInGmail(mail, pattern);
  }

  getMails(doneLabelName: string): GoogleAppsScript.Gmail.GmailThread[] {
    const query = `from:(auction-master@mail.yahoo.co.jp) AND {subject:("Yahoo!オークション - 自動再出品" OR "Yahoo!オークション - 出品")} AND -{label:${doneLabelName}}`;
    return GmailApp.search(query);
  }
}
