package com.framgia.websocket.restApi;


import com.framgia.websocket.model.User;
import com.framgia.websocket.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserController(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @GetMapping("/users")
    public Iterable<User> getUsers() {
        return this.userRepository.findAll();
    }

    @PostMapping("/users/signup")
    public User createUser(@RequestBody User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return this.userRepository.save(user);
    }

    @DeleteMapping("/users/{id}")
    public User deleteUser(@PathVariable("id") long userId) {
        User user = userRepository.findById(userId).orElse(null);
        this.userRepository.deleteById(userId);
        return user;
    }
}
