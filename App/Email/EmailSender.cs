using System.Net.Mail;

namespace App.Email
{
    public class EmailSender
    {
        public static string SendEmail(string sender, string recipient, string subject, string body)
        {
            MailMessage email = new MailMessage();
            MailAddress froma = new MailAddress(sender);
            email.From = froma;
            email.To.Add(recipient);
            email.Subject = subject;
            email.IsBodyHtml = true;
            email.Body = body;
            SmtpClient smtp = new SmtpClient();
            smtp.Host = "localhost";
            smtp.Port = 25;
            try
            {
                smtp.Send(email);
                return "Email sent successfully";
            }
            catch (SmtpException ex)
            {
                return ex.Message;
            }
        }
    }
}