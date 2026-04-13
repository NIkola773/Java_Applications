package com.MyWebApp.Java_Web_App;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UserAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer id;

    private String name;
    private String country;
    
    private String street;

    private String email;
    private String username;
    
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

   

   

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }



  

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

      @Override
    public String toString() {
        return "UserAddress [id=" + id + ", name=" + name + ", country=" + country + ", street=" + street + ", email="
                + email + "]";
    }

      public String getUsername() {
          return username;
      }

      public void setUsername(String username) {
          this.username = username;
      }

}
