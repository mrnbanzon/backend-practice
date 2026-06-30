// using dependency injection for external resources to make module testable
export default function createEmailService(smtpClient) {
  return {
    async sendWelcome(user) {
      const msg = {
        to: user.email,
        subject: 'Welcome!',
        text: `Hello ${user.username}`,
      };

      await smtpClient.send(msg);
    }
  };
};