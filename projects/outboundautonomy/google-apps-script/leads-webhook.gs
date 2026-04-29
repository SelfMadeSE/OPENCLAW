/**
 * Outbound Autonomy durable lead sink.
 *
 * Setup:
 * 1. Create a Google Sheet named "Outbound Autonomy Leads".
 * 2. Extensions -> Apps Script.
 * 3. Paste this file into Code.gs.
 * 4. Project Settings -> Script properties:
 *    LEAD_WEBHOOK_SECRET = same value as Vercel GOOGLE_LEADS_WEBHOOK_SECRET
 *    NOTIFY_EMAIL = optional Google Workspace inbox for lead alerts
 * 5. Deploy -> New deployment -> Web app.
 *    Execute as: Me
 *    Who has access: Anyone
 * 6. Copy the Web app URL into Vercel as GOOGLE_LEADS_WEBHOOK_URL.
 */

const LEADS_SHEET_NAME = 'Leads';

const HEADERS = [
  'Received At',
  'Source',
  'Name',
  'Email',
  'Phone',
  'Company',
  'Service Interest',
  'Budget Range',
  'Message',
  'User Agent',
  'Referer',
  'IP',
  'Raw JSON',
];

function jsonResponse(payload, statusCode) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(LEADS_SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(LEADS_SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const expectedSecret = PropertiesService.getScriptProperties().getProperty('LEAD_WEBHOOK_SECRET');
    if (!expectedSecret) {
      return jsonResponse({ ok: false, error: 'LEAD_WEBHOOK_SECRET is not configured' }, 500);
    }

    const body = JSON.parse(e.postData && e.postData.contents ? e.postData.contents : '{}');
    if (body.secret !== expectedSecret) {
      return jsonResponse({ ok: false, error: 'Unauthorized' }, 401);
    }

    const lead = body.lead || {};
    const context = body.context || {};
    const receivedAt = body.submittedAt || new Date().toISOString();
    const row = [
      receivedAt,
      body.source || 'outboundautonomy.com',
      lead.name || '',
      lead.email || '',
      lead.phone || '',
      lead.company || '',
      lead.service_interest || '',
      lead.budget_range || '',
      lead.message || '',
      context.userAgent || '',
      context.referer || '',
      context.ip || '',
      JSON.stringify({ lead, context }),
    ];

    const sheet = getSheet();
    sheet.appendRow(row);
    const rowNumber = sheet.getLastRow();

    const notifyEmail = PropertiesService.getScriptProperties().getProperty('NOTIFY_EMAIL');
    if (notifyEmail) {
      MailApp.sendEmail({
        to: notifyEmail,
        subject: `New Outbound Autonomy lead: ${lead.email || 'unknown email'}`,
        body: [
          `Name: ${lead.name || ''}`,
          `Email: ${lead.email || ''}`,
          `Company: ${lead.company || ''}`,
          `Service: ${lead.service_interest || ''}`,
          `Budget: ${lead.budget_range || ''}`,
          '',
          lead.message || '',
          '',
          `Sheet row: ${rowNumber}`,
        ].join('\n'),
      });
    }

    return jsonResponse({ ok: true, id: String(rowNumber), row: rowNumber }, 200);
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error && error.message ? error.message : error) }, 500);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return jsonResponse({ ok: true, service: 'Outbound Autonomy Leads Webhook' }, 200);
}

