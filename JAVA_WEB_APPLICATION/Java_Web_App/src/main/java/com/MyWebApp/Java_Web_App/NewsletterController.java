package com.MyWebApp.Java_Web_App;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("/api/newsletter")
public class NewsletterController {

    private final EmailService newsletterService;

    public NewsletterController(EmailService newsletterService) {
        this.newsletterService = newsletterService;
    }

    @PostMapping("/subscribe")
    public String subscribe(@RequestBody  Map<String, String> body) {

        String email = body.get("email");

       newsletterService.subscribe(email);

        return "Successfully subscribed!";
    }
}