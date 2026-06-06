package com.MyWebApp.Java_Web_App;


import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaOrders extends JpaRepository<Orders, Integer> {

}