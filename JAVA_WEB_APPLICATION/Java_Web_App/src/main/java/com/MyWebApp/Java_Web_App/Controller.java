package com.MyWebApp.Java_Web_App;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    @Autowired
    private AppService serv;

    @GetMapping("/products")
    public List<Products> getProd() {
        return serv.getAllProducts();

    }
    @PostMapping("/addProducts")
    public Products addProduct(@RequestBody Products prod) {
        return serv.addProduct(prod);

    }
    @PutMapping("/updateProduct/{id}")
    public Products updateProduct(@PathVariable Integer id, @RequestBody Products prod) {
        return serv.updateProduct(id, prod);
    }
   @GetMapping("/cheapProducts")
   public List<Products> getCheap() {
    return serv.getCheaperProducts();
   }
      @GetMapping("/expensiveProducts")
   public List<Products> getExpensive() {
    return serv.getExpensiveProducts();
   }
     @GetMapping("/users/allUsers")
    public List<Users> getUsrs() {
        return serv.getAllUsr();

    }
       @GetMapping("/users/youngerUsers")
    public List<Users> getYoungerUsrs() {
        return serv.getYoungerUsers();

    }
       @GetMapping("/users/olderUsers")
    public List<Users> getOlderUsrs() {
        return serv.getOlderUsers();

    }
        @PostMapping("/users/addUsers")
    public Users addUsrs(@RequestBody Users user2) {
        return serv.addUsers(user2);

    }
    @PutMapping("/users/updateUser/{id}")
    public Users updateUsr(@PathVariable Integer id, @RequestBody Users user2) {
        return serv.updateUser(id, user2);
    }
     @DeleteMapping("/users/deleteUser/{id}")
    public void deleteUser(@PathVariable Integer id) {
        serv.delUser(id);
    }
    @PostMapping("/address/addAddress")
    public UserAddress addAdr(@RequestBody UserAddress adrs) {
        return serv.addAddress(adrs);
    }
    @PutMapping("/address/updateAddress/{id}")
    public UserAddress updateAdr(@PathVariable Integer id, @RequestBody UserAddress adrs) {
        return serv.updateAddress(id, adrs);
    }
    @GetMapping("/address/allAddress")
    public List<UserAddress> getAllAddr() {
        return serv.getAllAddress();
    }
    @DeleteMapping("/address/deleteAddress/{id}")
    public void deleteAddress(@PathVariable Integer id) {
        serv.delAddress(id);
    }
       @DeleteMapping("/deleteProduct/{id}")
  public ResponseEntity<Void> deleteProduct(@PathVariable  Integer id) {
    serv.delProduct(id);
    return ResponseEntity.ok().build();
}
}