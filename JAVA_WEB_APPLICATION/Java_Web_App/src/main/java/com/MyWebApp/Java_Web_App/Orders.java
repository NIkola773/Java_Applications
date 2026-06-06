package com.MyWebApp.Java_Web_App;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
enum STATUS {
    PENDING,
    SHIPPED,
    DELIVERED
}

@Entity
public class Orders {
    @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
   private  Integer id;
   private int userId;
   private int totalPrice;
   private String orderDate;
   private STATUS status;
   public Integer getId() {
    return id;
   }
   public void setId(Integer id) {
    this.id = id;
   }
   public int getUserId() {
    return userId;
   }
   public void setUserId(int userId) {
    this.userId = userId;
   }
   public int getTotalPrice() {
    return totalPrice;
   }
   public void setTotalPrice(int totalPrice) {
    this.totalPrice = totalPrice;
   }
   public String getOrderDate() {
    return orderDate;
   }
   public void setOrderDate(String orderDate) {
    this.orderDate = orderDate;
   }
   public STATUS getStatus() {
    return status;
   }
   public void setStatus(STATUS status) {
    this.status = status;
   }

   


    
}
