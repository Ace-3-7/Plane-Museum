package org.example.planemuseumbackend.Controller;

import org.example.planemuseumbackend.Dto.LoginUserDTO;
import org.example.planemuseumbackend.Dto.RegisterUserDTO;
import org.example.planemuseumbackend.Service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    private final Logger log = LoggerFactory.getLogger(UserController.class);

    public UserController(UserService userService) {this.userService = userService;}

    //LOGIN
    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> loginUser(@RequestBody LoginUserDTO requestDto) {
        boolean isAuthenticated = userService.authenticateUser(requestDto);
        boolean isAdmin = userService.isAdmin(requestDto.getEmail());
        if (isAuthenticated) {
            log.info("User login successful");
                return ResponseEntity.status(HttpStatus.OK).body("Login successful" + (isAdmin ? " - Admin access granted" : ""));
        } else {
            log.warn("User login failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    //CREATE
    @PostMapping("/register")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> registerUser( @RequestBody RegisterUserDTO requestDto) {
        try{
        userService.registerUser(requestDto);
        }catch (IllegalArgumentException e) {
            log.error("User registration failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        log.info("User registered");
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }

    //READ
    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getAllUsers());
    }

    @GetMapping("/manage/{email}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> getManageUsers(@PathVariable String email) {
        try{
            return  ResponseEntity.status(HttpStatus.OK).body(userService.getManageUsers(email));
        }catch (IllegalArgumentException e) {
            log.error("Failed to retrieve user");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    //UPDATE
    @PutMapping("/manage")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> updateUser(@RequestBody RegisterUserDTO requestDto)
    {
        try{
        userService.updateUser(requestDto);
        }catch (IllegalArgumentException e) {
            log.error("User update failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

        log.info("User updated");
        return ResponseEntity.status(HttpStatus.OK).body("User updated successfully");
    }

    //DELETE
    @DeleteMapping("/manage/{email}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<?> deleteUser(@PathVariable String email) {
        try{
        userService.deleteUser(email);
        }catch (IllegalArgumentException e) {
            log.error("User deletion failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        log.info("User deleted");
        return ResponseEntity.status(HttpStatus.OK).body("User deleted successfully");
    }
}
