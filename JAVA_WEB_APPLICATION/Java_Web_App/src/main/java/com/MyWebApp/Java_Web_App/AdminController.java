package com.MyWebApp.Java_Web_App;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {

@GetMapping("/login")
public String loginPage() {
    return "redirect:/login.html";
}

@GetMapping("/adminPanel")
public String adminPanel2() {
    return "redirect:/adminPanel.html";
}
    
}
 