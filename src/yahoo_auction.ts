

export class YahooAuction {
  code: string = "yahoo_auction";

  findFirstPatternInGmail(
    mail: GoogleAppsScript.Gmail.GmailThread,
    pattern: string | RegExp
  ): string {
    var id: string = "";
    for (var msg of mail.getMessages()) {
      const body = msg.getBody();
      const ID = body.match(pattern);
      if (ID) {
        id = ID[0];
      }
    }
    return id;
  }

  getCropsissID(mail: GoogleAppsScript.Gmail.GmailThread) {
    const pattern = "(?<=#)c[0-9]{5}";
    return this.findFirstPatternInGmail(mail, pattern);
  }

  getID(mail: GoogleAppsScript.Gmail.GmailThread): string {
    const pattern = "(?<=オークションID：)[a-zA-Z0-9]+";
    return this.findFirstPatternInGmail(mail, pattern);
  }

  getMails(doneLabelName: string): GoogleAppsScript.Gmail.GmailThread[] {
    const query = `from:(auction-master@mail.yahoo.co.jp) AND {subject:("ヤフオク! - 自動再出品" OR "ヤフオク! - 出品")} AND -{label:${doneLabelName}}`;
    return GmailApp.search(query);
  }
}