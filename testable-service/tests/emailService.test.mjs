// conceptual test of the emailService

import createEmailService from "../services/emailService.mjs";

const fakeSmtp = { send: async (m) => (m.sent = true) };

const service = createEmailService(fakeSmtp);

await service.sendWelcome({
  username: 'michael',
  email: 'm@example.com',
});

// assert behavior on fakeSmtp