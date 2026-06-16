package com.MyWebApp.Java_Web_App;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

// Marks this class as a source of Spring beans (configuration class)
@Configuration
// Enables Spring Security's web security support
@EnableWebSecurity
public class Security {

    // Defines the security rules applied to every HTTP request
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF protection (fine for demos, risky in production)
            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth
                // Public routes, no authentication needed
                .requestMatchers("/login", "/css/**", "/js/**", "/frontend/**", "/images/**").permitAll()
                // Restricted to users with ADMIN role
                .requestMatchers("/adminPanel", "/users/allUsers", "/users/deleteUser/**").hasRole("ADMIN")
                // Everything else is open to everyone
                .anyRequest().permitAll()
            )

            // Custom login form configuration
            .formLogin(form -> form
                .loginPage("/login")
                // Always redirect here after successful login
                .defaultSuccessUrl("/adminPanel.html", true)
                .permitAll()
            )

            // Logout configuration
            .logout(logout -> logout
                .logoutSuccessUrl("/login?logout")
                .permitAll()
            );

        return http.build();
    }

    // Provides user data used for authentication (in-memory, for testing only)
    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.builder()
            .username("user")
            // "{noop}" = no password encoding, plain text (not safe for production)
            .password("{noop}user1")
            .roles("USER")
            .build();

        UserDetails admin = User.builder()
            .username("admin")
            .password("{noop}admin123")
            .roles("ADMIN", "USER")
            .build();

        return new InMemoryUserDetailsManager(user, admin);
    }
}