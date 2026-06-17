package com.MyWebApp.Java_Web_App;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppService {
  
  @Autowired
  private JpaUserAddress usrAddrsRepo;
     @Autowired
    private JPArepo repo;

    @Autowired
    private JpaUsers usrRepo;

    public List<Products> getAllProducts() {
        return repo.findAll();
    }

   public Products addProduct(Products product) {

        return repo.save(product);
    }
    public Products updateProduct(Integer id, Products updatedProduct) {
        Products existing = repo.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));
        existing.setProductName(updatedProduct.getProductName());
        existing.setPrice(updatedProduct.getPrice());
        existing.setEmailUser(updatedProduct.getEmailUser());
        existing.setUsername(updatedProduct.getUsername());
        return repo.save(existing);
    }
    public void delProduct(Integer id) {
            repo.deleteById(id);
    }
      public List<String> get_product_name() { 
       List<String> namesList = repo.findAll()
            .stream()
            .map(Products::getProductName)
            .collect(Collectors.toList());
            return namesList;
   }
         public List<Integer> getIds() { 
       List<Integer> idList = repo.findAll()
            .stream()
            .map(Products::getId)
            .collect(Collectors.toList());
            return idList;
   }
      public List<Double> getPrice() { 
       List<Double> priceList = repo.findAll()
           .stream()
           .map(Products::getPrice)
           .collect(Collectors.toList());
           return priceList;

   }
    public List<Products> getCheaperProducts() {
      return repo.findAll()
      .stream()
      .filter(f -> f.getPrice() <= 200)
      .collect(Collectors.toList());
    
    }
    public List<Products> getExpensiveProducts() {
      return repo.findAll()
      .stream()
      .filter(f -> f.getPrice() >= 500)
      .collect(Collectors.toList());
    
    }
    public List<Users> getAllUsr() {
      return usrRepo.findAll();
    }
    public List<Integer> getUsrAge() {
      List<Integer> age = usrRepo.findAll()
      .stream()
      .map(Users::getAge)
      .collect(Collectors.toList());
      return age;
    }
    public List<Users> getYoungerUsers() {
       return usrRepo.findAll()
      .stream()
      .filter(e -> e.getAge() <= 35)
      .collect(Collectors.toList());
     
    }
    public List<Users> getOlderUsers() {
       return usrRepo.findAll()
      .stream()
      .filter(e -> e.getAge() > 35)
      .collect(Collectors.toList());
     
    }
    public Users addUsers(Users user) {
      return usrRepo.save(user);
    }
    public Users updateUser(Integer id, Users updatedUser) {
        Users existing = usrRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        existing.setUsername(updatedUser.getUsername());
        existing.setEmail(updatedUser.getEmail());
        existing.setAge(updatedUser.getAge());
        return usrRepo.save(existing);
    }
    public UserAddress addAddress(UserAddress uAddress) {
      return  usrAddrsRepo.save(uAddress);
    }
    public UserAddress updateAddress(Integer id, UserAddress updatedAddress) {
        UserAddress existing = usrAddrsRepo.findById(id).orElseThrow(() -> new RuntimeException("Address not found"));
        existing.setName(updatedAddress.getName());
        existing.setCountry(updatedAddress.getCountry());
        existing.setStreet(updatedAddress.getStreet());
        existing.setEmail(updatedAddress.getEmail());
        existing.setUsername(updatedAddress.getUsername());
        return usrAddrsRepo.save(existing);
    }
    public List<UserAddress> getAllAddress() {
        return usrAddrsRepo.findAll();
    }
    public void delAddress(Integer id) {
        usrAddrsRepo.deleteById(id);
    }
     public void delUser(Integer id) {
        usrRepo.deleteById(id);
    }
}