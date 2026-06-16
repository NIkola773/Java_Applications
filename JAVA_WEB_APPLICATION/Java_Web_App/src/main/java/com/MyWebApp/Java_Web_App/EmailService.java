package com.MyWebApp.Java_Web_App;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

// Marks this class as a Spring service bean (business logic layer)
@Service
public class EmailService {

    // Spring-managed bean for sending emails (auto-configured via Spring Boot starter)
    private final JavaMailSender mailSender;

    // Injects value from application.properties/yml (e.g. app.mail.enabled=true/false)
    @Value("${app.mail.enabled}")
    private boolean mailEnabled;

    // Constructor injection of the mail sender dependency
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void subscribe(String email) {

        // Feature flag check - skip sending if mail is disabled (e.g. in dev/test env)
        if (!mailEnabled) {
            System.out.println("MAIL DISABLED → email not sent to: " + email);
            return;
        }

        // Builds a simple plain-text email message
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Success!!");
        message.setText(
                "Hello!\n\n" +
                "Successfully signed up for newsletter.\n" +
                "You will get the latest news and product information.\n\n" +
                "Thank you, and see you soon!"
        );

        // Sends the email via the configured SMTP server
        mailSender.send(message);
    }
}