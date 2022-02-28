/* Copyright (c) 2022 Shuhei Nitta. All rights reserved. */

export const GmailThread = jest.fn<GoogleAppsScript.Gmail.GmailThread, []>()
  .prototype;
export const GmailMessage = jest.fn<GoogleAppsScript.Gmail.GmailMessage, []>()
  .prototype;
GmailApp.getUserLabelByName = (name: string) =>
  jest.fn<GoogleAppsScript.Gmail.GmailLabel, []>().prototype;

export const doGetEvent = jest.fn<GoogleAppsScript.Events.DoGet, []>()
  .prototype;
