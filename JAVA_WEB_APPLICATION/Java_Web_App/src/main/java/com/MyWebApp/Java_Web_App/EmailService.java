package com.MyWebApp.Java_Web_App;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.enabled}")
    private boolean mailEnabled;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void subscribe(String email) {

      
        if (!mailEnabled) {
            System.out.println("MAIL DISABLED → email not sent to: " + email);
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Success!!");
        message.setText(
                "Hello!\n\n" +
                "Successfully signed up for newsletter.\n" +
                "You will get the latest news and product information.\n\n" +
                "Thank you, and see you soon!"
        );

        mailSender.send(message);
    }
}