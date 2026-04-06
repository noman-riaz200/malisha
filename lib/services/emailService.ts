export const emailService = {
  async sendPasswordReset(email: string, token: string) {
    console.log(`Sending password reset to ${email} with token ${token}`);
  },
  async sendWelcomeEmail(email: string) {
    console.log(`Sending welcome email to ${email}`);
  },
  async sendApplicationStatusUpdate(email: string, status: string) {
    console.log(`Sending application status update to ${email}: ${status}`);
  },
};